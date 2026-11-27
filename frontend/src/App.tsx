import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import ReportsPage from './pages/ReportsPage'
import CalendarPage from './pages/CalendarPage'
import AiAssistantPage from './pages/AiAssistantPage'
import Sidebar from './components/Sidebar'
import TaskModal from './components/TaskModal'
import AdminPage from './pages/AdminPage'
import Toast from './components/Toast'
import type { AppPage, Task, TaskStatus, UserRole } from './types'
import { api } from './lib/api'
import { isTaskOverdue } from './lib/taskDates'

function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
  )
  const [page, setPage] = useState<AppPage>('dashboard')
  const [role, setRole] = useState<UserRole | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('taskly-theme') === 'dark')
  const [notification, setNotification] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [authError, setAuthError] = useState('')
  const [appError, setAppError] = useState('')

  useEffect(() => {
    if (!loggedIn) return

    let cancelled = false
    if (role === null) {
      api.getCurrentUser()
        .then(user => {
          if (!cancelled) {
            setRole(user.role)
            setPage(user.role === 'admin' ? 'admin-dashboard' : 'dashboard')
          }
        })
        .catch((error: unknown) => {
          if (cancelled) return
          const message = error instanceof Error ? error.message : 'Unable to verify your account.'
          if (message.includes('(401)')) {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            setLoggedIn(false)
            setAuthError('Your session has expired. Please sign in again.')
          } else {
            setAppError(message)
          }
        })

      return () => {
        cancelled = true
      }
    }

    api.getTasks()
      .then(remoteTasks => {
        if (!cancelled) {
          setTasks(remoteTasks)
          setAppError('')
          const overdueCount = remoteTasks.filter(isTaskOverdue).length
          if (overdueCount > 0) {
            setNotification(`You have ${overdueCount} overdue task${overdueCount === 1 ? '' : 's'}.`)
          }
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return
        const message = error instanceof Error ? error.message : 'Unable to load tasks.'
        if (message.includes('(401)')) {
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          setLoggedIn(false)
          setAuthError('Your session has expired. Please sign in again.')
        } else {
          setAppError(message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [loggedIn, role])

  useEffect(() => {
    localStorage.setItem('taskly-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (!notification) return
    const timer = window.setTimeout(() => setNotification(null), 5000)
    return () => window.clearTimeout(timer)
  }, [notification])

  function signIn(token: string, signedInRole: UserRole, remember: boolean) {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('token', token)
    setRole(signedInRole)
    setPage(signedInRole === 'admin' ? 'admin-dashboard' : 'dashboard')
    setAuthError('')
    setAppError('')
    setLoggedIn(true)
  }

  async function saveTask(data: Omit<Task, 'id'>) {
    setAppError('')
    try {
      if (editing) {
        const updatedTask = await api.updateTask(editing.id, data)
        setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task))
      } else {
        const createdTask = await api.createTask(data)
        setTasks(prev => [createdTask, ...prev])
      }
      setNotification(editing ? 'Task updated.' : 'Task created.')
      setModalOpen(false)
      setEditing(null)
    } catch (error) {
      setAppError(error instanceof Error ? error.message : 'Unable to save task.')
    }
  }

  async function toggleTask(id: number) {
    const task = tasks.find(item => item.id === id)
    if (!task) return

    const status: TaskStatus = task.status === 'Completed' ? 'Pending' : 'Completed'
    setAppError('')
    try {
      const updatedTask = await api.updateStatus(id, status)
      setTasks(prev => prev.map(item => item.id === id ? updatedTask : item))
      setNotification(status === 'Completed' ? 'Task completed.' : 'Task marked pending.')
    } catch (error) {
      setAppError(error instanceof Error ? error.message : 'Unable to update task.')
    }
  }

  async function deleteTask(id: number) {
    setAppError('')
    try {
      await api.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
      setNotification('Task deleted.')
    } catch (error) {
      setAppError(error instanceof Error ? error.message : 'Unable to delete task.')
    }
  }

  function editTask(task: Task) {
    setEditing(task)
    setModalOpen(true)
  }

  if (!loggedIn) {
    return <AuthPage onLogin={signIn} authError={authError} />
  }

  if (!role) {
    return (
      <main className="main-area auth-loading">
        {appError || 'Loading your workspace...'}
      </main>
    )
  }

  return (
    <div className={`app-shell ${darkMode ? 'theme-dark' : ''}`}>
      <Sidebar
        page={page}
        role={role}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(value => !value)}
        onNavigate={setPage}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          setTasks([])
          setRole(null)
          setPage('dashboard')
          setNotification(null)
          setLoggedIn(false)
        }}
      />
      <main className="main-area">
        <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu size={21} />
        </button>
        {appError && <p className="app-error" role="alert">{appError}</p>}
        {page === 'admin-dashboard' || page === 'admin-users' || page === 'admin-tasks' ? (
          <AdminPage page={page} onNavigate={setPage} />
        ) : page === 'tasks' ? (
          <TaskList tasks={tasks} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={editTask} onDelete={deleteTask} onToggle={toggleTask} />
        ) : page === 'reports' ? (
          <ReportsPage tasks={tasks} />
        ) : page === 'calendar' ? (
          <CalendarPage tasks={tasks} />
        ) : page === 'assistant' ? (
          <AiAssistantPage tasks={tasks} onNotify={setNotification} />
        ) : (
          <Dashboard tasks={tasks} onAdd={() => { setEditing(null); setModalOpen(true) }} onTasks={() => setPage('tasks')} onToggle={toggleTask} />
        )}
      </main>
      <Toast message={notification} onClose={() => setNotification(null)} />
      {modalOpen && (
        <TaskModal
          task={editing}
          error={appError}
          onClose={() => { setModalOpen(false); setEditing(null) }}
          onSave={saveTask}
        />
      )}
    </div>
  )
}

export default App
