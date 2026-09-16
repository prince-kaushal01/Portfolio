import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Download, Send } from 'lucide-react'
import PORTRAIT_URL from '../assets/face1.png'
import GOLD_URL from '../assets/face3.png'

const ROLES = ['Web Developer', 'AI Engineer', 'Full-Stack Developer', 'UI/UX Enthusiast']

export default function Hero() {
  const sectionRef = useRef(null)
  const revealRef = useRef(null)
  const roleRef = useRef(null)
  const bgImageRef = useRef(null)
  const headlineRef = useRef(null)
  const taglineRef = useRef(null)
  const buttonsRef = useRef(null)
  const availabilityRef = useRef(null)
  const statsRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)

  // ── Page-load entrance animation ────────────────────────────────────────
  useEffect(() => {
    const bg = bgImageRef.current
    const headline = headlineRef.current
    const tagline = taglineRef.current
    const buttons = buttonsRef.current
    const availability = availabilityRef.current
    const stats = statsRef.current

    if (!bg || !headline || !tagline || !buttons || !availability || !stats) return

    const statItems = stats.querySelectorAll('[data-stat]')

    gsap.set(bg, { opacity: 0 })
    gsap.set([headline, tagline, buttons, availability], { y: -48, opacity: 0 })
    gsap.set(statItems, { y: -48, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(bg, { opacity: 1, duration: 1.1 })
    tl.to(headline,     { y: 0, opacity: 1, duration: 0.6  }, '+=0.1')
    tl.to(tagline,      { y: 0, opacity: 1, duration: 0.55 }, '-=0.25')
    tl.to(buttons,      { y: 0, opacity: 1, duration: 0.5  }, '-=0.2')
    tl.to(availability, { y: 0, opacity: 1, duration: 0.45 }, '-=0.2')
    tl.to(statItems,    { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  // ── Role rotation ────────────────────────────────────────────────────────
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRoleIndex(current => (current + 1) % ROLES.length)
    }, 2000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!roleRef.current) return
    gsap.fromTo(
      roleRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
    )
  }, [roleIndex])

  // ── Gold spotlight cursor (desktop only) ────────────────────────────────
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const section = sectionRef.current
    const reveal = revealRef.current
    if (!section || !reveal) return

    let cursorX = 0, cursorY = 0
    let targetX = 0, targetY = 0
    let frameId = null
    let active = false

    const updateReveal = () => {
      cursorX += (targetX - cursorX) * 0.12
      cursorY += (targetY - cursorY) * 0.12
      reveal.style.maskPosition = `${cursorX - 110}px ${cursorY - 140}px`
      reveal.style.webkitMaskPosition = `${cursorX - 110}px ${cursorY - 140}px`

      if (Math.abs(targetX - cursorX) < 0.3 && Math.abs(targetY - cursorY) < 0.3) {
        active = false
        return
      }
      frameId = requestAnimationFrame(updateReveal)
    }

    const handleMouseMove = event => {
      const bounds = section.getBoundingClientRect()
      targetX = event.clientX - bounds.left
      targetY = event.clientY - bounds.top
      reveal.style.opacity = '1'
      if (!active) {
        active = true
        frameId = requestAnimationFrame(updateReveal)
      }
    }

    const handleMouseLeave = () => {
      reveal.style.opacity = '0'
      active = false
      cancelAnimationFrame(frameId)
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(frameId)
    }
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden font-[Archivo,sans-serif] text-[#f0f0ee]"
    >
      {/* ── Layer 1: clean portrait ───────────────────────────────────── */}
      <img
        ref={bgImageRef}
        src={PORTRAIT_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full select-none object-cover object-center"
      />

      {/* ── Layer 2: gold base at 10% ─────────────────────────────────── */}
      <img
        src={GOLD_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-[1] block h-full w-full select-none object-cover object-center opacity-10"
      />

      {/* ── Layer 3: gold spotlight — follows cursor ──────────────────── */}
      <img
        ref={revealRef}
        src={GOLD_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-[2] block h-full w-full select-none object-cover object-center opacity-0 [mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:220px_280px] [mask-position:-9999px_-9999px] [-webkit-mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:220px_280px] [-webkit-mask-position:-9999px_-9999px]"
      />

      {/* ── Layer 4: scrim ────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(20,24,32,0.55)_0%,rgba(20,24,32,0.12)_45%,rgba(20,24,32,0.6)_100%)]"
      />

      {/* ── Content overlay ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none relative z-[4] flex h-full flex-col justify-center"
        style={{
          paddingTop: '22vh',
          paddingLeft: 'clamp(1.5rem, 10vw, 100px)',
          paddingRight: 'clamp(1.5rem, 6vw, 140px)',
        }}
      >
        {/* ── Headline block ────────────────────────────────────────── */}
        <div style={{ width: 'min(100%, 640px)' }}>
          <h1
            ref={headlineRef}
            className="m-0 min-h-[1.76em] overflow-hidden text-left font-[Archivo,sans-serif] text-[clamp(2rem,5.4vw,4.25rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-[#f0f0ee]"
          >
            <span ref={roleRef} className="block">
              <span className="block text-[#39FF6A]">
                {ROLES[roleIndex].split(' ').slice(0, -1).join(' ')}
              </span>
              <span className="block text-[#f0f0ee]">
                {ROLES[roleIndex].split(' ').slice(-1)}
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="max-w-[500px] font-[Inter,sans-serif] font-normal tracking-[0.01em] text-[rgba(240,244,255,0.7)]"
            style={{
              marginTop: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.65,
            }}
          >
            Hi! I&apos;m <strong className="font-semibold text-[#f0f0ee]">Prince</strong>. A creative Full-Stack Developer with 2+ years of experience building high-performance, scalable, and responsive web solutions.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="pointer-events-auto flex flex-wrap items-center gap-4"
            style={{ marginTop: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
          >
            <button
              onClick={scrollToContact}
              className="inline-flex rounded-2xl items-center gap-2 bg-[#39FF6A] font-[Archivo,sans-serif] text-sm font-bold uppercase tracking-[0.08em] text-[#0A0A0A] no-underline"
              style={{ padding: '1rem 2.25rem' }}
            >
              <Send size={15} />
              Let&apos;s Talk
            </button>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2.5 rounded-2xl border-[1.5px] border-[rgba(240,240,238,0.5)] bg-transparent font-[Archivo,sans-serif] text-[13px] font-bold uppercase tracking-[0.08em] text-[#f0f0ee]"
              style={{ padding: '0.95rem 1.9rem' }}
            >
              <Download size={14} />
              Download CV
            </a>
          </div>

          {/* Availability status */}
          <div
            ref={availabilityRef}
            className="pointer-events-auto inline-flex items-center gap-2 font-[Inter,sans-serif] text-[15px] tracking-[0.05em] text-[rgba(240,244,255,0.62)]"
            style={{ marginTop: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            <span className="mb-[6px] text-lg text-green-500">●</span>
            Available for full-time opportunities
          </div>
        </div>

        {/* ── Stats block ───────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="absolute flex flex-col text-right"
          style={{
            bottom: 'clamp(2rem, 8vh, 4.5rem)',
            right: 'clamp(1.5rem, 5vw, 4.5rem)',
            gap: 'clamp(2rem, 6.5vh, 4rem)',
          }}
        >
          {[
            ['2+', 'Years Learning'],
            ['7+', 'Completed Projects'],
            ['10k+', 'Working Hours'],
          ].map(([value, label]) => (
            <div key={label} data-stat>
              <strong
                className="block font-[Archivo,sans-serif] leading-[0.9] tracking-[-0.05em] text-[#39FF6A]"
                style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.85rem)' }}
              >
                {value}
              </strong>
              <span
                className="mt-2 block text-[rgba(240,244,255,0.68)]"
                style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center md:flex">
          <span className="font-[Inter,sans-serif] text-[0.65rem] uppercase tracking-[0.28em] text-white/30">
            Hover Image to explore
          </span>
        </div>
      </div>
    </section>
  )
}
