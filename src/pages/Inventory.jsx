import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarCard from '../components/CarCard'
import SearchFilters from '../components/SearchFilters'
import Reveal from '../components/Reveal'
import { fetchCars } from '../lib/supabase'

const SORTS = {
  newest: { label: 'Newest listings', fn: (a, b) => new Date(b.created_at) - new Date(a.created_at) },
  price_asc: { label: 'Price: low → high', fn: (a, b) => a.price - b.price },
  price_desc: { label: 'Price: high → low', fn: (a, b) => b.price - a.price },
  mileage: { label: 'Lowest mileage', fn: (a, b) => a.mileage - b.mileage },
  year: { label: 'Newest year', fn: (a, b) => b.year - a.year },
}

export default function Inventory() {
  const [params, setParams] = useSearchParams()
  const initial = Object.fromEntries(params.entries())
  const [filters, setFilters] = useState(initial)
  const [applied, setApplied] = useState(initial)
  const [cars, setCars] = useState(null)
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    setCars(null)
    fetchCars(applied).then(setCars).catch(() => setCars([]))
  }, [applied])

  const apply = () => {
    setApplied({ ...filters })
    setParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v)), { replace: true })
  }

  const sorted = useMemo(() => (cars ? [...cars].sort(SORTS[sort].fn) : null), [cars, sort])

  return (
    <div className="pt-24 md:pt-28">
      <section className="container-x pb-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Digital showroom</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Our Inventory</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
            Every vehicle is inspected, duty-cleared and ready for a test drive. Can't find your spec? We'll import it for you.
          </p>
        </Reveal>

        <div className="card mt-8 p-5 sm:p-6">
          <SearchFilters filters={filters} setFilters={setFilters} onSubmit={apply} compact />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-500 dark:text-ink-400" aria-live="polite">
            {sorted ? `${sorted.length} vehicle${sorted.length === 1 ? '' : 's'} found` : 'Loading…'}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wide text-ink-400">Sort</label>
            <select id="sort" className="input !w-auto !py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        {sorted === null ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="card animate-pulse-soft overflow-hidden">
                <div className="aspect-[16/10] bg-ink-100 dark:bg-ink-800" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 rounded bg-ink-100 dark:bg-ink-800" />
                  <div className="h-4 w-1/2 rounded bg-ink-100 dark:bg-ink-800" />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="card mt-6 p-12 text-center">
            <h2 className="font-display text-lg font-bold">No cars match those filters</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">Try widening your search — or tell us the exact spec and we'll source it within 8–10 weeks.</p>
            <button className="btn-primary mt-5" onClick={() => { setFilters({}); setApplied({}); setParams({}) }}>Clear all filters</button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((car, i) => (
              <Reveal key={car.id} delay={Math.min(i, 7) * 60}><CarCard car={car} /></Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
