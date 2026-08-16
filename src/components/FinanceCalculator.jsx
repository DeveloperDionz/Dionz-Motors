import { useMemo, useState } from 'react'
import { fmtKES } from '../lib/format'
import { waLink } from '../lib/format'

export default function FinanceCalculator({ price = 3000000, carLabel = '' }) {
  const [amount, setAmount] = useState(price)
  const [depositPct, setDepositPct] = useState(30)
  const [rate, setRate] = useState(14.5)
  const [months, setMonths] = useState(48)

  const { deposit, principal, monthly, totalInterest, totalPayable } = useMemo(() => {
    const deposit = Math.round(amount * (depositPct / 100))
    const principal = amount - deposit
    const r = rate / 100 / 12
    const monthly = r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -months)) : principal / months
    const totalPayable = monthly * months
    return { deposit, principal, monthly, totalInterest: totalPayable - principal, totalPayable }
  }, [amount, depositPct, rate, months])

  const Slider = ({ label, value, min, max, step, onChange, display }) => (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="label !mb-0">{label}</span>
        <span className="text-sm font-bold text-ink-900 dark:text-white">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-brand-500 dark:bg-ink-800"
        aria-label={label}
      />
    </div>
  )

  return (
    <div className="card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">Financing Calculator</h3>
      <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">Reducing-balance estimate. Our bank partners finance up to 80% on units under 8 years.</p>

      <div className="mt-5 space-y-5">
        <Slider label="Car price" value={amount} min={500000} max={20000000} step={50000} onChange={setAmount} display={fmtKES(amount)} />
        <Slider label="Deposit" value={depositPct} min={10} max={70} step={5} onChange={setDepositPct} display={`${depositPct}% · ${fmtKES(deposit)}`} />
        <Slider label="Interest rate (p.a.)" value={rate} min={10} max={22} step={0.5} onChange={setRate} display={`${rate}%`} />
        <Slider label="Loan term" value={months} min={12} max={72} step={6} onChange={setMonths} display={`${months} months`} />
      </div>

      <div className="mt-6 rounded-2xl bg-ink-950 p-5 text-center dark:bg-ink-800/60">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">Estimated monthly payment</p>
        <p className="mt-1 font-display text-3xl font-bold text-brand-400">{fmtKES(monthly)}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-ink-400">
          <div><p className="font-semibold text-white">{fmtKES(principal)}</p><p>Financed</p></div>
          <div><p className="font-semibold text-white">{fmtKES(totalInterest)}</p><p>Interest</p></div>
          <div><p className="font-semibold text-white">{fmtKES(totalPayable)}</p><p>Total payable</p></div>
        </div>
      </div>

      <a
        href={waLink(`Hi Dionz Motors! I'd like a financing pre-qualification${carLabel ? ` for the ${carLabel}` : ''}. Budget ~${fmtKES(amount)}, deposit ${depositPct}%.`)}
        target="_blank" rel="noreferrer"
        className="btn-primary mt-4 w-full"
      >
        Get pre-qualified on WhatsApp
      </a>
    </div>
  )
}
