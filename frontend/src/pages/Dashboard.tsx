import {
  CalendarDays,
  Check,
  ChevronRight,
  Plus,
  TrendingUp,
} from 'lucide-react'
import type { Task } from '../types'
import { isTaskOverdue } from '../lib/taskDates'

type Props = {
  tasks: Task[]
  onAdd: () => void
  onTasks: () => void
  onToggle: (id: number) => void
}

export default function Dashboard({
  tasks,
  onAdd,
  onTasks,
  onToggle,
}: Props) {
  const completed = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const pending = tasks.filter(
    (task) => task.status === 'Pending'
  ).length
  const overdue = tasks.filter(isTaskOverdue).length

  const progress =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0

  const recentTasks = tasks.slice(0, 5)

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header dashboard-header">

        <div>
          <div className="eyebrow">YOUR PRODUCTIVITY SPACE</div>

          <h1>
            Welcome back <span className="wave">👋</span>
          </h1>

          <p>
            Stay organized and make today a productive one.
          </p>
        </div>

        <button
          className="primary-btn add-task-main-btn"
          onClick={onAdd}
        >
          <Plus size={19} />
          Add new task
        </button>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card stat-card-purple">
          <div className="stat-icon">
            <Check size={19} />
          </div>

          <div className="stat-label">
            Total Tasks
          </div>

          <div className="stat-value">
            {tasks.length}
          </div>

          <div className="stat-description">
            Tasks in your workspace
          </div>
        </div>

        <div className="stat-card stat-card-green">
          <div className="stat-icon">
            <Check size={19} />
          </div>

          <div className="stat-label">
            Completed
          </div>

          <div className="stat-value">
            {completed}
          </div>

          <div className="stat-description">
            Great progress!
          </div>
        </div>

        <div className="stat-card stat-card-peach">
          <div className="stat-icon">
            <TrendingUp size={19} />
          </div>

          <div className="stat-label">
            Pending
          </div>

          <div className="stat-value">
            {pending}
          </div>

          <div className="stat-description">
            Tasks to complete
          </div>
        </div>

        <div className="stat-card stat-card-red">
          <div className="stat-icon">
            <CalendarDays size={19} />
          </div>

          <div className="stat-label">
            Overdue
          </div>

          <div className="stat-value">
            {overdue}
          </div>

          <div className="stat-description">
            Pending tasks past their due date
          </div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-grid">

        {/* TODAY'S TASKS */}
        <section className="dashboard-card tasks-dashboard-card">

          <div className="section-heading">

            <div>
              <h2>Recent Tasks</h2>
              <p>
                Stay on top of your priorities.
              </p>
            </div>

            <button
              className="view-all-btn"
              onClick={onTasks}
            >
              View all
              <ChevronRight size={16} />
            </button>

          </div>

          <div className="dashboard-task-list">

            {recentTasks.length === 0 ? (
              <div className="empty-task-state">
                <div className="empty-task-icon">
                  <Check size={22} />
                </div>

                <h3>No tasks yet</h3>

                <p>
                  Create your first task and start
                  organizing your day.
                </p>

                <button
                  className="primary-btn"
                  onClick={onAdd}
                >
                  <Plus size={17} />
                  Create task
                </button>
              </div>
            ) : (
              recentTasks.map((task) => {

                const isCompleted =
                  task.status === 'Completed'

                return (
                  <div
                    className={`dashboard-task-row ${
                      isCompleted
                        ? 'task-completed'
                        : ''
                    }`}
                    key={task.id}
                  >

                    {/* CHECKBOX */}
                    <button
                      type="button"
                      className={`task-checkbox ${
                        isCompleted
                          ? 'checked'
                          : ''
                      }`}
                      onClick={() =>
                        onToggle(task.id)
                      }
                      aria-label={
                        isCompleted
                          ? 'Mark task incomplete'
                          : 'Mark task complete'
                      }
                    >
                      {isCompleted && (
                        <Check size={14} strokeWidth={3} />
                      )}
                    </button>

                    {/* TASK INFORMATION */}
                    <div className="dashboard-task-content">

                      <div
                        className="dashboard-task-title"
                        title={task.title}
                      >
                        {task.title}
                      </div>

                      <div className="dashboard-task-meta">
                        <CalendarDays size={13} />
                        <span className={isTaskOverdue(task) ? 'overdue' : ''}>
                          {isTaskOverdue(task) ? 'Overdue · ' : ''}{task.dueDate || 'No due date'}
                        </span>
                      </div>

                    </div>

                    {/* STATUS */}
                    <div className="dashboard-task-status">
                      <span
                        className={`status-pill status-${task.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {task.status}
                      </span>
                    </div>

                  </div>
                )
              })
            )}

          </div>

        </section>

        {/* WEEKLY PROGRESS */}
        <section className="dashboard-card progress-card">

          <div className="section-heading">
            <div>
              <h2>Completion Progress</h2>
              <p>
                Your completed tasks at a glance.
              </p>
            </div>

            <div className="progress-trend">
              <TrendingUp size={18} />
            </div>
          </div>

          <div className="progress-content">

            <div
              className="progress-ring large"
              style={{
                background: `
                  radial-gradient(
                    circle at center,
                      var(--surface) 57%,
                    transparent 58%
                  ),
                  conic-gradient(
                    var(--primary) ${progress}%,
                    var(--rose) 0
                  )
                `,
              }}
            >
              <div>
                <strong>{progress}%</strong>
                <span>completed</span>
              </div>
            </div>

            <div className="progress-summary">

              <div className="progress-summary-item">
                <span className="progress-dot completed-dot" />
                <div>
                  <strong>{completed}</strong>
                  <span>Completed</span>
                </div>
              </div>

              <div className="progress-summary-item">
                <span className="progress-dot remaining-dot" />
                <div>
                  <strong>
                    {Math.max(tasks.length - completed, 0)}
                  </strong>
                  <span>Remaining</span>
                </div>
              </div>

            </div>

          </div>

          <button
            className="progress-details-btn"
            onClick={onTasks}
          >
            View detailed progress
            <ChevronRight size={16} />
          </button>

        </section>

      </div>

    </div>
  )
}