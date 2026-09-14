import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { getLenis } from './SmoothScrollProvider.jsx'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    // Active section tracking
    const sections = LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -80 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 clamp(1rem, 4vw, 3rem)',
          height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,11,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s'
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem', fontWeight: 700,
            color: '#F0F4FF', background: 'none', border: 'none',
            cursor: 'none', letterSpacing: '0.05em'
          }}
        >
          Prince<span style={{ color: '#00D9FF' }}>.</span>
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
          className="hidden md:flex">
          {LINKS.map(l => (
            <NavLink key={l.href} {...l} active={active === l.href} onClick={() => scrollTo(l.href)} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: 'none', border: 'none', color: '#F0F4FF',
            cursor: 'none', display: 'none', padding: '8px'
          }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: '#0A0A0B',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2.5rem'
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute', top: '1.5rem', right: 'clamp(1rem,4vw,3rem)',
                background: 'none', border: 'none', color: '#F0F4FF', cursor: 'none'
              }}
            >
              <X size={24} />
            </button>
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                  fontWeight: 700, color: active === l.href ? '#00D9FF' : '#F0F4FF',
                  background: 'none', border: 'none', cursor: 'none',
                  letterSpacing: '-0.01em'
                }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.85rem', fontWeight: 500,
        color: active ? '#00D9FF' : '#8892A4',
        background: 'none', border: 'none', cursor: 'none',
        letterSpacing: '0.03em', position: 'relative',
        padding: '4px 0', transition: 'color 0.2s'
      }}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-underline"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '1.5px', background: '#00D9FF',
            boxShadow: '0 0 8px #00D9FF'
          }}
        />
      )}
    </button>
  )
}
