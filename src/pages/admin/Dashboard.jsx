import { useEffect, useMemo, useState } from 'react'
import { fetchAllCarsAdmin, fetchLeads } from '../../lib/supabase'
import { fmtKES, fmtNum } from '../../lib/format'

export default function Dashboard() {
  const [cars, setCars] = useState([])
  const [leads, setLeads] = useState([])

  useEffect(() => {
    fetchAllCarsAdmin().then(setCars).catch(() => {})
    fetchLeads().then(setLeads).catch(() => {})
  }, [])

  const stats = useMemo(() => {
    const available = cars.filter((c) => c.status === 'available')
    const stockValue = available.reduce((s, c) => s + Number(c.price), 0)
    const totalViews = cars.reduce((s, c) => s + (c.views || 0), 0)
    const newLeads = leads.filter((l) => l.status === 'new').length
    return { available: available.length, stockValue, totalViews, newLeads, totalLeads: leads.length }
  }, [cars, leads])

  const byViews = useMemo(() => [...cars].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 6), [cars])
  const maxViews = byViews[0]?.views || 1

  const leadsByType = useMemo(() => {
    const map = {}
    leads.forEach((l) => { map[l.type] = (map[l.type] || 0) + 1 })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [leads])
  const maxType = leadsByType[0]?.[1] || 1

  const CARDS = [
    ['Available units', stats.available, 'in showroom'],
    ['Stock value', fmtKES(stats.stockValue), 'available inventory'],
    ['New leads', stats.newLeads, `${stats.totalLeads} total`],
    ['Listing views', fmtNum(stats.totalViews), 'all time'],
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Live snapshot of inventory, demand and pipeline.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map(([label, value, sub]) => (
          <div key={label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{value}</p>
            <p className="mt-1 text-xs text-ink-400">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold">Most viewed listings</h2>
          <div className="mt-4 space-y-3">
            {byViews.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="truncate font-medium">{c.make} {c.model} {c.year}</span>
                  <span className="ml-3 shrink-0 text-xs text-ink-400">{fmtNum(c.views || 0)} views</span>
                </div>
                <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800">
                  <div className="h-2 rounded-full bg-brand-400 transition-all duration-700" style={{ width: `${((c.views || 0) / maxViews) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 sm:p-6">
          <h2 className="font-display text-base font-bold">Leads by intent</h2>
          <div className="mt-4 space-y-3">
            {leadsByType.map(([type, count]) => (
              <div key={type}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                  <span className="text-xs text-ink-400">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800">
                  <div className="h-2 rounded-full bg-ink-900 transition-all duration-700 dark:bg-ink-200" style={{ width: `${(count / maxType) * 100}%` }} />
                </div>
              </div>
            ))}
            {leadsByType.length === 0 && <p className="text-sm text-ink-400">No leads yet.</p>}
          </div>

          <h2 className="mt-8 font-display text-base font-bold">Latest leads</h2>
          <ul className="mt-3 divide-y divide-ink-100 text-sm dark:divide-ink-800">
            {leads.slice(0, 4).map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-medium">{l.name} <span className="font-normal text-ink-400">· {l.car_label || '—'}</span></p>
                  <p className="truncate text-xs text-ink-400">{l.message}</p>
                </div>
                <span className={`badge shrink-0 ${l.status === 'new' ? '!bg-brand-100 !text-brand-700 dark:!bg-brand-400/15 dark:!text-brand-300' : ''}`}>{l.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
