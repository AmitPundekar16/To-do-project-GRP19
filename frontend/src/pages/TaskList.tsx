import { useMemo, useState } from 'react'

import {
  Check,
  ChevronDown,
  Plus,
  Search,
  Trash2,
  Pencil,
  CalendarDays,
  SlidersHorizontal,
} from 'lucide-react'

import type { Task } from '../types'

type Props = {
  tasks: Task[]
  onAdd: () => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export default function TaskList({
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  const [query, setQuery] = useState('')

  const [filter, setFilter] = useState<
    'All Tasks' | 'Active' | 'Completed'
  >('All Tasks')

  const [priority, setPriority] =
    useState('All priorities')

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery =
        `${task.title} ${task.description ?? ''}`
          .toLowerCase()
          .includes(query.toLowerCase())

      const matchesFilter =
        filter === 'All Tasks' ||
        (filter === 'Completed'
          ? task.status === 'Completed'
          : task.status !== 'Completed')

      const matchesPriority =
        priority === 'All priorities' ||
        task.priority === priority

      return (
        matchesQuery &&
        matchesFilter &&
        matchesPriority
      )
    })
  }, [tasks, query, filter, priority])

  return (
    <div className="page-content">
      <header className="page-header task-page-header">
        <div>
          <p className="date-label">
            TASK MANAGEMENT
          </p>

          <h1>My Tasks</h1>

          <p className="page-subtitle">
            Manage everything you need to get done.
          </p>
        </div>

        <button
          className="btn btn-primary add-btn"
          onClick={onAdd}
        >
          <Plus size={18} />
          Add Task
        </button>
      </header>

      <div className="card task-list-card">
        <div className="toolbar">
          <div className="search-box">
            <Search size={17} />

            <input
              placeholder="Search tasks..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
          </div>

          <div className="filter-select">
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option>All priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <ChevronDown size={15} />
          </div>
        </div>

        <div className="filter-tabs">
          {(
            [
              'All Tasks',
              'Active',
              'Completed',
            ] as const
          ).map((tab) => (
            <button
              className={
                filter === tab
                  ? 'selected'
                  : ''
              }
              onClick={() => setFilter(tab)}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="task-table-head">
          <span />
          <span>Task</span>
          <span>Due date</span>
          <span>Priority</span>
          <span>Status</span>
          <span />
        </div>

        <div className="full-task-list">
          {filtered.map((task) => (
            <div
              className="full-task-row"
              key={task.id}
            >
              <button
                className={`task-check ${
                  task.status === 'Completed'
                    ? 'checked'
                    : ''
                }`}
                onClick={() =>
                  onToggle(task.id)
                }
                aria-label="Toggle task"
              >
                {task.status === 'Completed' && (
                  <Check size={14} />
                )}
              </button>

              <div className="full-task-title">
                <strong
                  className={
                    task.status === 'Completed'
                      ? 'strike'
                      : ''
                  }
                >
                  {task.title}
                </strong>

                {task.description && <span>{task.description}</span>}
              </div>

              <span className="due-date">
                <CalendarDays size={13} />
                {task.dueDate || 'No due date'}
              </span>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

              <span
                className={`badge ${task.status
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {task.status}
              </span>

              <div className="row-actions">
                <button
                  onClick={() => onEdit(task)}
                  title="Edit task"
                  aria-label="Edit task"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() =>
                    onDelete(task.id)
                  }
                  title="Delete task"
                  aria-label="Delete task"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {!filtered.length && (
            <div className="empty-state">
              <SlidersHorizontal
                size={22}
                style={{
                  marginBottom: 8,
                  opacity: 0.5,
                }}
              />

              <div>
                No tasks match your filters.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}