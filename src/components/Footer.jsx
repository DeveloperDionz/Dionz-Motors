import { Link } from 'react-router-dom'
import { IconMail, IconPhone, IconPin } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-300 dark:border-ink-800">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-400 font-display text-lg font-bold text-ink-950">D</span>
            <span className="font-display text-lg font-bold text-white">Dionz<span className="text-brand-400">Motors</span></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            Nairobi's trusted digital showroom. Every unit inspected, every logbook verified, every price transparent.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[['Inventory', '/inventory'], ['Financing', '/financing'], ['Blog', '/blog'], ['About Us', '/about'], ['Contact', '/contact'], ['Admin', '/admin']].map(([label, to]) => (
              <li key={to}><Link to={to} className="transition hover:text-brand-400">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Visit Us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> Magadi Road, Ongata Rongai, Kajiado County</li>
            <li className="flex gap-2.5"><IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> +254 712 000 900</li>
            <li className="flex gap-2.5"><IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> sales@dionzmotors.co.ke</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Opening Hours</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-400">
            <li className="flex justify-between gap-4"><span>Mon – Fri</span><span className="text-ink-200">8:00 – 18:00</span></li>
            <li className="flex justify-between gap-4"><span>Saturday</span><span className="text-ink-200">9:00 – 17:00</span></li>
            <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-ink-200">By appointment</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Dionz Motors Ltd. All rights reserved.</p>
          <p>Design by Developer Dionz.</p>
        </div>
      </div>
    </footer>
  )
}
