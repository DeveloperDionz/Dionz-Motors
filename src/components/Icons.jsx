// Lightweight inline SVG icon set (stroke inherits currentColor)
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const Svg = ({ children, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">{children}</svg>
)

export const IconGauge = (p) => <Svg {...p}><path d="M12 15l3.5-5.5" /><path d="M3.5 17a10 10 0 1 1 17 0" /><circle cx="12" cy="15" r="1.5" /></Svg>
export const IconFuel = (p) => <Svg {...p}><path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" /><path d="M2.5 21h13" /><path d="M14 10h2.5a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-3" /><path d="M6.5 8h5" /></Svg>
export const IconGear = (p) => <Svg {...p}><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><path d="M6 8.2v7.6" /><path d="M18 8.2v3.3a2.5 2.5 0 0 1-2.5 2.5H8.2" /></Svg>
export const IconCalendar = (p) => <Svg {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 10h17" /><path d="M8 2.8V6.5M16 2.8V6.5" /></Svg>
export const IconPin = (p) => <Svg {...p}><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></Svg>
export const IconShield = (p) => <Svg {...p}><path d="M12 3l8 3.2v5.3c0 4.9-3.4 8.2-8 9.5-4.6-1.3-8-4.6-8-9.5V6.2L12 3z" /><path d="M8.8 12l2.3 2.3 4.1-4.4" /></Svg>
export const IconStar = ({ className = 'h-4 w-4', filled = true }) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 3.3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17.2 6.6 20.1l1.1-6.1-4.5-4.3 6.1-.8L12 3.3z" strokeLinejoin="round" />
  </svg>
)
export const IconSun = (p) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" /></Svg>
export const IconMoon = (p) => <Svg {...p}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" /></Svg>
export const IconMenu = (p) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
export const IconX = (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>
export const IconSearch = (p) => <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></Svg>
export const IconPhone = (p) => <Svg {...p}><path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>
export const IconMail = (p) => <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></Svg>
export const IconChevron = (p) => <Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>
export const IconCheck = (p) => <Svg {...p}><path d="M4.5 12.5l5 5 10-11" /></Svg>
export const IconCar = (p) => <Svg {...p}><path d="M4 16v-3l2-5.5A2 2 0 0 1 7.9 6h8.2a2 2 0 0 1 1.9 1.5L20 13v3" /><path d="M4 13h16" /><circle cx="7.5" cy="16.5" r="1.8" /><circle cx="16.5" cy="16.5" r="1.8" /><path d="M3 19h18" /></Svg>
export const IconUsers = (p) => <Svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8S13.9 16 14.5 19" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.6c2.4.2 4 1.8 4.5 4.4" /></Svg>
export const IconChart = (p) => <Svg {...p}><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-5M12 16V8M16 16v-3M20 16V6" /></Svg>
export const IconDoc = (p) => <Svg {...p}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M10 12h6M10 16h6" /></Svg>
export const IconWhatsApp = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.5-1.4-.7-1.9-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2z" />
  </svg>
)
