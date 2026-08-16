import { Link } from 'react-router-dom'
import { fmtKES, fmtNum } from '../lib/format'
import { IconCalendar, IconFuel, IconGauge, IconGear } from './Icons'

export default function CarCard({ car }) {
  return (
    <Link
      to={`/cars/${car.slug}`}
      className="card group block overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/10 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100 dark:bg-ink-800">
        <img
          src={car.images?.[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {car.featured && <span className="rounded-full bg-brand-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">Featured</span>}
          {car.status === 'reserved' && <span className="rounded-full bg-ink-900/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">Reserved</span>}
          {car.status === 'sold' && <span className="rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Sold</span>}
        </div>
        <span className="absolute bottom-3 right-3 rounded-lg bg-ink-950/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">{car.condition}</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug text-ink-900 dark:text-white">
            {car.make} {car.model}
          </h3>
        </div>
        <p className="mt-1.5 font-display text-lg font-bold text-brand-600 dark:text-brand-400">{fmtKES(car.price)}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink-100 pt-3 text-xs text-ink-500 dark:border-ink-800 dark:text-ink-400">
          <span className="flex items-center gap-1.5"><IconCalendar className="h-3.5 w-3.5" />{car.year}</span>
          <span className="flex items-center gap-1.5"><IconGauge className="h-3.5 w-3.5" />{fmtNum(car.mileage)} km</span>
          <span className="flex items-center gap-1.5"><IconFuel className="h-3.5 w-3.5" />{car.fuel_type}</span>
          <span className="flex items-center gap-1.5"><IconGear className="h-3.5 w-3.5" />{car.transmission}</span>
        </div>
      </div>
    </Link>
  )
}
