import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Send } from 'lucide-react'
import PORTRAIT_URL from '../assets/face1.png'
import GOLD_URL from '../assets/face2.png'
import { getLenis } from './SmoothScrollProvider.jsx'

const ROLES = ['Web Developer', 'AI Engineer', 'Full-Stack Developer', 'UI/UX Enthusiast']

// Shared image style: full-bleed absolute layer
const imgLayer = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
}

export default function Hero() {
  const sectionRef = useRef(null)
  const revealRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)

  // Cycle the rotating role line
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -80 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  // RAF cursor-reveal — desktop only
  useEffect(() => {
    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isPointer) return

    const section = sectionRef.current
    const reveal = revealRef.current
    if (!section || !reveal) return

    // current lerped position
    let cx = 0, cy = 0
    // target (raw cursor)
    let tx = 0, ty = 0
    let rafId = null
    let snapped = false
    let running = false

    const LERP = 0.22
    const HALF_W = 55  // half of mask-size width  (110/2)
    const HALF_H = 70  // half of mask-size height (140/2)

    const tick = () => {
      const dx = tx - cx
      const dy = ty - cy
      cx += dx * LERP
      cy += dy * LERP

      const mx = cx - HALF_W
      const my = cy - HALF_H

      // Set both standard and -webkit- for Safari
      reveal.style.maskPosition = `${mx}px ${my}px`
      reveal.style.webkitMaskPosition = `${mx}px ${my}px`

      // Stop when settled
      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
        running = false
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top

      if (!snapped) {
        // First movement: snap position immediately, show reveal
        cx = tx
        cy = ty
        snapped = true
        reveal.style.opacity = '1'
      }

      if (!running) {
        running = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const onMouseLeave = () => {
      reveal.style.opacity = '0'
      snapped = false
      running = false
      cancelAnimationFrame(rafId)
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Shared font style applied inline throughout
  const ff = "'Archivo', sans-serif"
  const textColor = '#f0f0ee'

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: ff,
        color: textColor,
      }}
    >
      {/* ── Layer 1: clean portrait ───────────────────────────────────── */}
      <img
        src={PORTRAIT_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ ...imgLayer, userSelect: 'none', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* ── Layer 2: gold base at 10% ─────────────────────────────────── */}
      <img
        src={GOLD_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          ...imgLayer,
          opacity: 0.1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Layer 3: gold reveal (cursor spotlight) ───────────────────── */}
      <img
        ref={revealRef}
        src={GOLD_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          ...imgLayer,
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2,
          transition: 'opacity 0.4s ease-out',
          // Soft-feathered vertical oval mask
          maskImage:
            'radial-gradient(closest-side, #000 62%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(closest-side, #000 62%, transparent 100%)',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: '110px 140px',
          WebkitMaskSize: '110px 140px',
          maskPosition: '-9999px -9999px',
          WebkitMaskPosition: '-9999px -9999px',
        }}
      />

      {/* ── Layer 4: scrim ────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(20,24,32,0.55) 0%, rgba(20,24,32,0.12) 45%, rgba(20,24,32,0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* ── Content overlay ───────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '44px 64px 40px',
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Headline ──────────────────────────────────────────────── */}
        <div style={{ marginTop: 'auto' }}>
          {/* Animated role line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: '#00D9FF',
              marginBottom: '18px',
              height: '1.4em',
              overflow: 'hidden',
            }}
          >
            <span>I&apos;m a</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block', fontWeight: 600 }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Name */}
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontWeight: 600,
              fontFamily: ff,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: textColor,
              textAlign: 'left',
            }}
          >
            Prince Kaushal
          </h1>

          {/* Buttons */}
          <div
            style={{
              marginTop: '36px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              pointerEvents: 'auto',
            }}
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(0,217,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #00D9FF, #0EA5E9)',
                borderRadius: '999px',
                color: '#0A0A0B',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                cursor: 'none',
              }}
            >
              <Download size={17} />
              Download CV
            </motion.a>

            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03, borderColor: '#00D9FF', color: '#00D9FF' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: 'transparent',
                border: '1.5px solid #f0f0ee',
                borderRadius: '999px',
                color: textColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                cursor: 'none',
              }}
            >
              <Send size={16} />
              Contact Me
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
