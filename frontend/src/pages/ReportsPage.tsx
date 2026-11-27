import { AlertTriangle, CheckCircle2, Clock3, ListTodo } from 'lucide-react'
import type { Task } from '../types'
import { isTaskOverdue } from '../lib/taskDates'

type Props = {
  tasks: Task[]
}

function BarGroup({ title, values }: { title: string; values: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...values.map(item => item.value), 1)

  return (
    <section className="dashboard-card report-chart">
      <h2>{title}</h2>
      <div className="report-bars">
        {values.map(item => (
          <div className="report-bar-row" key={item.label}>
            <span className="report-bar-label">{item.label}</span>
            <div className="report-bar-track">
              <span
                className="report-bar-fill"
                style={{ width: `${(item.value / max) * 100}%`, background: item.color }}
              />
            </div>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ReportsPage({ tasks }: Props) {
  const completed = tasks.filter(task => task.status === 'Completed').length
  const pending = tasks.length - completed
  const overdue = tasks.filter(isTaskOverdue).length
  const pendingOnTime = tasks.filter(task => task.status === 'Pending' && !isTaskOverdue(task)).length
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <div className="page-container">
      <header className="page-header dashboard-header">
        <div>
          <div className="eyebrow">YOUR PRODUCTIVITY REPORT</div>
          <h1>Progress reports</h1>
          <p>A current snapshot of your tasks and completion progress.</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card stat-card-purple">
          <div className="stat-icon"><ListTodo size={19} /></div>
          <div className="stat-label">Total tasks</div>
          <div className="stat-value">{tasks.length}</div>
          <div className="stat-description">Tasks in your workspace</div>
        </div>
        <div className="stat-card stat-card-green">
          <div className="stat-icon"><CheckCircle2 size={19} /></div>
          <div className="stat-label">Completed</div>
          <div className="stat-value">{completed}</div>
          <div className="stat-description">{completionRate}% completion rate</div>
        </div>
        <div className="stat-card stat-card-peach">
          <div className="stat-icon"><Clock3 size={19} /></div>
          <div className="stat-label">Pending</div>
          <div className="stat-value">{pending}</div>
          <div className="stat-description">Still to be completed</div>
        </div>
        <div className="stat-card stat-card-red">
          <div className="stat-icon"><AlertTriangle size={19} /></div>
          <div className="stat-label">Overdue</div>
          <div className="stat-value">{overdue}</div>
          <div className="stat-description">Pending past their due date</div>
        </div>
      </div>

      <div className="report-chart-grid">
        <BarGroup
          title="Tasks by status"
          values={[
            { label: 'Completed', value: completed, color: 'var(--success)' },
            { label: 'Pending on time', value: pendingOnTime, color: 'var(--primary)' },
            { label: 'Overdue', value: overdue, color: 'var(--danger)' },
          ]}
        />
        <BarGroup
          title="Tasks by priority"
          values={(['High', 'Medium', 'Low'] as const).map((priority, index) => ({
            label: priority,
            value: tasks.filter(task => task.priority === priority).length,
            color: ['var(--danger)', 'var(--warning)', 'var(--success)'][index],
          }))}
        />
      </div>
      <p className="report-note">Charts reflect your current tasks; historical completion dates are not recorded.</p>
    </div>
  )
}
