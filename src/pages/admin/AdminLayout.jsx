import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getSessionUser, getUserRole, signOut, isLive } from '../../lib/supabase'
import { IconCar, IconChart, IconDoc, IconMoon, IconSun, IconUsers } from '../../components/Icons'

const NAV = [
  { to: '/admin', end: true, label: 'Dashboard', icon: IconChart },
  { to: '/admin/inventory', label: 'Inventory', icon: IconCar },
  { to: '/admin/leads', label: 'Leads', icon: IconUsers },
  { to: '/admin/content', label: 'Content', icon: IconDoc },
]

export default function AdminLayout({ dark, toggleDark }) {
  const [state, setState] = useState({ loading: true, user: null, role: null })
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const user = await getSessionUser()
      if (!user) return navigate('/admin/login', { replace: true })
      const role = await getUserRole(user)
      if (role !== 'admin' && role !== 'staff') {
        await signOut()
        return navigate('/admin/login', { replace: true })
      }
      setState({ loading: false, user, role })
    })()
  }, [navigate])

  if (state.loading) {
    return <div className="grid min-h-screen place-items-center bg-ink-950 text-ink-400">Checking access…</div>
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur dark:border-ink-800 dark:bg-ink-900/90">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 font-display text-lg font-bold text-brand-400 dark:bg-brand-400 dark:text-ink-950">D</Link>
            <div>
              <p className="font-display text-sm font-bold leading-none">Dionz Admin</p>
              <p className="mt-0.5 text-[11px] text-ink-400">
                {state.user.email} · <span className="uppercase text-brand-500">{state.role}</span>
                {!isLive && ' · demo mode'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleDark} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-500 dark:border-ink-700 dark:text-ink-300">
              {dark ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
            </button>
            <Link to="/" className="btn-ghost !px-3.5 !py-2 text-xs">View site</Link>
            <button
              onClick={async () => { await signOut(); navigate('/admin/login') }}
              className="rounded-xl bg-ink-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-ink-700 dark:bg-ink-100 dark:text-ink-900"
            >
              Sign out
            </button>
          </div>
        </div>
        {/* nav tabs */}
        <nav className="mx-auto flex max-w-screen-2xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6" aria-label="Admin">
          {NAV.map((n) => (
            <NavLink
              key={n.to} to={n.to} end={n.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand-400 text-ink-950' : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white'
                }`
              }
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
        <Outlet context={{ role: state.role }} />
      </main>
    </div>
  )
}
