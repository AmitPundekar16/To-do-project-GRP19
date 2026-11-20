import {
  LayoutDashboard,
  ListTodo,
  LogOut,
} from 'lucide-react'

type Props = {
  page: 'dashboard' | 'tasks'
  onNavigate: (page: 'dashboard' | 'tasks') => void
  mobileOpen: boolean
  onClose: () => void
  onLogout: () => void
}

export default function Sidebar({
  page,
  onNavigate,
  mobileOpen,
  onClose,
  onLogout,
}: Props) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>

      <div className="logo">
        <div className="logo-mark">T</div>
        <div className="logo-text">Taskly</div>
      </div>

      <nav className="nav">

        <button
          className={`nav-item ${
            page === 'dashboard' ? 'active' : ''
          }`}
          onClick={() => {
            onNavigate('dashboard')
            onClose()
          }}
        >
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        <button
          className={`nav-item ${
            page === 'tasks' ? 'active' : ''
          }`}
          onClick={() => {
            onNavigate('tasks')
            onClose()
          }}
        >
          <ListTodo size={19} />
          My Tasks
        </button>

      </nav>

      <div className="sidebar-bottom">

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  )
}