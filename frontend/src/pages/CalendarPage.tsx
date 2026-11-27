import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Task } from '../types'
import { isTaskOverdue, localDateKey } from '../lib/taskDates'

type Props = {
  tasks: Task[]
}

export default function CalendarPage({ tasks }: Props) {
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState(localDateKey())

  const monthLabel = month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1,
  )
  const tasksByDate = useMemo(() => {
    const grouped = new Map<string, Task[]>()
    tasks.filter(task => task.dueDate).forEach(task => {
      const current = grouped.get(task.dueDate) ?? []
      current.push(task)
      grouped.set(task.dueDate, current)
    })
    return grouped
  }, [tasks])
  const selectedTasks = tasksByDate.get(selectedDate) ?? []

  function moveMonth(amount: number) {
    const next = new Date(month.getFullYear(), month.getMonth() + amount, 1)
    setMonth(next)
    setSelectedDate(localDateKey(next))
  }

  return (
    <div className="page-container">
      <header className="page-header dashboard-header">
        <div>
          <div className="eyebrow">PLAN YOUR TIME</div>
          <h1>Task calendar</h1>
          <p>See due dates and choose a day to review its tasks.</p>
        </div>
      </header>

      <section className="dashboard-card calendar-card">
        <div className="calendar-toolbar">
          <button className="calendar-arrow" onClick={() => moveMonth(-1)} aria-label="Previous month">
            <ChevronLeft size={19} />
          </button>
          <h2>{monthLabel}</h2>
          <button className="calendar-arrow" onClick={() => moveMonth(1)} aria-label="Next month">
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="calendar-grid" role="grid" aria-label={monthLabel}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div className="calendar-weekday" key={day}>{day}</div>
          ))}
          {cells.map((day, index) => {
            if (day === null) return <div className="calendar-day empty" key={`empty-${index}`} />
            const date = new Date(month.getFullYear(), month.getMonth(), day)
            const dateKey = localDateKey(date)
            const dueTasks = tasksByDate.get(dateKey) ?? []
            return (
              <button
                className={`calendar-day ${selectedDate === dateKey ? 'selected' : ''} ${localDateKey() === dateKey ? 'today' : ''}`}
                key={dateKey}
                onClick={() => setSelectedDate(dateKey)}
                aria-pressed={selectedDate === dateKey}
              >
                <span className="calendar-day-number">{day}</span>
                {dueTasks.slice(0, 2).map(task => (
                  <span
                    className={`calendar-task ${isTaskOverdue(task) ? 'overdue' : ''}`}
                    key={task.id}
                    title={task.title}
                  >
                    {task.title}
                  </span>
                ))}
                {dueTasks.length > 2 && <span className="calendar-more">+{dueTasks.length - 2} more</span>}
              </button>
            )
          })}
        </div>

        <div className="calendar-agenda">
          <h3>{new Date(`${selectedDate}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
          {selectedTasks.length ? (
            <ul>
              {selectedTasks.map(task => (
                <li className={isTaskOverdue(task) ? 'overdue' : ''} key={task.id}>
                  <span>{task.title}</span>
                  <span className={`status-pill status-${task.status.toLowerCase()}`}>{task.status}</span>
                </li>
              ))}
            </ul>
          ) : <p>No tasks due on this day.</p>}
        </div>
      </section>
    </div>
  )
}
