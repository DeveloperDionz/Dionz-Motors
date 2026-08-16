import { IconSearch } from './Icons'

export const MAKES = ['Toyota', 'Mazda', 'Subaru', 'Mercedes-Benz', 'BMW', 'Nissan', 'Honda', 'Volkswagen']
export const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
export const PRICE_STEPS = [1500000, 2500000, 3500000, 5000000, 7500000, 10000000, 15000000]
export const MILEAGE_STEPS = [30000, 50000, 80000, 120000]

export default function SearchFilters({ filters, setFilters, onSubmit, compact = false }) {
  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value })
  const yearNow = new Date().getFullYear()

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.() }}
      className={compact
        ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'
        : 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7'}
    >
      <div className={compact ? 'col-span-2 sm:col-span-3 lg:col-span-2' : 'sm:col-span-2 lg:col-span-2'}>
        <label className="label" htmlFor="f-search">Search</label>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input id="f-search" className="input pl-9" placeholder="e.g. Harrier, CX-5…" value={filters.search || ''} onChange={set('search')} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="f-make">Make</label>
        <select id="f-make" className="input" value={filters.make || ''} onChange={set('make')}>
          <option value="">Any make</option>
          {MAKES.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="f-year">Year from</label>
        <select id="f-year" className="input" value={filters.yearMin || ''} onChange={set('yearMin')}>
          <option value="">Any year</option>
          {Array.from({ length: 12 }, (_, i) => yearNow - i).map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="f-price">Max price</label>
        <select id="f-price" className="input" value={filters.priceMax || ''} onChange={set('priceMax')}>
          <option value="">Any price</option>
          {PRICE_STEPS.map((p) => <option key={p} value={p}>Under KES {(p / 1000000).toFixed(1).replace('.0', '')}M</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="f-mileage">Max mileage</label>
        <select id="f-mileage" className="input" value={filters.mileageMax || ''} onChange={set('mileageMax')}>
          <option value="">Any mileage</option>
          {MILEAGE_STEPS.map((m) => <option key={m} value={m}>Under {m / 1000}k km</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="f-fuel">Fuel</label>
        <select id="f-fuel" className="input" value={filters.fuel || ''} onChange={set('fuel')}>
          <option value="">Any fuel</option>
          {FUELS.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>
      <div className="flex items-end">
        <button type="submit" className="btn-primary w-full">Search</button>
      </div>
    </form>
  )
}
