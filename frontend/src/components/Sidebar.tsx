import {
  CalendarDays,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Moon,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react'
import type { AppPage, UserRole } from '../types'

type Props = {
  page: AppPage
  role: UserRole
  onNavigate: (page: AppPage) => void
  darkMode: boolean
  onToggleTheme: () => void
  mobileOpen: boolean
  onClose: () => void
  onLogout: () => void
}

export default function Sidebar({
  page,
  role,
  onNavigate,
  darkMode,
  onToggleTheme,
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
        {role === 'admin' ? (
          <>
            <button
              className={`nav-item ${page === 'admin-dashboard' ? 'active' : ''}`}
              onClick={() => { onNavigate('admin-dashboard'); onClose() }}
            >
              <LayoutDashboard size={19} />
              Overview
            </button>
            <button
              className={`nav-item ${page === 'admin-users' ? 'active' : ''}`}
              onClick={() => { onNavigate('admin-users'); onClose() }}
            >
              <Users size={19} />
              Users
            </button>
            <button
              className={`nav-item ${page === 'admin-tasks' ? 'active' : ''}`}
              onClick={() => { onNavigate('admin-tasks'); onClose() }}
            >
              <ClipboardList size={19} />
              All Tasks
            </button>
            <button
              className={`nav-item ${page === 'tasks' ? 'active' : ''}`}
              onClick={() => { onNavigate('tasks'); onClose() }}
            >
              <ListTodo size={19} />
              My Tasks
            </button>
          </>
        ) : (
          <>
            <button
              className={`nav-item ${page === 'dashboard' ? 'active' : ''}`}
              onClick={() => { onNavigate('dashboard'); onClose() }}
            >
              <LayoutDashboard size={19} />
              Dashboard
            </button>
            <button
              className={`nav-item ${page === 'tasks' ? 'active' : ''}`}
              onClick={() => { onNavigate('tasks'); onClose() }}
            >
              <ListTodo size={19} />
              My Tasks
            </button>
          </>
        )}
        <div className="nav-divider" />
        <button
          className={`nav-item ${page === 'calendar' ? 'active' : ''}`}
          onClick={() => { onNavigate('calendar'); onClose() }}
        >
          <CalendarDays size={19} />
          Calendar
        </button>
        <button
          className={`nav-item ${page === 'reports' ? 'active' : ''}`}
          onClick={() => { onNavigate('reports'); onClose() }}
        >
          <BarChart3 size={19} />
          Progress reports
        </button>
        <button
          className={`nav-item ${page === 'assistant' ? 'active' : ''}`}
          onClick={() => { onNavigate('assistant'); onClose() }}
        >
          <Sparkles size={19} />
          AI assistant
        </button>
      </nav>

      <div className="sidebar-bottom">
        <button className="theme-toggle" onClick={onToggleTheme}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
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