import { createClient } from '@supabase/supabase-js'
import { demoCars, demoReviews, demoPosts, demoLeads } from '../data/demo'
import { storage, session } from './safeStorage'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isLive = Boolean(url && anonKey && !url.includes('YOUR_PROJECT'))

// Custom auth storage: sandboxed iframes (like embedded previews) throw
// SecurityError on localStorage access, which would crash the whole app
// at module load. safeStorage falls back to in-memory storage instead.
const authStorage = {
  getItem: (key) => storage.get(key),
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.remove(key),
}

export const supabase = isLive
  ? createClient(url, anonKey, {
      auth: {
        storage: authStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null

// ---------------- Data API ----------------
// Every function works against Supabase when configured,
// and against the in-memory demo dataset otherwise.

const localLeads = [...demoLeads]

// If Supabase is connected but the schema hasn't been migrated yet
// (table missing => PGRST205), fall back to demo data so the public
// site never renders empty. A console warning flags the missing migration.
function schemaMissing(error) {
  const missing = error?.code === 'PGRST205' || /schema cache/i.test(error?.message || '')
  if (missing) console.warn('[Dionz] Supabase connected but schema not migrated yet — run supabase/schema.sql + seed.sql. Falling back to demo data.')
  return missing
}

export async function fetchCars(filters = {}) {
  if (isLive) {
    let q = supabase.from('cars').select('*').neq('status', 'draft').order('created_at', { ascending: false })
    if (filters.make) q = q.eq('make', filters.make)
    if (filters.fuel) q = q.eq('fuel_type', filters.fuel)
    if (filters.yearMin) q = q.gte('year', filters.yearMin)
    if (filters.priceMax) q = q.lte('price', filters.priceMax)
    if (filters.mileageMax) q = q.lte('mileage', filters.mileageMax)
    if (filters.search) q = q.or(`make.ilike.%${filters.search}%,model.ilike.%${filters.search}%`)
    const { data, error } = await q
    if (error) {
      if (schemaMissing(error)) return filterDemoCars(filters)
      throw error
    }
    return data
  }
  return filterDemoCars(filters)
}

function filterDemoCars(filters = {}) {
  let cars = [...demoCars]
  // eslint-disable-next-line no-unused-vars
  const f = filters
  if (f.search) {
    const s = f.search.toLowerCase()
    cars = cars.filter(c => `${c.make} ${c.model}`.toLowerCase().includes(s))
  }
  if (f.make) cars = cars.filter(c => c.make === f.make)
  if (f.fuel) cars = cars.filter(c => c.fuel_type === f.fuel)
  if (f.yearMin) cars = cars.filter(c => c.year >= Number(f.yearMin))
  if (f.priceMax) cars = cars.filter(c => c.price <= Number(f.priceMax))
  if (f.mileageMax) cars = cars.filter(c => c.mileage <= Number(f.mileageMax))
  return cars.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export async function fetchCarBySlug(slug) {
  if (isLive) {
    const { data, error } = await supabase.from('cars').select('*').eq('slug', slug).single()
    if (error) {
      if (schemaMissing(error)) return demoCars.find(c => c.slug === slug) || null
      throw error
    }
    supabase.rpc('increment_car_views', { car_id: data.id }).then(() => {})
    return data
  }
  return demoCars.find(c => c.slug === slug) || null
}

export async function fetchReviews() {
  if (isLive) {
    const { data, error } = await supabase.from('reviews').select('*').eq('approved', true).order('created_at', { ascending: false })
    if (error) {
      if (schemaMissing(error)) return demoReviews
      throw error
    }
    return data
  }
  return demoReviews
}

export async function fetchPosts() {
  if (isLive) {
    const { data, error } = await supabase.from('posts').select('*').eq('published', true).order('created_at', { ascending: false })
    if (error) {
      if (schemaMissing(error)) return demoPosts
      throw error
    }
    return data
  }
  return demoPosts
}

export async function fetchPostBySlug(slug) {
  if (isLive) {
    const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single()
    if (error) {
      if (schemaMissing(error)) return demoPosts.find(p => p.slug === slug) || null
      throw error
    }
    return data
  }
  return demoPosts.find(p => p.slug === slug) || null
}

export async function submitLead(lead) {
  if (isLive) {
    const { error } = await supabase.from('leads').insert(lead)
    if (error) throw error
    return true
  }
  localLeads.unshift({ ...lead, id: `l${Date.now()}`, status: 'new', created_at: new Date().toISOString() })
  return true
}

export async function submitReview(review) {
  if (isLive) {
    const { error } = await supabase.from('reviews').insert({ ...review, approved: false })
    if (error) throw error
    return true
  }
  return true
}

// ---------------- Admin API ----------------

export async function fetchLeads() {
  if (isLive) {
    const { data, error } = await supabase.from('leads').select('*, cars(make, model, year)').order('created_at', { ascending: false })
    if (error) {
      if (schemaMissing(error)) return localLeads
      throw error
    }
    return data.map(l => ({ ...l, car_label: l.cars ? `${l.cars.make} ${l.cars.model} ${l.cars.year}` : '—' }))
  }
  return localLeads
}

export async function updateLeadStatus(id, status) {
  if (isLive) {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (error) throw error
    return true
  }
  const l = localLeads.find(x => x.id === id)
  if (l) l.status = status
  return true
}

export async function fetchAllCarsAdmin() {
  if (isLive) {
    const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false })
    if (error) {
      if (schemaMissing(error)) return demoCars
      throw error
    }
    return data
  }
  return demoCars
}

export async function upsertCar(car) {
  if (!isLive) throw new Error('Connect Supabase to save inventory changes.')
  const { error } = await supabase.from('cars').upsert(car)
  if (error) throw error
  return true
}

export async function deleteCar(id) {
  if (!isLive) throw new Error('Connect Supabase to delete inventory.')
  const { error } = await supabase.from('cars').delete().eq('id', id)
  if (error) throw error
  return true
}

export async function uploadCarImage(file) {
  if (!isLive) throw new Error('Connect Supabase to upload images.')
  const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const { error } = await supabase.storage.from('car-images').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('car-images').getPublicUrl(path)
  return data.publicUrl
}

// ---------------- Blog admin ----------------

export async function upsertPost(post) {
  if (!isLive) throw new Error('Connect Supabase to save posts.')
  const { error } = await supabase.from('posts').upsert(post)
  if (error) throw error
  return true
}

export async function deletePost(id) {
  if (!isLive) throw new Error('Connect Supabase to delete posts.')
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
  return true
}

export async function deleteReview(id) {
  if (!isLive) throw new Error('Connect Supabase to delete reviews.')
  const { error } = await supabase.from('reviews').delete().eq('id', id)
  if (error) throw error
  return true
}

// ---------------- Auth ----------------

export async function signIn(email, password) {
  if (!isLive) {
    // Demo auth: accept the demo credentials only.
    if (email === 'admin@dionzmotors.co.ke' && password === 'demo1234') {
      const user = { id: 'demo-admin', email, role: 'admin', demo: true }
      session.set('demo_user', JSON.stringify(user))
      return user
    }
    throw new Error('Demo mode — use admin@dionzmotors.co.ke / demo1234')
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

export async function signOut() {
  if (!isLive) { session.remove('demo_user'); return }
  await supabase.auth.signOut()
}

export async function getSessionUser() {
  if (!isLive) {
    const raw = session.get('demo_user')
    return raw ? JSON.parse(raw) : null
  }
  const { data } = await supabase.auth.getUser()
  return data.user || null
}

export async function getUserRole(user) {
  if (!user) return null
  if (!isLive) return user.role || 'admin'
  const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return data?.role || 'customer'
}
