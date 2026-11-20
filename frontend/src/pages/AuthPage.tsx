import { useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, LockKeyhole } from 'lucide-react'
import { api } from '../lib/api'

type Props = {
  onLogin: (token: string, remember: boolean) => void
  authError?: string
}

export default function AuthPage({ onLogin, authError }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (mode === 'register') {
        await api.register(name.trim(), email.trim(), password)
      }
      const result = await api.login(email.trim(), password)
      onLogin(result.access_token, remember)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <section className="login-visual">
        <div className="login-brand">
          <div className="logo-mark">T</div>
          <span>Taskly</span>
        </div>

        <div className="login-decoration">
          <div className="clay-blob" />
          <div className="clay-circle" />
          <div className="clay-card">
            <div className="clay-line" />
            <div className="clay-line" />
            <div className="clay-line short" />
            <div className="clay-completed">
              <CheckCircle2 size={22} color="#5e9b7a" />
              <span>Task completed</span>
            </div>
          </div>
          <div className="clay-person" />
          <div className="clay-small-card" />
        </div>

        <div className="login-copy">
          <h1>
            Make tasks
            <br />
            feel simple.
          </h1>
          <p>
            Organize your day, keep track of your goals,
            and get things done with Taskly.
          </p>
        </div>
      </section>

      <section className="login-form-area">
        <div className="login-card">
          <div className="login-icon">
            <LockKeyhole size={22} />
          </div>

          <h2>{mode === 'login' ? 'Welcome back!' : 'Create your account'}</h2>
          <p className="login-card-subtitle">
            {mode === 'login'
              ? 'Sign in to continue managing your tasks.'
              : 'Create an account and start organizing your day.'}
          </p>

          {(error || authError) && (
            <p className="form-error" role="alert">
              {error || authError}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="login-input">
                <label htmlFor="auth-name">Full name</label>
                <input
                  id="auth-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  minLength={1}
                  maxLength={100}
                  required
                />
              </div>
            )}

            <div className="login-input">
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="login-input">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                minLength={6}
                maxLength={72}
                required
              />
            </div>

            {mode === 'login' && (
              <div className="login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={event => setRemember(event.target.checked)}
                  />
                  Remember me
                </label>
              </div>
            )}

            <button
              type="submit"
              className="primary-btn login-submit"
              disabled={submitting}
            >
              {submitting
                ? 'Please wait...'
                : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="signup-text">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setError('')
              }}
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
