import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 2, suffix: '+', label: 'Years Learning' },
  { value: 6, suffix: '+', label: 'Projects Built' },
  { value: 10, suffix: '+', label: 'Tech Stacks' },
]

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(textRef.current.querySelectorAll('.reveal'), {
        opacity: 0, y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      })

      // Stats counter
      statsRef.current.forEach((el, i) => {
        if (!el) return
        const target = STATS[i].value
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() {
            el.querySelector('.count').textContent = Math.floor(obj.val)
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}
    >
      {/* Eyebrow */}
      <div style={{ marginBottom: '3rem' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem', letterSpacing: '0.25em',
          color: '#00D9FF', textTransform: 'uppercase', marginBottom: '0.5rem'
        }}>// Introduction</p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: '#F0F4FF', lineHeight: 1.1
        }}>About Me</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'start'
      }}>
        {/* Bio */}
        <div ref={textRef}>
          <p className="reveal" style={{
            fontSize: '1.05rem', lineHeight: 1.85, color: '#8892A4',
            marginBottom: '1.25rem'
          }}>
            I'm a freelance Full-Stack Developer with hands-on experience building modern, scalable web applications and AI-powered solutions. Over the past 2 years, I've continuously learned and worked with technologies like React, Next.js, Node.js, APIs, and AI integrations.
          </p>
          <p className="reveal" style={{
            fontSize: '1.05rem', lineHeight: 1.85, color: '#8892A4'
          }}>
            I enjoy turning ideas into clean, functional products — from UI development to backend systems and intelligent automation. My goal is to keep learning, solving real-world problems, and delivering reliable solutions for clients.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem'
        }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              ref={el => statsRef.current[i] = el}
              style={{
                background: '#12151C',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: 'clamp(1rem, 2vw, 1.5rem)',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
                fontWeight: 700, lineHeight: 1,
                color: '#F0F4FF', marginBottom: '0.4rem'
              }}>
                <span className="count">0</span>
                <span style={{ color: '#00D9FF' }}>{s.suffix}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#8892A4', letterSpacing: '0.05em' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
