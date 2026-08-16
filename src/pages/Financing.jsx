import FinanceCalculator from '../components/FinanceCalculator'
import InquiryForm from '../components/InquiryForm'
import Reveal from '../components/Reveal'
import { IconCheck } from '../components/Icons'

const STEPS = [
  ['Pick your car', 'Choose from our inventory or ask us to source a specific unit.'],
  ['Pre-qualify in 48hrs', 'Share your payslips or business statements — we work with 3 bank partners to get you the best rate.'],
  ['Pay your deposit', 'Typically 20–30% of the car value. Trade-ins can count toward your deposit.'],
  ['Drive away', 'Insurance, tracking and NTSA transfer bundled — one monthly payment, zero surprises.'],
]

const FAQS = [
  ['What deposit do I need?', 'Most banks require 20–30%. Sacco routes can go as low as 0% against your savings and guarantors.'],
  ['What documents are required?', 'National ID, KRA PIN, 6 months of bank statements, and payslips (employed) or business registration + statements (self-employed).'],
  ['Can I finance a car older than 8 years?', 'Most banks cap at 8 years at purchase. For older units we can arrange logbook-secured alternatives — ask us.'],
  ['Is early repayment allowed?', 'Yes. All our partner facilities are reducing-balance with early-settlement options; some waive penalties entirely.'],
  ['Do you handle insurance?', 'Yes — comprehensive cover (typically 4–5% of car value annually) can be financed into your monthly payment.'],
]

export default function Financing() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="container-x pb-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Own it sooner</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Car Financing, Simplified</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            Six in ten Dionz customers finance their purchase. We pre-qualify you with our bank partners in as little as 48 hours — with transparent, reducing-balance terms.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Reveal>
              <ol className="space-y-4">
                {STEPS.map(([title, desc], i) => (
                  <li key={title} className="card flex gap-4 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-400 font-display text-base font-bold text-ink-950">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-sm font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={100}>
              <div className="card p-5 sm:p-6">
                <h2 className="font-display text-lg font-bold">Frequently asked</h2>
                <div className="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
                  {FAQS.map(([q, a]) => (
                    <details key={q} className="group py-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
                        {q}
                        <span className="text-brand-500 transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={80}><FinanceCalculator /></Reveal>
            <Reveal delay={140}><InquiryForm defaultType="financing" title="Request a financing callback" /></Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
