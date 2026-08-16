// Storage access can throw SecurityError inside sandboxed iframes
// (e.g. embedded previews). These wrappers never throw — they fall back
// to an in-memory store so the app always renders.

const mem = {}

function tryStorage(kind) {
  try {
    const s = window[kind]
    const k = '__dionz_test__'
    s.setItem(k, '1')
    s.removeItem(k)
    return s
  } catch {
    return null
  }
}

const ls = typeof window !== 'undefined' ? tryStorage('localStorage') : null
const ss = typeof window !== 'undefined' ? tryStorage('sessionStorage') : null

export const storage = {
  get(key) {
    try { return ls ? ls.getItem(key) : (mem[`l:${key}`] ?? null) } catch { return null }
  },
  set(key, value) {
    try { ls ? ls.setItem(key, value) : (mem[`l:${key}`] = value) } catch { mem[`l:${key}`] = value }
  },
  remove(key) {
    try { ls ? ls.removeItem(key) : delete mem[`l:${key}`] } catch { delete mem[`l:${key}`] }
  },
}

export const session = {
  get(key) {
    try { return ss ? ss.getItem(key) : (mem[`s:${key}`] ?? null) } catch { return null }
  },
  set(key, value) {
    try { ss ? ss.setItem(key, value) : (mem[`s:${key}`] = value) } catch { mem[`s:${key}`] = value }
  },
  remove(key) {
    try { ss ? ss.removeItem(key) : delete mem[`s:${key}`] } catch { delete mem[`s:${key}`] }
  },
}

export function prefersDark() {
  try { return window.matchMedia('(prefers-color-scheme: dark)').matches } catch { return false }
}
