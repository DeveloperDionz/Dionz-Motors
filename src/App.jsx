import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { storage, prefersDark } from './lib/safeStorage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import CarDetail from './pages/CarDetail'
import Financing from './pages/Financing'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import InventoryAdmin from './pages/admin/InventoryAdmin'
import LeadsAdmin from './pages/admin/LeadsAdmin'
import ContentAdmin from './pages/admin/ContentAdmin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    try { window.scrollTo({ top: 0 }) } catch { /* sandboxed iframe */ }
  }, [pathname])
  return null
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = storage.get('dionz-theme')
    if (saved) return saved === 'dark'
    return prefersDark()
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    storage.set('dionz-theme', dark ? 'dark' : 'light')
  }, [dark])

  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {!isAdmin && <Navbar dark={dark} toggleDark={() => setDark(!dark)} />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cars/:slug" element={<CarDetail />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout dark={dark} toggleDark={() => setDark(!dark)} />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<InventoryAdmin />} />
            <Route path="leads" element={<LeadsAdmin />} />
            <Route path="content" element={<ContentAdmin />} />
          </Route>
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  )
}
