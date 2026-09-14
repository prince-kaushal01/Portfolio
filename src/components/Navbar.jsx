import { useEffect, useState } from 'react'
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

const SOCIALS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Email', href: 'mailto:princekaushal357@gmail.com' },
]

export default function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
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
          background: 'transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '1.25rem', fontWeight: 900,
            color: '#F0F4FF', background: 'none', border: 'none',
            cursor: 'none', letterSpacing: '0.04em'
          }}
        >
          PK<span style={{ color: '#39FF6A' }}>.</span>
        </button>

        {/* Menu trigger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: 'none', border: 'none', color: '#F0F4FF',
            cursor: 'none', padding: '8px', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}
          aria-label="Open menu"
        >
          <Menu size={30} strokeWidth={1.5} />
        </button>
      </motion.nav>

      {/* Right-side navigation panel */}
      <AnimatePresence>
        {menuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.68)' }}>
            <motion.aside
              key="side-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', top: 0, right: 0, bottom: 0,
                width: 'min(100%, 480px)',
                background: '#303030',
                padding: 'clamp(5rem, 12vh, 8rem) clamp(2rem, 6vw, 5rem)',
                color: '#F0F4FF',
              }}
            >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute', top: '1.5rem', right: '2rem',
                background: 'none', border: 'none', color: '#F0F4FF', cursor: 'none'
              }}
              aria-label="Close menu"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 7vw, 5rem)' }}>
                <div>
                  <p style={{ color: '#b5b5b5', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2rem' }}>Social</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {SOCIALS.map(social => (
                      <a key={social.label} href={social.href} style={{ color: '#F0F4FF', textDecoration: 'none', fontSize: '1rem' }}>
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ color: '#b5b5b5', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2rem' }}>Menu</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {LINKS.map((link, index) => (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 + 0.15 }}
                        onClick={() => scrollTo(link.href)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.7rem',
                          padding: 0, border: 0, background: 'none', cursor: 'none',
                          color: active === link.href ? '#F0F4FF' : '#F0F4FF',
                          fontSize: '1rem', textAlign: 'left'
                        }}
                      >
                        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: ['#FBBF24', '#60A5FA', '#2DD4BF', '#818CF8', '#39FF6A'][index] }} />
                        {link.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', left: 'clamp(2rem, 6vw, 5rem)', right: 'clamp(2rem, 6vw, 5rem)', bottom: '3rem' }}>
                <p style={{ color: '#b5b5b5', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Get in touch</p>
                <a href="mailto:princekaushal357@gmail.com" style={{ color: '#F0F4FF', textDecoration: 'none', fontSize: '1rem' }}>
                  princekaushal357@gmail.com
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
