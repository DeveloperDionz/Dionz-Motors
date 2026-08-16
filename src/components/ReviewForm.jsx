import { useState } from 'react'
import { submitReview } from '../lib/supabase'
import { IconStar } from './Icons'

export default function ReviewForm() {
  const [form, setForm] = useState({ name: '', car_bought: '', body: '', rating: 5 })
  const [hover, setHover] = useState(0)
  const [state, setState] = useState('idle') // idle | sending | done | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitReview(form)
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
        <h3 className="mt-3 font-display text-lg font-bold">Asante — review received!</h3>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          It will appear on the site once our team approves it (usually within a day).
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">Bought from us? Leave a review</h3>
      <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Honest feedback helps other buyers — good or bad, we publish it after a quick moderation check.</p>

      <div className="mt-4">
        <span className="label">Your rating *</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={form.rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onClick={() => setForm({ ...form, rating: n })}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className={`transition hover:scale-110 ${n <= (hover || form.rating) ? 'text-brand-400' : 'text-ink-200 dark:text-ink-700'}`}
            >
              <IconStar className="h-8 w-8" filled />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="rv-name">Your name *</label>
          <input id="rv-name" required className="input" placeholder="Jane W." value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className="label" htmlFor="rv-car">Car you bought</label>
          <input id="rv-car" className="input" placeholder="e.g. Toyota Harrier 2020" value={form.car_bought} onChange={set('car_bought')} />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="rv-body">Your experience *</label>
          <textarea id="rv-body" required rows={4} minLength={20} className="input resize-none" placeholder="How was the buying process, the car, the after-sale service…? (at least 20 characters)" value={form.body} onChange={set('body')} />
        </div>
      </div>

      {state === 'error' && <p className="mt-3 text-sm text-red-500">Something went wrong — please try again.</p>}
      <button disabled={state === 'sending'} className="btn-primary mt-4 w-full disabled:opacity-60">
        {state === 'sending' ? 'Submitting…' : 'Submit review'}
      </button>
    </form>
  )
}
