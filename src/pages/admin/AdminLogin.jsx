import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, isLive } from '../../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-400 font-display text-xl font-bold text-ink-950">D</span>
          <span className="font-display text-xl font-bold text-white">Dionz<span className="text-brand-400">Motors</span></span>
        </Link>
        <form onSubmit={submit} className="rounded-2xl border border-ink-800 bg-ink-900 p-6 shadow-2xl">
          <h1 className="font-display text-lg font-bold text-white">Staff sign in</h1>
          <p className="mt-1 text-xs text-ink-400">Staff & admin only.</p>
          {!isLive && (
            <p className="mt-3 rounded-xl border border-brand-400/30 bg-brand-400/10 p-3 text-xs text-brand-300">
              Demo mode — sign in with <b>admin@dionzmotors.co.ke</b> / <b>demo1234</b>
            </p>
          )}
          <div className="mt-5 space-y-4">
            <div>
              <label className="label !text-ink-400" htmlFor="a-email">Email</label>
              <input id="a-email" type="email" required autoComplete="username" className="input !border-ink-700 !bg-ink-950 !text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label !text-ink-400" htmlFor="a-pass">Password</label>
              <input id="a-pass" type="password" required autoComplete="current-password" className="input !border-ink-700 !bg-ink-950 !text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button disabled={busy} className="btn-primary mt-5 w-full disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
          <Link to="/" className="mt-4 block text-center text-xs text-ink-500 hover:text-ink-300">← Back to website</Link>
        </form>
      </div>
    </div>
  )
}
