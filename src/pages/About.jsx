import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconCar, IconCheck, IconShield, IconUsers } from '../components/Icons'

const VALUES = [
  { icon: IconShield, title: 'Radical transparency', desc: 'Auction sheets, inspection reports and logbook history shared before you pay a shilling.' },
  { icon: IconCheck, title: 'Inspected, not just imported', desc: 'A 150-point mechanical and body check on every unit, by our in-house workshop.' },
  { icon: IconUsers, title: 'Relationships over transactions', desc: 'Over 40% of our sales come from repeat buyers and referrals — that is the metric we optimise.' },
  { icon: IconCar, title: 'After-sale, not afterthought', desc: '6-month engine & gearbox warranty and priority servicing at partner garages.' },
]

const STATS = [['2016', 'Founded in Nairobi'], ['2,400+', 'Vehicles delivered'], ['4.8★', 'Average rating'], ['47', 'Counties delivered to']]

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="container-x pb-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Our story</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">The showroom Kenya deserves</h1>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              <p>
                Dionz Motors started in 2016 with one Probox, one phone, and one conviction: buying a car in Kenya shouldn't feel like gambling.
                Too many buyers were getting clocked odometers, doctored logbooks, and "duty paid" units that weren't.
              </p>
              <p>
                So we built the dealership we ourselves would want to buy from. Every unit we list comes with its Japanese auction sheet or a
                full local inspection report. Every logbook is NTSA-verified before listing. Every price is published — no "come to the yard
                and we'll talk" games.
              </p>
              <p>
                Today, from our yard on Magadi Road in Ongata Rongai, we deliver inspected vehicles to all 47 counties, arrange bank financing
                in as little as 48 hours, and back every foreign-used unit with a 6-month engine and gearbox warranty.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl">
              <img src="/images/hero.jpg" alt="The Dionz Motors showroom" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(([v, l], i) => (
            <Reveal key={l} delay={i * 70}>
              <div className="card p-5 text-center">
                <p className="font-display text-2xl font-bold text-brand-500">{v}</p>
                <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-16 font-display text-2xl font-bold">What we stand for</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="card flex gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <v.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{v.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-3xl bg-ink-950 px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-white">Come kick the tyres — literally.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-ink-300">Visit the yard on Magadi Road, Ongata Rongai, or browse the full inventory online first.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/inventory" className="btn-primary">Browse inventory</Link>
              <Link to="/contact" className="btn-ghost !border-white/25 !bg-white/10 !text-white">Get directions</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
