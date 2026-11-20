import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import Sidebar from './components/Sidebar'
import TaskModal from './components/TaskModal'
import type { Task } from './types'
import { api } from './lib/api'

const demoTasks: Task[] = [
  { id: 1, title: 'Finish UI/UX design for To-Do app', description: 'Finalize the Figma screens.', dueDate: 'Today, 4:00 PM', priority: 'High', status: 'In Progress', project: 'Internship' },
  { id: 2, title: 'Review project documentation', dueDate: 'Today, 6:00 PM', priority: 'Medium', status: 'Pending', project: 'College' },
  { id: 3, title: 'Complete database notes', dueDate: 'Nov 20, 10:00 AM', priority: 'Medium', status: 'Completed', project: 'College' },
  { id: 4, title: 'Prepare presentation slides', dueDate: 'Nov 21, 5:00 PM', priority: 'High', status: 'Pending', project: 'Internship' },
  { id: 5, title: 'Submit weekly report', dueDate: 'Nov 18, 7:00 PM', priority: 'High', status: 'Overdue', project: 'Work' },
  { id: 6, title: 'Organize study materials', dueDate: 'Nov 22, 2:00 PM', priority: 'Low', status: 'Completed', project: 'Personal' },
  { id: 7, title: 'Plan next week', dueDate: 'Nov 23, 8:00 PM', priority: 'Low', status: 'Completed', project: 'Personal' },
]

function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('token'))
  const [page, setPage] = useState<'dashboard' | 'tasks'>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>(demoTasks)

  useEffect(() => {
    api.getTasks()
      .then(remote => { if (Array.isArray(remote) && remote.length) setTasks(remote) })
      .catch(() => {
        // Backend is optional during UI development. Demo data remains active.
      })
  }, [loggedIn])

  if (!loggedIn) return <AuthPage onLogin={() => setLoggedIn(true)} />

  function saveTask(data: Omit<Task, 'id'>) {
    if (editing) {
      setTasks(prev => prev.map(t => t.id === editing.id ? { ...data, id: editing.id } : t))
      api.updateTask(editing.id, data).catch(() => {})
    } else {
      const newTask = { ...data, id: Date.now() }
      setTasks(prev => [newTask, ...prev])
      api.createTask(data).catch(() => {})
    }
    setModalOpen(false)
    setEditing(null)
  }

  function toggleTask(id: number) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t))
  }

  function deleteTask(id: number) {
    setTasks(prev => prev.filter(t => t.id !== id))
    api.deleteTask(id).catch(() => {})
  }

  function editTask(task: Task) {
    setEditing(task)
    setModalOpen(true)
  }

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => { localStorage.removeItem('token'); setLoggedIn(false) }} />
      <main className="main-area">
        <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        {page === 'dashboard'
          ? <Dashboard tasks={tasks} onAdd={() => { setEditing(null); setModalOpen(true) }} onTasks={() => setPage('tasks')} onToggle={toggleTask} />
          : <TaskList tasks={tasks} onAdd={() => { setEditing(null); setModalOpen(true) }} onEdit={editTask} onDelete={deleteTask} onToggle={toggleTask} />}
      </main>
      {modalOpen && <TaskModal task={editing} onClose={() => { setModalOpen(false); setEditing(null) }} onSave={saveTask} />}
    </div>
  )
}

export default App