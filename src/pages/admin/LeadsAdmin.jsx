import { useEffect, useState } from 'react'
import { fetchLeads, updateLeadStatus } from '../../lib/supabase'
import { fmtDate, waLink } from '../../lib/format'

const STATUSES = ['new', 'contacted', 'qualified', 'closed_won', 'closed_lost']
const STATUS_STYLES = {
  new: '!bg-brand-100 !text-brand-700 dark:!bg-brand-400/15 dark:!text-brand-300',
  contacted: '!bg-blue-100 !text-blue-700 dark:!bg-blue-900/40 dark:!text-blue-300',
  qualified: '!bg-purple-100 !text-purple-700 dark:!bg-purple-900/40 dark:!text-purple-300',
  closed_won: '!bg-green-100 !text-green-700 dark:!bg-green-900/40 dark:!text-green-300',
  closed_lost: '!bg-red-100 !text-red-700 dark:!bg-red-900/40 dark:!text-red-300',
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState([])
  const [filter, setFilter] = useState('all')

  const load = () => fetchLeads().then(setLeads).catch(() => {})
  useEffect(() => { load() }, [])

  const setStatus = async (id, status) => {
    await updateLeadStatus(id, status)
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  const shown = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Leads</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Every inquiry, quote request and test-drive booking lands here.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', ...STATUSES].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${filter === s ? 'bg-ink-900 text-white dark:bg-brand-400 dark:text-ink-950' : 'bg-white text-ink-500 hover:text-ink-800 dark:bg-ink-900 dark:text-ink-400'}`}>
            {s.replace('_', ' ')} {s !== 'all' && `(${leads.filter((l) => l.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((l) => (
          <div key={l.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-display text-sm font-bold">{l.name}</p>
                <p className="text-xs text-ink-400">{fmtDate(l.created_at)} · <span className="capitalize">{l.type?.replace('_', ' ')}</span> · {l.car_label || '—'}</p>
              </div>
              <span className={`badge capitalize ${STATUS_STYLES[l.status] || ''}`}>{l.status?.replace('_', ' ')}</span>
            </div>
            {l.message && <p className="mt-3 rounded-xl bg-ink-50 p-3 text-sm text-ink-600 dark:bg-ink-800/60 dark:text-ink-300">"{l.message}"</p>}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a href={`tel:${l.phone}`} className="btn-ghost !px-3.5 !py-1.5 text-xs">📞 {l.phone}</a>
              {l.email && <a href={`mailto:${l.email}`} className="btn-ghost !px-3.5 !py-1.5 text-xs">✉ Email</a>}
              <a href={waLink(`Hi ${l.name}, this is Dionz Motors following up on your inquiry.`)} target="_blank" rel="noreferrer" className="btn-ghost !px-3.5 !py-1.5 text-xs">WhatsApp</a>
              <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className="input ml-auto !w-auto !py-1.5 text-xs" aria-label="Lead status">
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
            </div>
          </div>
        ))}
        {shown.length === 0 && <p className="text-sm text-ink-400">No leads in this bucket.</p>}
      </div>
    </div>
  )
}
