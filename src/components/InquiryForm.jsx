import { useState } from 'react'
import { submitLead } from '../lib/supabase'

const TYPES = [
  ['inquiry', 'General inquiry'],
  ['quote', 'Get a quote'],
  ['test_drive', 'Book a test drive'],
  ['financing', 'Financing'],
  ['trade_in', 'Trade-in'],
]

export default function InquiryForm({ carId = null, carLabel = '', defaultType = 'inquiry', title = 'Send an Inquiry' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: defaultType })
  const [state, setState] = useState('idle') // idle | sending | done | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitLead({ ...form, car_id: carId })
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="card animate-fade-up p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 12.5l5 5 10-11" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold">Inquiry received!</h3>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Our team will reach out within one business hour (8am–8pm EAT).</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {carLabel && <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Regarding: <span className="font-semibold text-ink-700 dark:text-ink-200">{carLabel}</span></p>}
      <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="iq-name">Full name *</label>
          <input id="iq-name" required className="input" placeholder="Jane Wanjiru" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className="label" htmlFor="iq-phone">Phone *</label>
          <input id="iq-phone" required type="tel" className="input" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={set('phone')} />
        </div>
        <div>
          <label className="label" htmlFor="iq-email">Email</label>
          <input id="iq-email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
        </div>
        <div>
          <label className="label" htmlFor="iq-type">I'm interested in</label>
          <select id="iq-type" className="input" value={form.type} onChange={set('type')}>
            {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="iq-msg">Message</label>
          <textarea id="iq-msg" rows={3} className="input resize-none" placeholder="Tell us what you need…" value={form.message} onChange={set('message')} />
        </div>
      </div>
      {state === 'error' && <p className="mt-3 text-sm text-red-500">Something went wrong — please try again or WhatsApp us.</p>}
      <button disabled={state === 'sending'} className="btn-primary mt-4 w-full disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Send Inquiry'}
      </button>
      <p className="mt-3 text-center text-[11px] text-ink-400">We respect your privacy — no spam, ever.</p>
    </form>
  )
}
