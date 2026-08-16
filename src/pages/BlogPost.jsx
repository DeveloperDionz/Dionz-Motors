import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { fetchPostBySlug } from '../lib/supabase'
import { fmtDate } from '../lib/format'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    setPost(undefined)
    fetchPostBySlug(slug).then(setPost).catch(() => setPost(null))
  }, [slug])

  useEffect(() => {
    if (post) document.title = `${post.title} — Dionz Motors Blog`
    return () => { document.title = 'Dionz Motors — Premium Cars in Nairobi | Buy, Trade-In & Finance' }
  }, [post])

  if (post === undefined) return <div className="container-x pt-32 pb-20"><div className="card h-96 animate-pulse-soft" /></div>
  if (post === null) {
    return (
      <div className="container-x pt-32 pb-20 text-center">
        <h1 className="font-display text-2xl font-bold">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-6">Back to blog</Link>
      </div>
    )
  }

  return (
    <div className="pt-24 md:pt-28">
      <article className="container-x max-w-3xl pb-16">
        <Reveal>
          <nav className="text-xs text-ink-400" aria-label="Breadcrumb">
            <Link to="/blog" className="hover:text-brand-500">← All articles</Link>
          </nav>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags?.map((t) => <span key={t} className="badge">{t}</span>)}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-ink-400">{post.author} · {fmtDate(post.created_at)}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 overflow-hidden rounded-2xl">
            <img src={post.cover_url} alt="" className="aspect-[16/9] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">
            {(post.body || '').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <h2 className="font-display text-lg font-bold">Ready to find your next car?</h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Browse inspected, duty-cleared units with transparent pricing.</p>
            </div>
            <Link to="/inventory" className="btn-primary">Browse inventory</Link>
          </div>
        </Reveal>
      </article>
    </div>
  )
}
