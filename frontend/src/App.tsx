import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import Sidebar from './components/Sidebar'
import TaskModal from './components/TaskModal'
import type { Task, TaskStatus } from './types'
import { api } from './lib/api'

function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
  )
  const [page, setPage] = useState<'dashboard' | 'tasks'>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [authError, setAuthError] = useState('')
  const [appError, setAppError] = useState('')

  useEffect(() => {
    if (!loggedIn) return

    let cancelled = false
    api.getTasks()
      .then(remoteTasks => {
        if (!cancelled) {
          setTasks(remoteTasks)
          setAppError('')
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
  }, [loggedIn])

  function signIn(token: string, remember: boolean) {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('token', token)
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
    } catch (error) {
      setAppError(error instanceof Error ? error.message : 'Unable to update task.')
    }
  }

  async function deleteTask(id: number) {
    setAppError('')
    try {
      await api.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
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

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        onNavigate={setPage}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          setTasks([])
          setLoggedIn(false)
        }}
      />
      <main className="main-area">
        <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu size={21} />
        </button>
        {appError && <p className="app-error" role="alert">{appError}</p>}
        {page === 'dashboard'
          ? <Dashboard tasks={tasks} onAdd={() => { setEditing(null); setModalOpen(true) }} onTasks={() => setPage('tasks')} onToggle={toggleTask} />
          : <TaskList tasks={tasks} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={editTask} onDelete={deleteTask} onToggle={toggleTask} />}
      </main>
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
