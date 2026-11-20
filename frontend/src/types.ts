export type Priority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'Pending' | 'Completed'

export type Task = {
  id: number
  title: string
  description?: string
  dueDate: string
  priority: Priority
  status: TaskStatus
}