export type Priority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'Pending' | 'Completed'
export type UserRole = 'user' | 'admin'
export type AppPage =
  | 'dashboard'
  | 'tasks'
  | 'reports'
  | 'calendar'
  | 'assistant'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-tasks'

export type Task = {
  id: number
  title: string
  description?: string
  dueDate: string
  priority: Priority
  status: TaskStatus
}