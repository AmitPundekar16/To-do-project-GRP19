import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { api } from '../lib/api'
import type { AiAction } from '../lib/api'
import type { Task } from '../types'

type Props = {
  tasks: Task[]
  onNotify: (message: string) => void
}

const modes: { action: AiAction; label: string; description: string }[] = [
  { action: 'task_breakdown', label: 'Break down a task', description: 'Turn one task into a short list of actionable steps.' },
  { action: 'daily_plan', label: 'Plan my day', description: 'Organize your pending tasks into a practical daily plan.' },
  { action: 'task_suggestions', label: 'Suggest tasks', description: 'Get task ideas based on a goal you enter.' },
]

export default function AiAssistantPage({ tasks, onNotify }: Props) {
  const [action, setAction] = useState<AiAction>('task_breakdown')
  const [taskId, setTaskId] = useState('')
  const [goal, setGoal] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const activeMode = modes.find(mode => mode.action === action)!

  async function submit() {
    setLoading(true)
    setError('')
    setResult('')
    try {
      const response = await api.aiAssistant({
        action,
        ...(action === 'task_breakdown' ? { task_id: Number(taskId) } : {}),
        ...(action === 'task_suggestions' ? { goal: goal.trim() } : {}),
      })
      setResult(response.result)
      onNotify('AI response is ready.')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to get an AI response.')
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = !loading
    && (action !== 'task_breakdown' || Boolean(taskId))
    && (action !== 'task_suggestions' || Boolean(goal.trim()))

  return (
    <div className="page-container">
      <header className="page-header dashboard-header">
        <div>
          <div className="eyebrow">YOUR AI WORKSPACE</div>
          <h1>AI assistant</h1>
          <p>Get help planning and organizing your tasks.</p>
        </div>
      </header>

      <div className="assistant-layout">
        <section className="dashboard-card assistant-card">
          <div className="assistant-mode-list" role="tablist" aria-label="AI assistant actions">
            {modes.map(mode => (
              <button
                className={`assistant-mode ${action === mode.action ? 'active' : ''}`}
                key={mode.action}
                onClick={() => { setAction(mode.action); setError(''); setResult('') }}
                role="tab"
                aria-selected={action === mode.action}
              >
                <strong>{mode.label}</strong>
                <span>{mode.description}</span>
              </button>
            ))}
          </div>

          <div className="assistant-input-area">
            <h2>{activeMode.label}</h2>
            <p>{activeMode.description}</p>
            {action === 'task_breakdown' && (
              <label className="assistant-field">
                Choose a pending task
                <select value={taskId} onChange={event => setTaskId(event.target.value)}>
                  <option value="">Select a task</option>
                  {tasks.filter(task => task.status === 'Pending').map(task => (
                    <option value={task.id} key={task.id}>{task.title}</option>
                  ))}
                </select>
              </label>
            )}
            {action === 'task_suggestions' && (
              <label className="assistant-field">
                What goal are you working toward?
                <textarea
                  value={goal}
                  onChange={event => setGoal(event.target.value)}
                  maxLength={1000}
                  placeholder="For example: prepare for my biology exam"
                  rows={4}
                />
              </label>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-btn assistant-submit" onClick={() => void submit()} disabled={!canSubmit}>
              <Sparkles size={17} />
              {loading ? 'Thinking...' : 'Generate'}
            </button>
            <p className="assistant-privacy-note">
              Your task details may be sent to Google Gemini to generate this response. The API key stays on the backend.
            </p>
          </div>
        </section>

        <section className="dashboard-card assistant-result" aria-live="polite">
          <div className="section-heading">
            <div><h2>Assistant response</h2><p>Suggestions are not saved as tasks automatically.</p></div>
            <div className="progress-trend"><Sparkles size={18} /></div>
          </div>
          {result ? <pre>{result}</pre> : (
            <div className="admin-empty-state">Choose an action and generate a response to get started.</div>
          )}
        </section>
      </div>
    </div>
  )
}
