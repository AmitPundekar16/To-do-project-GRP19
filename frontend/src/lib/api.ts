import type { Priority, Task, TaskStatus, UserRole } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

type AuthResponse = {
  access_token: string
  token_type: string
  role: UserRole
}

export type AdminUser = {
  id: number
  name: string
  email: string
  role: UserRole
  created_at: string | null
}

export type AdminTask = {
  id: number
  user_id: number
  title: string
  description: string | null
  status: string
  priority: string
  due_date: string | null
  created_at: string
}

export type AdminStats = {
  total_registered_users: number
  total_users: number
  total_admins: number
  total_tasks: number
  completed_tasks: number
  pending_tasks: number
}

type ApiTask = {
  id: number
  title: string
  description: string | null
  status: 'pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
}

type TaskInput = Omit<Task, 'id'>
export type AiAction = 'task_breakdown' | 'daily_plan' | 'task_suggestions'

const priorities: Record<ApiTask['priority'], Priority> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

function getToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

async function send(path: string, options: RequestInit = {}) {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const body = await response.text()
    let message = body || response.statusText
    try {
      const parsed = JSON.parse(body)
      if (typeof parsed.detail === 'string') {
        message = parsed.detail
      } else if (Array.isArray(parsed.detail)) {
        message = parsed.detail
          .map((item: { msg?: string }) => item.msg)
          .filter(Boolean)
          .join(', ')
      }
    } catch {
      // Keep the response text when the server does not return JSON.
    }
    throw new Error(`API request failed (${response.status}): ${message}`)
  }

  return response
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await send(path, options)
  return response.json() as Promise<T>
}

function toTask(task: ApiTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description || '',
    status: task.status === 'completed' ? 'Completed' : 'Pending',
    priority: priorities[task.priority],
    dueDate: task.due_date || '',
  }
}

function taskFields(task: TaskInput) {
  return {
    title: task.title,
    description: task.description || null,
    priority: task.priority.toLowerCase(),
    due_date: task.dueDate || null,
  }
}

function toApiTask(task: TaskInput) {
  return {
    ...taskFields(task),
    status: task.status.toLowerCase(),
  }
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request<AdminUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getCurrentUser: () => request<AdminUser>('/auth/me'),

  getAdminStats: () => request<AdminStats>('/admin/stats'),

  getAdminUsers: () => request<AdminUser[]>('/admin/users'),

  getAdminTasks: () => request<AdminTask[]>('/admin/tasks'),

  updateUserRole: (userId: number, role: UserRole) =>
    request<AdminUser>(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }),

  deleteUser: async (userId: number) => {
    await send(`/admin/users/${userId}`, { method: 'DELETE' })
  },

  async getTasks() {
    const tasks = await request<ApiTask[]>('/tasks')
    return tasks.map(toTask)
  },

  async createTask(task: TaskInput) {
    const created = await request<ApiTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskFields(task)),
    })
    return toTask(created)
  },

  async updateTask(id: number, task: TaskInput) {
    const updated = await request<ApiTask>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toApiTask(task)),
    })
    return toTask(updated)
  },

  async updateStatus(id: number, status: TaskStatus) {
    const updated = await request<ApiTask>(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: status.toLowerCase() }),
    })
    return toTask(updated)
  },

  async deleteTask(id: number) {
    await send(`/tasks/${id}`, { method: 'DELETE' })
  },

  aiAssistant: (input: { action: AiAction; task_id?: number; goal?: string }) =>
    request<{ action: AiAction; result: string }>('/ai/assistant', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
}
