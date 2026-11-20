import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  CalendarDays,
  Flag,
  Plus,
  X,
} from 'lucide-react'
import type { Task } from '../types'

type Props = {
  task: Task | null
  error?: string
  onClose: () => void
  onSave: (data: Omit<Task, 'id'>) => Promise<void>
}

export default function TaskModal({
  task,
  error,
  onClose,
  onSave,
}: Props) {

  const [title, setTitle] = useState(
    task?.title ?? ''
  )

  const [description, setDescription] = useState(
    task?.description ?? ''
  )

  const [dueDate, setDueDate] = useState(
    task?.dueDate ?? ''
  )

  const [priority, setPriority] = useState<
    Task['priority']
  >(task?.priority ?? 'Medium')

  const [status, setStatus] = useState<
    Task['status']
  >(task?.status ?? 'Pending')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!title.trim()) return

    setSaving(true)
    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        status,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >

      <div
        className="modal task-modal"
        role="dialog"
        aria-modal="true"
      >

        {/* HEADER */}
        <div className="task-modal-header">

          <div className="task-modal-title-wrap">

            <div className="task-modal-icon">
              <Plus size={21} />
            </div>

            <div>
              <h2>
                {task
                  ? 'Edit task'
                  : 'Create a new task'}
              </h2>

              <p>
                Add the details and keep your day organized.
              </p>
            </div>

          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* FORM */}
        <form
          className="task-form"
          onSubmit={handleSubmit}
        >
          {error && <p className="form-error" role="alert">{error}</p>}

          {/* TITLE */}
          <div className="form-group">
            <label htmlFor="task-title">
              Task title
            </label>

            <input
              id="task-title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Finish project presentation"
              autoFocus
            />
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label htmlFor="task-description">
              Description
              <span>Optional</span>
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Add a short description..."
            />
          </div>

          {/* DATE */}
          <div className="form-group">
            <label htmlFor="task-date">
              Due date
            </label>

            <div className="input-with-icon">
              <CalendarDays size={17} />

              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />
            </div>
          </div>

          {/* PRIORITY */}
          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <div className="select-with-icon">
              <Flag size={17} />
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* STATUS WHEN EDITING */}
          {task && (
            <div className="form-group">
              <label htmlFor="task-status">
                Status
              </label>

              <select
                id="task-status"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as Task['status']
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>
          )}

          {/* ACTIONS */}
          <div className="task-modal-actions">

            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn modal-create-btn"
              disabled={saving}
            >
              <Plus size={18} />

              {saving ? 'Saving...' : task ? 'Save changes' : 'Create task'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}