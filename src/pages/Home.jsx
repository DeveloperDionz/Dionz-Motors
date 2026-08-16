import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CarCard from '../components/CarCard'
import Reveal from '../components/Reveal'
import ReviewForm from '../components/ReviewForm'
import SearchFilters from '../components/SearchFilters'
import { IconCar, IconCheck, IconShield, IconStar, IconUsers } from '../components/Icons'
import { fetchCars, fetchReviews, fetchPosts } from '../lib/supabase'
import { fmtDate } from '../lib/format'

const TRUST = [
  { icon: IconShield, title: 'KRA Duty Cleared', desc: 'Every import fully cleared with verifiable entries' },
  { icon: IconCheck, title: '150-Point Inspection', desc: 'Engine, gearbox & chassis certified before listing' },
  { icon: IconCar, title: '6-Month Warranty', desc: 'Engine & gearbox cover on all foreign-used units' },
  { icon: IconUsers, title: '2,400+ Happy Owners', desc: 'Serving Kenya since 2016 with 4.8★ average rating' },
]

export default function Home() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({})
  const [featured, setFeatured] = useState([])
  const [reviews, setReviews] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchCars().then((cars) => setFeatured(cars.filter((c) => c.featured).slice(0, 4))).catch(() => {})
    fetchReviews().then(setReviews).catch(() => {})
    fetchPosts().then((p) => setPosts(p.slice(0, 3))).catch(() => {})
  }, [])

  const goSearch = () => {
    const params = new URLSearchParams(Object.entries(filters).filter(([, v]) => v))
    navigate(`/inventory?${params.toString()}`)
  }

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink-950">
        <img src="/images/hero.jpg" alt="Luxury SUV in the Dionz Motors showroom" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        <div className="container-x relative pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-white" /> Nairobi's Digital Showroom
            </p>
            <h1 className="mt-5 animate-fade-up font-display text-4xl font-bold leading-tight text-white [animation-delay:100ms] sm:text-5xl lg:text-6xl">
              Drive home <span className="text-brand-400">certainty</span>, not just a car.
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink-200 [animation-delay:200ms] sm:text-lg">
              Inspected, duty-cleared vehicles with transparent pricing, flexible bank financing and delivery anywhere in Kenya.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
              <Link to="/inventory" className="btn-primary !px-7 !py-3.5 text-base">Browse Cars</Link>
              <Link to="/contact" className="btn-ghost !border-white/25 !bg-white/10 !px-7 !py-3.5 text-base !text-white hover:!border-brand-400">Get a Quote</Link>
            </div>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-x-8 gap-y-3 text-sm text-ink-300 [animation-delay:400ms]">
              {[['2,400+', 'Cars sold'], ['4.8★', 'Customer rating'], ['48hr', 'Financing pre-approval']].map(([v, l]) => (
                <div key={l}><span className="font-display text-xl font-bold text-white">{v}</span> <span className="ml-1.5">{l}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="relative z-10 -mt-14">
        <div className="container-x">
          <Reveal>
            <div className="card p-5 shadow-2xl shadow-ink-900/10 sm:p-6">
              <h2 className="mb-4 font-display text-lg font-bold">Find your next car</h2>
              <SearchFilters filters={filters} setFilters={setFilters} onSubmit={goSearch} compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <div className="card h-full p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <t.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold">{t.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-500 dark:text-ink-400">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED INVENTORY */}
      <section className="bg-ink-50/60 py-16 dark:bg-ink-900/40 sm:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Handpicked for you</p>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Featured Inventory</h2>
              </div>
              <Link to="/inventory" className="btn-ghost !py-2.5">View all cars →</Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((car, i) => (
              <Reveal key={car.id} delay={i * 80}><CarCard car={car} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container-x py-16 sm:py-20">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Real buyers, real words</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">What Our Customers Say</h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.slice(0, 4).map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <figure className="card flex h-full flex-col p-5">
                <div className="flex gap-0.5 text-brand-400">
                  {Array.from({ length: 5 }, (_, s) => <IconStar key={s} filled={s < r.rating} />)}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">"{r.body}"</blockquote>
                <figcaption className="mt-4 border-t border-ink-100 pt-3 dark:border-ink-800">
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-xs text-ink-400">Bought: {r.car_bought}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-2xl">
            <ReviewForm />
          </div>
        </Reveal>
      </section>

      {/* CTA STRIP */}
      <section className="container-x pb-16 sm:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full  blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-3xl" />
            <h2 className="relative font-display text-2xl font-bold text-white sm:text-3xl">Trade in. Upgrade. Drive out.</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-ink-300 sm:text-base">
              Get a fair valuation for your current car and roll it straight into your next one — often within the same week.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">Value my trade-in</Link>
              <Link to="/financing" className="btn-ghost !border-white/25 !bg-white/10 !text-white">Explore financing</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* BLOG TEASER */}
      <section className="bg-ink-50/60 py-16 dark:bg-ink-900/40 sm:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Guides & insights</p>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">From the Dionz Blog</h2>
              </div>
              <Link to="/blog" className="btn-ghost !py-2.5">All articles →</Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <Link to={`/blog/${p.slug}`} className="card group block overflow-hidden hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-[16/9] overflow-hidden bg-ink-100 dark:bg-ink-800">
                    <img src={p.cover_url} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-ink-400">{fmtDate(p.created_at)} · {p.tags?.join(' · ')}</p>
                    <h3 className="mt-2 font-display text-base font-bold leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
