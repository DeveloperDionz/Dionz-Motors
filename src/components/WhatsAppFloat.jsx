import { useState } from 'react'
import { waLink } from '../lib/format'
import { IconWhatsApp, IconX } from './Icons'

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="card w-72 animate-fade-up p-4 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-sm font-bold">Chat with Dionz Motors</p>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Typically replies within minutes, 8am-8pm EAT.</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-ink-400 hover:text-ink-600 dark:hover:text-ink-200"><IconX className="h-4 w-4" /></button>
          </div>
          <div className="mt-3 space-y-2">
            {[
              'Hi Dionz Motors! I want to inquire about a car.',
              'Hi! What financing options do you offer?',
              'Hi! Do you accept trade-ins?',
            ].map((msg) => (
              <a
                key={msg}
                href={waLink(msg)}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-ink-100 px-3 py-2 text-xs text-ink-600 transition hover:border-green-400 hover:bg-green-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-green-950/40"
              >
                {msg}
              </a>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open WhatsApp chat"
        className="grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition hover:scale-105 hover:bg-green-400 active:scale-95"
      >
        <IconWhatsApp className="h-7 w-7" />
      </button>
    </div>
  )
}
