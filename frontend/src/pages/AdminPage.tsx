import { useCallback, useEffect, useState } from 'react'
import { Activity, Check, RefreshCw, Shield, Users } from 'lucide-react'
import { api } from '../lib/api'
import type { AdminStats, AdminTask, AdminUser } from '../lib/api'
import type { UserRole } from '../types'

type AdminPageKey = 'admin-dashboard' | 'admin-users' | 'admin-tasks'

type Props = {
  page: AdminPageKey
  onNavigate: (page: AdminPageKey) => void
}

function formatDate(value: string | null) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}

export default function AdminPage({ page, onNavigate }: Props) {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [tasks, setTasks] = useState<AdminTask[]>([])
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [nextStats, nextUsers, nextTasks, currentUser] = await Promise.all([
        api.getAdminStats(),
        api.getAdminUsers(),
        api.getAdminTasks(),
        api.getCurrentUser(),
      ])
      setStats(nextStats)
      setUsers(nextUsers)
      setTasks(nextTasks)
      setCurrentUserId(currentUser.id)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load admin data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  async function changeRole(user: AdminUser) {
    const role: UserRole = user.role === 'admin' ? 'user' : 'admin'
    setError('')
    try {
      const updatedUser = await api.updateUserRole(user.id, role)
      setUsers(previous => previous.map(item => item.id === updatedUser.id ? updatedUser : item))
      await loadData()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update user role.')
    }
  }

  async function removeUser(user: AdminUser) {
    if (!window.confirm(`Delete ${user.name}'s account and all their tasks?`)) return

    setError('')
    try {
      await api.deleteUser(user.id)
      await loadData()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete user.')
    }
  }

  const title = page === 'admin-users'
    ? 'User management'
    : page === 'admin-tasks' ? 'All tasks' : 'Admin overview'

  return (
    <div className="page-container">
      <header className="page-header dashboard-header">
        <div>
          <div className="eyebrow">TASKLY ADMINISTRATION</div>
          <h1>{title}</h1>
          <p>Manage your workspace and keep an eye on activity.</p>
        </div>
        <button className="secondary-btn admin-refresh" onClick={() => void loadData()} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'admin-refreshing' : ''} />
          Refresh
        </button>
      </header>

      {error && <p className="app-error" role="alert">{error}</p>}

      {loading && !stats ? (
        <div className="dashboard-card admin-empty-state">Loading admin workspace...</div>
      ) : (
        <>
          {stats && (
            <div className="stats-grid">
              <div className="stat-card stat-card-purple">
                <div className="stat-icon"><Users size={19} /></div>
                <div className="stat-label">Registered users</div>
                <div className="stat-value">{stats.total_registered_users}</div>
                <div className="stat-description">{stats.total_users} users in the workspace</div>
              </div>
              <div className="stat-card stat-card-peach">
                <div className="stat-icon"><Shield size={19} /></div>
                <div className="stat-label">Administrators</div>
                <div className="stat-value">{stats.total_admins}</div>
                <div className="stat-description">Accounts with admin access</div>
              </div>
              <div className="stat-card stat-card-green">
                <div className="stat-icon"><Activity size={19} /></div>
                <div className="stat-label">All tasks</div>
                <div className="stat-value">{stats.total_tasks}</div>
                <div className="stat-description">{stats.pending_tasks} tasks still pending</div>
              </div>
              <div className="stat-card stat-card-red">
                <div className="stat-icon"><Check size={19} /></div>
                <div className="stat-label">Completed</div>
                <div className="stat-value">{stats.completed_tasks}</div>
                <div className="stat-description">Tasks completed by all users</div>
              </div>
            </div>
          )}

          {page === 'admin-dashboard' && (
            <div className="admin-overview-grid">
              <section className="dashboard-card admin-panel">
                <div className="section-heading">
                  <div><h2>Recent users</h2><p>Accounts registered in Taskly.</p></div>
                  <button className="view-all-btn" onClick={() => onNavigate('admin-users')}>Manage users</button>
                </div>
                <UserTable
                  users={users.slice(-5).reverse()}
                  currentUserId={currentUserId}
                  compact
                />
              </section>
              <section className="dashboard-card admin-panel">
                <div className="section-heading">
                  <div><h2>Recent tasks</h2><p>Latest activity across the workspace.</p></div>
                  <button className="view-all-btn" onClick={() => onNavigate('admin-tasks')}>View all</button>
                </div>
                <TaskTable tasks={tasks.slice(0, 5)} />
              </section>
            </div>
          )}

          {page === 'admin-users' && (
            <section className="dashboard-card admin-panel">
              <div className="section-heading">
                <div><h2>Workspace users</h2><p>Promote or remove accounts. Your own account cannot be changed here.</p></div>
                <span className="admin-count">{users.length} accounts</span>
              </div>
              <UserTable users={users} currentUserId={currentUserId} onChangeRole={changeRole} onDelete={removeUser} />
            </section>
          )}

          {page === 'admin-tasks' && (
            <section className="dashboard-card admin-panel">
              <div className="section-heading">
                <div><h2>Workspace tasks</h2><p>Tasks created by all registered users.</p></div>
                <span className="admin-count">{tasks.length} tasks</span>
              </div>
              <TaskTable tasks={tasks} />
            </section>
          )}
        </>
      )}
    </div>
  )
}

function UserTable({
  users,
  currentUserId,
  onChangeRole,
  onDelete,
  compact = false,
}: {
  users: AdminUser[]
  currentUserId: number | null
  onChangeRole?: (user: AdminUser) => void
  onDelete?: (user: AdminUser) => void
  compact?: boolean
}) {
  if (users.length === 0) return <div className="admin-empty-state">No users found.</div>

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            {!compact && <th>Joined</th>}
            {!compact && onChangeRole && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="admin-user-name">{user.name}{user.id === currentUserId && <span className="admin-you-label">You</span>}</div>
                <div className="admin-user-email">{user.email}</div>
              </td>
              <td><span className={`admin-role-badge ${user.role}`}>{user.role}</span></td>
              {!compact && <td>{formatDate(user.created_at)}</td>}
              {!compact && onChangeRole && (
                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-action-btn"
                      onClick={() => onChangeRole(user)}
                      disabled={user.id === currentUserId}
                    >
                      Make {user.role === 'admin' ? 'user' : 'admin'}
                    </button>
                    {onDelete && (
                      <button
                        className="admin-action-btn danger"
                        onClick={() => onDelete(user)}
                        disabled={user.id === currentUserId}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TaskTable({ tasks }: { tasks: AdminTask[] }) {
  if (tasks.length === 0) return <div className="admin-empty-state">No tasks found.</div>

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr><th>Task</th><th>User ID</th><th>Status</th><th>Priority</th><th>Due date</th></tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>
                <div className="admin-user-name">{task.title}</div>
                {task.description && <div className="admin-user-email">{task.description}</div>}
              </td>
              <td>#{task.user_id}</td>
              <td><span className={`status-pill status-${task.status.toLowerCase()}`}>{task.status}</span></td>
              <td><span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span></td>
              <td>{formatDate(task.due_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
