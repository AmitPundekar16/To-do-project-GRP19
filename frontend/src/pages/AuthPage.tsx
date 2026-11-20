
import { FormEvent, useState } from 'react'
import {
  CheckCircle2,
  LockKeyhole,
  Phone,
} from 'lucide-react'

type Props = {
  onLogin: (token: string) => void
}

export default function AuthPage({ onLogin }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [remember, setRemember] = useState(true)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    localStorage.setItem('token', 'ui-demo-token')
    onLogin('ui-demo-token')
  }

  return (
    <div className="login-page">

      {/* LEFT VISUAL SECTION */}
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

      {/* RIGHT LOGIN SECTION */}
      <section className="login-form-area">
        <div className="login-card">

          <div className="login-icon">
            <LockKeyhole size={22} />
          </div>

          <h2>
            {mode === 'login'
              ? 'Welcome back!'
              : 'Create your account'}
          </h2>

          <p className="login-card-subtitle">
            {mode === 'login'
              ? 'Sign in to continue managing your tasks.'
              : 'Create an account and start organizing your day.'}
          </p>

          <form onSubmit={handleSubmit}>

            {mode === 'register' && (
              <div className="login-input">
                <label htmlFor="auth-name">Full name</label>
                <input
                  id="auth-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === 'login' && (
              <div className="login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>

                <a href="#" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="primary-btn login-submit"
            >
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>

          </form>

          <div className="divider">
            OR CONTINUE WITH
          </div>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="google-btn"
          >
            <svg
              className="google-icon"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z"
              />
              <path
                fill="#EA4335"
                d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z"
              />
            </svg>

            <span>Continue with Google</span>
          </button>

          {/* PHONE NUMBER FIELD */}
          <div className="phone-section">
            <div className="phone-divider">
              OR USE PHONE NUMBER
            </div>

            <label htmlFor="auth-phone">
              Phone number
            </label>

            <div className="phone-input">
              <Phone size={18} />

              <input
                id="auth-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* REGISTER / LOGIN SWITCH */}
          <div className="signup-text">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}

            <button
              type="button"
              onClick={() =>
                setMode(mode === 'login' ? 'register' : 'login')
              }
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </div>

        </div>
      </section>
    </div>
  )
}
