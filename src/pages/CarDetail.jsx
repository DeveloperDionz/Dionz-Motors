import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FinanceCalculator from '../components/FinanceCalculator'
import InquiryForm from '../components/InquiryForm'
import Reveal from '../components/Reveal'
import { IconCalendar, IconCheck, IconFuel, IconGauge, IconGear, IconPin, IconShield } from '../components/Icons'
import { fetchCarBySlug } from '../lib/supabase'
import { fmtKES, fmtNum, waLink } from '../lib/format'

export default function CarDetail() {
  const { slug } = useParams()
  const [car, setCar] = useState(undefined)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    setCar(undefined)
    setImgIdx(0)
    fetchCarBySlug(slug).then(setCar).catch(() => setCar(null))
  }, [slug])

  if (car === undefined) {
    return <div className="container-x pt-32 pb-20"><div className="card h-96 animate-pulse-soft" /></div>
  }
  if (car === null) {
    return (
      <div className="container-x pt-32 pb-20 text-center">
        <h1 className="font-display text-2xl font-bold">Vehicle not found</h1>
        <Link to="/inventory" className="btn-primary mt-6">Back to inventory</Link>
      </div>
    )
  }

  const label = `${car.year} ${car.make} ${car.model}`
  const specs = [
    { icon: IconCalendar, label: 'Year', value: car.year },
    { icon: IconGauge, label: 'Mileage', value: `${fmtNum(car.mileage)} km` },
    { icon: IconFuel, label: 'Fuel', value: car.fuel_type },
    { icon: IconGear, label: 'Transmission', value: car.transmission },
    { icon: IconShield, label: 'Condition', value: car.condition },
    { icon: IconPin, label: 'Location', value: car.location },
  ]

  return (
    <div className="pt-24 md:pt-28">
      <div className="container-x pb-16">
        {/* breadcrumb */}
        <nav className="text-xs text-ink-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-500">Home</Link> <span className="mx-1.5">/</span>
          <Link to="/inventory" className="hover:text-brand-500">Inventory</Link> <span className="mx-1.5">/</span>
          <span className="text-ink-600 dark:text-ink-300">{label}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-5">
          {/* GALLERY + DETAILS */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800">
                <img src={car.images?.[imgIdx]} alt={`${label} — photo ${imgIdx + 1}`} className="aspect-[16/10] w-full object-cover" />
              </div>
              {car.images?.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                  {car.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${i === imgIdx ? 'border-brand-400' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img src={src} alt="" className="h-16 w-24 object-cover sm:h-20 sm:w-32" />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>

            <Reveal delay={100}>
              <div className="card mt-6 p-5 sm:p-6">
                <h2 className="font-display text-lg font-bold">Overview</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{car.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {specs.map((s) => (
                    <div key={s.label} className="rounded-xl bg-ink-50 p-3.5 dark:bg-ink-800/60">
                      <s.icon className="h-5 w-5 text-brand-500" />
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">{s.label}</p>
                      <p className="text-sm font-bold">{s.value}</p>
                    </div>
                  ))}
                </div>
                {car.engine && (
                  <p className="mt-4 text-sm text-ink-500 dark:text-ink-400">
                    <span className="font-semibold text-ink-700 dark:text-ink-200">Engine:</span> {car.engine}
                    {car.drive && <> · <span className="font-semibold text-ink-700 dark:text-ink-200">Drive:</span> {car.drive}</>}
                    {car.color && <> · <span className="font-semibold text-ink-700 dark:text-ink-200">Colour:</span> {car.color}</>}
                  </p>
                )}
              </div>
            </Reveal>

            {car.features?.length > 0 && (
              <Reveal delay={150}>
                <div className="card mt-6 p-5 sm:p-6">
                  <h2 className="font-display text-lg font-bold">Features & Extras</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {car.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
                        <IconCheck className="h-4 w-4 shrink-0 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6 lg:col-span-2">
            <Reveal>
              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {car.status === 'reserved' && <span className="badge !bg-amber-100 !text-amber-700 dark:!bg-amber-900/40 dark:!text-amber-300">Reserved — join waitlist</span>}
                  {car.status === 'available' && <span className="badge !bg-green-100 !text-green-700 dark:!bg-green-900/40 dark:!text-green-300">Available now</span>}
                  <span className="badge">{fmtNum(car.views || 0)} views</span>
                </div>
                <h1 className="mt-3 font-display text-2xl font-bold leading-tight">{label}</h1>
                <p className="mt-2 font-display text-3xl font-bold text-brand-600 dark:text-brand-400">{fmtKES(car.price)}</p>
                <p className="mt-1 text-xs text-ink-400">Negotiable · Trade-ins welcome · Financing available</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <a href={waLink(`Hi Dionz Motors! I'm interested in the ${label} (${fmtKES(car.price)}). Is it available?`)} target="_blank" rel="noreferrer" className="btn-primary">WhatsApp us</a>
                  <a href="tel:+254712000900" className="btn-ghost">Call now</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}><FinanceCalculator price={car.price} carLabel={label} /></Reveal>
            <Reveal delay={150}><InquiryForm carId={car.id} carLabel={label} title="Ask about this car" /></Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
