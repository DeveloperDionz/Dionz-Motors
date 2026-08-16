import { useEffect, useState } from 'react'
import { deletePost, deleteReview, fetchPosts, fetchReviews, isLive, supabase, upsertPost } from '../../lib/supabase'
import { fmtDate } from '../../lib/format'
import { IconStar } from '../../components/Icons'

const EMPTY_POST = { slug: '', title: '', excerpt: '', body: '', cover_url: '', tags: [], published: false, author: 'Dionz Motors' }

export default function ContentAdmin() {
  const [posts, setPosts] = useState([])
  const [reviews, setReviews] = useState([])
  const [editing, setEditing] = useState(null) // null | post object
  const [msg, setMsg] = useState('')

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 4000) }

  const load = async () => {
    if (isLive) {
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from('posts').select('*').order('created_at', { ascending: false }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      ])
      setPosts(p || []); setReviews(r || [])
    } else {
      setPosts(await fetchPosts())
      setReviews(await fetchReviews())
    }
  }
  useEffect(() => { load() }, [])

  // ---------- blog actions ----------
  const savePost = async (e) => {
    e.preventDefault()
    try {
      const post = { ...editing }
      if (!post.slug) post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      if (typeof post.tags === 'string') post.tags = post.tags.split(',').map((s) => s.trim()).filter(Boolean)
      if (!post.cover_url) post.cover_url = '/images/hero.jpg'
      await upsertPost(post)
      setEditing(null); flash('Post saved ✓'); load()
    } catch (err) { flash(err.message) }
  }

  const togglePost = async (post) => {
    if (!isLive) return flash('Connect Supabase to publish/unpublish posts.')
    await supabase.from('posts').update({ published: !post.published }).eq('id', post.id)
    flash(post.published ? 'Post unpublished' : 'Post published ✓')
    load()
  }

  const removePost = async (post) => {
    if (!confirm(`Delete "${post.title}" permanently?`)) return
    try { await deletePost(post.id); flash('Post deleted'); load() } catch (err) { flash(err.message) }
  }

  // ---------- review actions ----------
  const toggleReview = async (review) => {
    if (!isLive) return flash('Connect Supabase to moderate reviews.')
    await supabase.from('reviews').update({ approved: !review.approved }).eq('id', review.id)
    flash(review.approved ? 'Review hidden' : 'Review approved ✓')
    load()
  }

  const removeReview = async (review) => {
    if (!confirm(`Delete the review from ${review.name}?`)) return
    try { await deleteReview(review.id); flash('Review deleted'); load() } catch (err) { flash(err.message) }
  }

  const set = (k) => (e) => setEditing({ ...editing, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const pendingCount = reviews.filter((r) => !r.approved).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Content</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Write and manage blog posts, and moderate customer reviews.</p>
      </div>

      {msg && <p className="rounded-xl border border-brand-400/40 bg-brand-50 px-4 py-2.5 text-sm text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">{msg}</p>}

      {/* ---------------- BLOG ---------------- */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold">Blog posts <span className="text-sm font-normal text-ink-400">({posts.length})</span></h2>
          <button className="btn-primary !py-2.5" onClick={() => setEditing({ ...EMPTY_POST })}>+ New post</button>
        </div>

        {editing && (
          <form onSubmit={savePost} className="card mt-4 animate-fade-up space-y-4 p-5 sm:p-6">
            <h3 className="font-display text-base font-bold">{editing.id ? 'Edit post' : 'Write a new post'}</h3>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="bp-title">Title *</label>
                <input id="bp-title" required className="input" placeholder="e.g. Top 5 Family SUVs Under KES 3M in 2026" value={editing.title} onChange={set('title')} />
              </div>
              <div>
                <label className="label" htmlFor="bp-slug">Slug (URL) — auto-generated if empty</label>
                <input id="bp-slug" className="input" placeholder="top-5-family-suvs-2026" value={editing.slug} onChange={set('slug')} />
              </div>
              <div>
                <label className="label" htmlFor="bp-tags">Tags (comma-separated)</label>
                <input id="bp-tags" className="input" placeholder="Buying Guide, SUV" value={Array.isArray(editing.tags) ? editing.tags.join(', ') : editing.tags} onChange={set('tags')} />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="bp-cover">Cover image URL</label>
                <input id="bp-cover" className="input" placeholder="/images/hero.jpg or a storage/public URL" value={editing.cover_url} onChange={set('cover_url')} />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="bp-excerpt">Excerpt (shown on cards & search engines)</label>
                <textarea id="bp-excerpt" rows={2} className="input resize-none" placeholder="One or two sentences summarising the article…" value={editing.excerpt} onChange={set('excerpt')} />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="bp-body">Body * — separate paragraphs with a blank line</label>
                <textarea id="bp-body" required rows={10} className="input" placeholder={'First paragraph…\n\nSecond paragraph…'} value={editing.body} onChange={set('body')} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published} onChange={set('published')} className="h-4 w-4 accent-brand-500" />
              Publish immediately (otherwise saved as draft)
            </label>
            <div className="flex gap-3">
              <button className="btn-primary">{editing.id ? 'Save changes' : 'Create post'}</button>
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        )}

        <div className="card mt-4 divide-y divide-ink-100 dark:divide-ink-800">
          {posts.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.title}</p>
                <p className="text-xs text-ink-400">{fmtDate(p.created_at)} · /blog/{p.slug} · {Array.isArray(p.tags) ? p.tags.join(', ') : ''}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`badge ${p.published ? '!bg-green-100 !text-green-700 dark:!bg-green-900/40 dark:!text-green-300' : '!bg-amber-100 !text-amber-700 dark:!bg-amber-900/40 dark:!text-amber-300'}`}>{p.published ? 'Published' : 'Draft'}</span>
                <button onClick={() => setEditing({ ...p })} className="btn-ghost !px-3 !py-1.5 text-xs">Edit</button>
                <button onClick={() => togglePost(p)} className="btn-ghost !px-3 !py-1.5 text-xs">{p.published ? 'Unpublish' : 'Publish'}</button>
                <button onClick={() => removePost(p)} className="rounded-xl px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40">Delete</button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="p-6 text-sm text-ink-400">No posts yet — write your first one.</p>}
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section>
        <h2 className="font-display text-lg font-bold">
          Customer reviews <span className="text-sm font-normal text-ink-400">({reviews.length})</span>
          {pendingCount > 0 && <span className="badge ml-2 !bg-amber-100 !text-amber-700 dark:!bg-amber-900/40 dark:!text-amber-300">{pendingCount} awaiting approval</span>}
        </h2>
        <p className="mt-1 text-xs text-ink-400">Customers submit reviews from the website; they stay hidden until you approve them here.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {[...reviews].sort((a, b) => Number(a.approved) - Number(b.approved)).map((r) => (
            <div key={r.id} className={`card p-5 ${!r.approved ? 'ring-1 ring-amber-300 dark:ring-amber-700' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">{r.name}</p>
                  <div className="mt-1 flex gap-0.5 text-brand-400">
                    {Array.from({ length: 5 }, (_, s) => <IconStar key={s} filled={s < r.rating} />)}
                  </div>
                </div>
                <span className={`badge ${r.approved ? '!bg-green-100 !text-green-700 dark:!bg-green-900/40 dark:!text-green-300' : '!bg-amber-100 !text-amber-700 dark:!bg-amber-900/40 dark:!text-amber-300'}`}>
                  {r.approved ? 'Live on site' : 'Pending'}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">"{r.body}"</p>
              <p className="mt-2 text-xs text-ink-400">{r.car_bought ? `Bought: ${r.car_bought} · ` : ''}{fmtDate(r.created_at)}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => toggleReview(r)} className={r.approved ? 'btn-ghost !px-3.5 !py-1.5 text-xs' : 'btn-primary !px-3.5 !py-1.5 text-xs'}>
                  {r.approved ? 'Hide from site' : 'Approve ✓'}
                </button>
                <button onClick={() => removeReview(r)} className="rounded-xl px-3.5 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40">Delete</button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-sm text-ink-400">No reviews yet.</p>}
        </div>
      </section>
    </div>
  )
}
