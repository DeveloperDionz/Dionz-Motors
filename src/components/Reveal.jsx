import { useEffect, useRef } from 'react'

/** Scroll-triggered fade/slide-up wrapper using IntersectionObserver. */
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
