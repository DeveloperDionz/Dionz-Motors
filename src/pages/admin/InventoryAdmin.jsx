import { useEffect, useState } from 'react'
import { deleteCar, fetchAllCarsAdmin, isLive, upsertCar, uploadCarImage } from '../../lib/supabase'
import { fmtKES, fmtNum } from '../../lib/format'
import { FUELS, MAKES } from '../../components/SearchFilters'

const EMPTY = {
  slug: '', make: 'Toyota', model: '', year: new Date().getFullYear() - 4, price: 2000000, mileage: 50000,
  fuel_type: 'Petrol', transmission: 'Automatic', body_type: 'SUV', engine: '', drive: '', color: '',
  location: 'Nairobi', condition: 'Foreign Used', description: '', features: [], images: [], status: 'available', featured: false,
}

export default function InventoryAdmin() {
  const [cars, setCars] = useState([])
  const [editing, setEditing] = useState(null) // null | car object
  const [msg, setMsg] = useState('')

  const load = () => fetchAllCarsAdmin().then(setCars).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    try {
      const car = { ...editing }
      if (!car.slug) car.slug = `${car.make}-${car.model}-${car.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      if (typeof car.features === 'string') car.features = car.features.split(',').map((s) => s.trim()).filter(Boolean)
      await upsertCar(car)
      setEditing(null); setMsg('Saved ✓'); load()
    } catch (err) { setMsg(err.message) }
  }

  const remove = async (id) => {
    if (!confirm('Delete this listing?')) return
    try { await deleteCar(id); setMsg('Deleted'); load() } catch (err) { setMsg(err.message) }
  }

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadCarImage(file)
      setEditing({ ...editing, images: [...(editing.images || []), url] })
    } catch (err) { setMsg(err.message) }
  }

  const set = (k) => (e) => setEditing({ ...editing, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Inventory</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{cars.length} listings{!isLive && ' · demo data (connect Supabase to edit)'}</p>
        </div>
        <button className="btn-primary" onClick={() => setEditing({ ...EMPTY })}>+ Add vehicle</button>
      </div>

      {msg && <p className="rounded-xl border border-brand-400/40 bg-brand-50 px-4 py-2.5 text-sm text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">{msg}</p>}

      {/* edit form */}
      {editing && (
        <form onSubmit={save} className="card animate-fade-up space-y-4 p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold">{editing.id ? 'Edit vehicle' : 'New vehicle'}</h2>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <div><label className="label">Make</label>
              <select className="input" value={editing.make} onChange={set('make')}>{MAKES.map((m) => <option key={m}>{m}</option>)}</select></div>
            <div><label className="label">Model *</label><input required className="input" value={editing.model} onChange={set('model')} /></div>
            <div><label className="label">Year</label><input type="number" className="input" value={editing.year} onChange={set('year')} /></div>
            <div><label className="label">Price (KES)</label><input type="number" className="input" value={editing.price} onChange={set('price')} /></div>
            <div><label className="label">Mileage (km)</label><input type="number" className="input" value={editing.mileage} onChange={set('mileage')} /></div>
            <div><label className="label">Fuel</label>
              <select className="input" value={editing.fuel_type} onChange={set('fuel_type')}>{FUELS.map((f) => <option key={f}>{f}</option>)}</select></div>
            <div><label className="label">Transmission</label>
              <select className="input" value={editing.transmission} onChange={set('transmission')}><option>Automatic</option><option>Manual</option></select></div>
            <div><label className="label">Status</label>
              <select className="input" value={editing.status} onChange={set('status')}><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option><option value="draft">Draft</option></select></div>
            <div><label className="label">Engine</label><input className="input" value={editing.engine} onChange={set('engine')} /></div>
            <div><label className="label">Drive</label><input className="input" value={editing.drive} onChange={set('drive')} placeholder="2WD / 4WD / AWD" /></div>
            <div><label className="label">Colour</label><input className="input" value={editing.color} onChange={set('color')} /></div>
            <div><label className="label">Location</label><input className="input" value={editing.location} onChange={set('location')} /></div>
          </div>
          <div><label className="label">Description</label><textarea rows={3} className="input resize-none" value={editing.description} onChange={set('description')} /></div>
          <div><label className="label">Features (comma-separated)</label>
            <input className="input" value={Array.isArray(editing.features) ? editing.features.join(', ') : editing.features} onChange={set('features')} /></div>
          <div>
            <label className="label">Images</label>
            <div className="flex flex-wrap items-center gap-3">
              {(editing.images || []).map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt="" className="h-16 w-24 rounded-lg object-cover" />
                  <button type="button" onClick={() => setEditing({ ...editing, images: editing.images.filter((_, x) => x !== i) })}
                    className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">×</button>
                </div>
              ))}
              <label className="grid h-16 w-24 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-ink-300 text-xs text-ink-400 hover:border-brand-400 dark:border-ink-700">
                + Upload<input type="file" accept="image/*" className="hidden" onChange={onUpload} />
              </label>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.featured} onChange={set('featured')} className="h-4 w-4 accent-brand-500" /> Featured on homepage</label>
          <div className="flex gap-3">
            <button className="btn-primary">Save listing</button>
            <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      {/* table */}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400 dark:border-ink-800">
              <th className="px-5 py-3.5">Vehicle</th><th className="px-5 py-3.5">Price</th><th className="px-5 py-3.5">Mileage</th>
              <th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5">Views</th><th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
            {cars.map((c) => (
              <tr key={c.id} className="transition hover:bg-ink-50 dark:hover:bg-ink-800/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={c.images?.[0]} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div><p className="font-medium">{c.make} {c.model}</p><p className="text-xs text-ink-400">{c.year} · {c.fuel_type}</p></div>
                  </div>
                </td>
                <td className="px-5 py-3 font-medium">{fmtKES(c.price)}</td>
                <td className="px-5 py-3 text-ink-500 dark:text-ink-400">{fmtNum(c.mileage)} km</td>
                <td className="px-5 py-3">
                  <span className={`badge ${c.status === 'available' ? '!bg-green-100 !text-green-700 dark:!bg-green-900/40 dark:!text-green-300' : c.status === 'reserved' ? '!bg-amber-100 !text-amber-700 dark:!bg-amber-900/40 dark:!text-amber-300' : c.status === 'sold' ? '!bg-red-100 !text-red-700 dark:!bg-red-900/40 dark:!text-red-300' : ''}`}>{c.status}</span>
                </td>
                <td className="px-5 py-3 text-ink-500 dark:text-ink-400">{fmtNum(c.views || 0)}</td>
                <td className="px-5 py-3 text-right">
                  <button className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-ink-800" onClick={() => setEditing({ ...c })}>Edit</button>
                  <button className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-ink-800" onClick={() => remove(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
