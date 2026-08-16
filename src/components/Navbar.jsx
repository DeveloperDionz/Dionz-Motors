import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconMenu, IconMoon, IconSun, IconX } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/financing', label: 'Financing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ dark, toggleDark }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 shadow-lg shadow-ink-900/5 backdrop-blur-md dark:bg-ink-950/85'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-[4.5rem]" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 font-display text-lg font-bold text-brand-400 dark:bg-brand-400 dark:text-ink-950">D</span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
            Dionz<span className="text-brand-500 dark:text-brand-400">Motors</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 text-ink-600 transition hover:border-brand-400 hover:text-brand-500 dark:border-ink-700 dark:text-ink-300"
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>
          <Link to="/inventory" className="btn-primary hidden !py-2.5 sm:inline-flex">Browse Cars</Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 text-ink-700 md:hidden dark:border-ink-700 dark:text-ink-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`md:hidden overflow-hidden bg-white/95 backdrop-blur-md transition-[max-height] duration-300 dark:bg-ink-950/95 ${
          open ? 'max-h-96 border-b border-ink-100 dark:border-ink-800' : 'max-h-0'
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {links.map((l, i) => (
            <li key={l.to} style={{ transitionDelay: `${i * 30}ms` }}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-600 dark:bg-ink-800 dark:text-brand-400' : 'text-ink-700 dark:text-ink-200'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2"><Link to="/inventory" className="btn-primary w-full">Browse Cars</Link></li>
        </ul>
      </div>
    </header>
  )
}
