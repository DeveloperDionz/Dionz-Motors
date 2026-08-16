import InquiryForm from '../components/InquiryForm'
import Reveal from '../components/Reveal'
import { IconMail, IconPhone, IconPin, IconWhatsApp } from '../components/Icons'
import { waLink } from '../lib/format'

export default function Contact() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="container-x pb-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500">We reply fast</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Talk to Dionz Motors</h1>
          <p className="mt-3 max-w-xl text-sm text-ink-500 dark:text-ink-400">
            Quotes, test drives, trade-in valuations, sourcing requests — one message and we're on it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {[
              { icon: IconWhatsApp, title: 'WhatsApp', line1: '+254 712 000 900', line2: 'Fastest — replies in minutes', href: waLink('Hi Dionz Motors!'), cta: 'Chat now' },
              { icon: IconPhone, title: 'Phone', line1: '+254 712 000 900', line2: 'Mon–Sat, 8am–6pm', href: 'tel:+254712000900', cta: 'Call' },
              { icon: IconMail, title: 'Email', line1: 'sales@dionzmotors.co.ke', line2: 'Replies within a few hours', href: 'mailto:sales@dionzmotors.co.ke', cta: 'Email' },
              { icon: IconPin, title: 'Visit the yard', line1: 'Magadi Road, Ongata Rongai', line2: 'Kajiado County, Kenya', href: 'https://maps.google.com/?q=Ongata+Rongai+Magadi+Road', cta: 'Directions' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="card flex items-center gap-4 p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-bold">{c.title}</h3>
                    <p className="truncate text-sm text-ink-600 dark:text-ink-300">{c.line1}</p>
                    <p className="text-xs text-ink-400">{c.line2}</p>
                  </div>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="btn-ghost !px-4 !py-2 text-xs">{c.cta}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <InquiryForm title="Send us a message" defaultType="quote" />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
