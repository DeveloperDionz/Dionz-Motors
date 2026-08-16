import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { fetchPosts } from '../lib/supabase'
import { fmtDate } from '../lib/format'

export default function Blog() {
  const [posts, setPosts] = useState(null)
  useEffect(() => { fetchPosts().then(setPosts).catch(() => setPosts([])) }, [])

  return (
    <div className="pt-24 md:pt-28">
      <section className="container-x pb-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500">Guides & insights</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">The Dionz Blog</h1>
          <p className="mt-3 max-w-xl text-sm text-ink-500 dark:text-ink-400">
            Import math, financing breakdowns and honest ownership advice for the Kenyan market.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(posts || []).map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <Link to={`/blog/${p.slug}`} className="card group block h-full overflow-hidden hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[16/9] overflow-hidden bg-ink-100 dark:bg-ink-800">
                  <img src={p.cover_url} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags?.map((t) => <span key={t} className="badge">{t}</span>)}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-ink-400">{p.author} · {fmtDate(p.created_at)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
