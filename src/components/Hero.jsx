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
    }, 3500)
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
          justifyContent: 'flex-end',
          padding: '44px clamp(1.5rem, 7vw, 6rem) clamp(2.5rem, 9vh, 5rem)',
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Headline ──────────────────────────────────────────────── */}
        <div style={{ marginTop: 'auto', marginBottom: 'clamp(4rem, 8vh, 5rem)', width: 'min(100%, 620px)' }}>
          {/* Animated role heading */}
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(2rem, 5.4vw, 4.25rem)',
              fontWeight: 900,
              fontFamily: "'Archivo', sans-serif",
              letterSpacing: '-0.055em',
              lineHeight: 0.88,
              color: textColor,
              textAlign: 'left',
              textTransform: 'uppercase',
              minHeight: '1.76em',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'block' }}
              >
                <span style={{ display: 'block', color: '#39FF6A' }}>
                  {ROLES[roleIndex].split(' ').slice(0, -1).join(' ')}
                </span>
                <span style={{ display: 'block', color: textColor }}>
                  {ROLES[roleIndex].split(' ').slice(-1)}
                </span>
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Tagline */}
          <p
            style={{
              marginTop: '28px',
              fontSize: 'clamp(13px, 1.15vw, 14px)',
              color: 'rgba(240,244,255,0.7)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: '500px',
              letterSpacing: '0.01em',
            }}
          >
            Hi! I&apos;m <strong style={{ color: textColor, fontWeight: 600 }}>Prince</strong>. A creative Full-Stack Developer with 2+ years of experience building high-performance, scalable, and responsive web solutions.
          </p>

          {/* Buttons */}
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              pointerEvents: 'auto',
            }}
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(57,255,106,0.35)', filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: '#39FF6A',
                borderRadius: 0,
                color: '#0A0A0A',
                fontFamily: "'Archivo', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                cursor: 'none',
                textTransform: 'uppercase',
              }}
            >
              <Send size={15} />
              Let&apos;s Talk
            </motion.a>

            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02, borderColor: '#39FF6A', color: '#39FF6A', boxShadow: '0 0 16px rgba(57,255,106,0.2)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 26px',
                background: 'transparent',
                border: '1.5px solid rgba(240,240,238,0.5)',
                borderRadius: '5px',
                color: textColor,
                fontFamily: "'Archivo', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'none',
                textTransform: 'uppercase',
                transition: 'border-color 0.18s, color 0.18s, box-shadow 0.18s',
              }}
            >
              <Download size={14} />
              Download CV
            </motion.button>
          </div>

          {/* Availability status */}
          <div
            style={{
              marginTop: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              color: 'rgba(240,244,255,0.62)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ color: 'green', fontSize: '20px', marginBottom:'5px' }}>●</span>
            Available for full-time opportunities
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 'clamp(1.5rem, 5vw, 4.5rem)',
            bottom: 'clamp(2rem, 8vh, 4.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2.25rem, 7vh, 4.25rem)',
            textAlign: 'right',
          }}
        >
          {[
            ['2+', 'Years Learning'],
            ['7+', 'Completed Projects'],
            ['10k+', 'Working Hours'],
          ].map(([value, label]) => (
            <div key={label}>
              <strong
                style={{
                  display: 'block',
                  color: '#39FF6A',
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.05em',
                }}
              >
                {value}
              </strong>
              <span
                style={{
                  display: 'block',
                  marginTop: '8px',
                  color: 'rgba(240,244,255,0.68)',
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
