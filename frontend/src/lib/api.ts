import type { Priority, Task, TaskStatus } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

type AuthResponse = {
  access_token: string
  token_type: string
  role: string
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
        message = parsed.detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(', ')
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

function toApiTask(task: TaskInput) {
  return {
    title: task.title,
    description: task.description || null,
    status: task.status.toLowerCase(),
    priority: task.priority.toLowerCase(),
    due_date: task.dueDate || null,
  }
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  async getTasks() {
    const tasks = await request<ApiTask[]>('/tasks')
    return tasks.map(toTask)
  },

  async createTask(task: TaskInput) {
    const created = await request<ApiTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(toApiTask(task)),
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
}
