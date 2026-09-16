import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { X, Menu } from 'lucide-react'
import { getLenis } from '../lib/lenis.js'

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

const DOT_COLORS = ['bg-amber-400', 'bg-blue-400', 'bg-teal-400', 'bg-indigo-400', 'bg-[#39FF6A]']

export default function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const timelineRef = useRef(null)
  const mountedRef = useRef(false)

  // ── Active section tracking ─────────────────────────────────────────
  useEffect(() => {
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
    return () => observer.disconnect()
  }, [])

  // ── GSAP open/close animation ───────────────────────────────────────
  useEffect(() => {
    const backdrop = backdropRef.current
    const panel = panelRef.current
    if (!backdrop || !panel) return

    timelineRef.current?.kill()
    gsap.killTweensOf([backdrop, panel])

    if (!mountedRef.current && !menuOpen) {
      gsap.set(backdrop, { opacity: 0 })
      gsap.set(panel, { xPercent: 100 })
      backdrop.style.pointerEvents = 'none'
      mountedRef.current = true
      return
    }

    mountedRef.current = true

    if (menuOpen) {
      gsap.set(backdrop, { opacity: 0 })
      gsap.set(panel, { xPercent: 100 })
      backdrop.style.pointerEvents = 'auto'
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(backdrop, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
        .to(panel, { xPercent: 0, duration: 0.55, ease: 'power3.out' }, 0)
      timelineRef.current = tl
    } else {
      gsap.set(backdrop, { opacity: 1 })
      const tl = gsap.timeline({
        defaults: { ease: 'power3.in' },
        onComplete: () => {
          backdrop.style.pointerEvents = 'none'
        },
      })
      tl.to(panel, { xPercent: 100, duration: 0.45, ease: 'power3.in' }, 0)
        .to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.05)
      timelineRef.current = tl
    }

    return () => {
      timelineRef.current?.kill()
      gsap.killTweensOf([backdrop, panel])
    }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-[1000] flex h-[80px] items-center justify-between bg-transparent"
        style={{ paddingLeft: 'clamp(1.5rem, 5vw, 3.5rem)', paddingRight: 'clamp(1.5rem, 5vw, 3.5rem)' }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="border-0 bg-transparent font-[Archivo,sans-serif] text-xl font-black tracking-[0.04em] text-[#F0F4FF]"
          style={{ padding: '0.5rem 0.25rem' }}
        >
          PK<span className="text-[#39FF6A]">.</span>
        </button>

        {/* Menu trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center justify-center border-0 bg-transparent text-[#F0F4FF]"
          style={{ padding: '0.75rem' }}
          aria-label="Open menu"
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Backdrop — always mounted, animated via GSAP opacity/pointer-events */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[2000] bg-black/70 opacity-0"
        style={{ pointerEvents: 'none' }}
        onClick={() => setMenuOpen(false)}
      >
        {/* Panel — always mounted, animated via GSAP xPercent */}
        <aside
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 right-0 top-0 w-[min(100%,500px)] bg-[#303030] text-[#F0F4FF]"
          style={{
            padding: 'clamp(6rem, 14vh, 9rem) clamp(2rem, 6vw, 5rem) clamp(2rem, 6vw, 5rem)',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute border-0 bg-transparent text-[#F0F4FF]"
            style={{ top: 'clamp(1.5rem, 4vh, 2.25rem)', right: 'clamp(1.5rem, 4vw, 2rem)' }}
            aria-label="Close menu"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-2" style={{ gap: 'clamp(2rem, 7vw, 5rem)' }}>
            <div>
              <p className="mb-8 text-[0.85rem] uppercase text-[#b5b5b5]">Social</p>
              <div className="flex flex-col gap-5">
                {SOCIALS.map(social => (
                  <a key={social.label} href={social.href} className="text-base text-[#F0F4FF] no-underline">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-8 text-[0.85rem] uppercase text-[#b5b5b5]">Menu</p>
              <div className="flex flex-col gap-5">
                {LINKS.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    aria-current={active === link.href ? 'page' : undefined}
                    className="flex items-center gap-[0.7rem] border-0 bg-transparent p-0 text-left text-base text-[#F0F4FF]"
                  >
                    <span className={`h-[9px] w-[9px] rounded-full ${DOT_COLORS[index]}`} />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-12" style={{ left: 'clamp(2rem, 6vw, 5rem)', right: 'clamp(2rem, 6vw, 5rem)' }}>
            <p className="mb-6 text-[0.85rem] uppercase text-[#b5b5b5]">Get in touch</p>
            <a href="mailto:princekaushal357@gmail.com" className="text-base text-[#F0F4FF] no-underline">
              princekaushal357@gmail.com
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}