export const fmtKES = (n) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n)

export const fmtNum = (n) => new Intl.NumberFormat('en-KE').format(n)

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

export const WHATSAPP = '254759261763'
export const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
