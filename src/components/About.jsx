import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 13.7vw, 12rem)',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}
    >
      <div style={{ maxWidth: '1250px' }}>
        <p
          className="reveal"
          style={{
            margin: 0,
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(2.5rem, 5.2vw, 4.1rem)',
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.045em',
            color: '#d9d9d9',
            marginBottom:'6%'
          }}
        >
          I build thoughtful digital experiences where clear design, strong performance, and meaningful interactions come together.
        </p>
            <p style={{
            marginBottom: '1%',
            color: '#8892A4',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            letterSpacing: '0.02em',
          }}>This is me.</p>

        <div
          style={{
            paddingTop: 'clamp(0.2rem, 1vw, 0.5rem)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 8vw, 8rem)',
              alignItems: 'start',
              marginTop: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            <h2
              className="reveal"
              style={{
                margin: 0,
                fontFamily: "'Archivo', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: '-0.045em',
                color: '#f0f0ee',
              }}
            >
              Hi, I&apos;m Prince.
            </h2>

            <div ref={textRef}>
              <p className="reveal" style={{
                margin: 0,
                color: '#aeb4c0',
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                lineHeight: 1.65,
              }}>
                I&apos;m a freelance Full-Stack Developer and AI Engineer focused on turning ideas into polished, reliable digital products. I enjoy building responsive interfaces, scalable backend systems, and intelligent tools that feel simple to use.
              </p>
              <p className="reveal" style={{
                margin: '1.5rem 0 0',
                color: '#aeb4c0',
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                lineHeight: 1.65,
              }}>
                My approach combines thoughtful visual design with practical engineering. From React and Next.js to APIs, databases, and AI integrations, I build experiences that are fast, accessible, and ready to grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
