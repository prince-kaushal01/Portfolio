import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FoldText from './FoldText'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = "I build thoughtful digital experiences where clear design, strong performance, and meaningful interactions come together."

const BIO_LINE1 = "I'm a freelance Full-Stack Developer and AI Engineer focused on turning ideas into polished, reliable digital products. I enjoy building responsive interfaces, scalable backend systems, and intelligent tools that feel simple to use."
const BIO_LINE2 = "My approach combines thoughtful visual design with practical engineering. From React and Next.js to APIs, databases, and AI integrations, I build experiences that are fast, accessible, and ready to grow."

const FOLD_WORD_PROPS = {
  splitBy:       'char',
  hinge:         'top',
  trigger:       'scroll',
  scrub:         1,
  scrollStart:   'top 90%',
  scrollEnd:     'bottom 85%',
  duration:      0.4,
  stagger:       0.012,
  ease:          'power2.out',
  perspective:   600,
  creaseShading: 0.45,
  style:         { lineHeight: 1.65, letterSpacing: '0em' },
}

// Scroll-driven character-by-character text reveal.
// Writes directly to the DOM — no React re-renders per frame.
function ScrollTypeText({ text }) {
  const wrapRef   = useRef(null)
  const textRef   = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const wrap   = wrapRef.current
    const textEl = textRef.current
    const cursor = cursorRef.current
    if (!wrap || !textEl) return

    // Start empty
    textEl.textContent = ''

    // Cursor blink when fully typed
    let blinkTween = null

    const st = ScrollTrigger.create({
      trigger: wrap,
      // start: paragraph top crosses 80% down the viewport
      start: 'top 95%',
      // end: paragraph bottom crosses 25% from the top
      end:   'top 60%',
      scrub: 1,
      onUpdate: self => {
        const count = Math.min(Math.round(self.progress * text.length), text.length)
        textEl.textContent = text.slice(0, count)

        // When fully revealed: hide cursor; otherwise show it steady
        if (cursor) {
          if (count >= text.length) {
            // Start blinking once complete
            if (!blinkTween) {
              blinkTween = gsap.to(cursor, {
                opacity: 0,
                duration: 0.55,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
              })
            }
          } else {
            // Kill blink, keep cursor solid while typing
            blinkTween?.kill()
            blinkTween = null
            gsap.set(cursor, { opacity: 1 })
          }
        }
      },
    })

    return () => {
      blinkTween?.kill()
      st.kill()
    }
  }, [text])

  return (
    <span ref={wrapRef} style={{ position: 'relative', display: 'block' }}>
      {/* Ghost — invisible but holds the exact space the full text needs.
          This prevents any layout shift while characters type in. */}
      <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block' }}>
        {text}
      </span>

      {/* Animated text — absolutely overlaid on the ghost */}
      <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <span ref={textRef} />
        <span
          ref={cursorRef}
          aria-hidden="true"
          style={{ color: '#39FF6A', marginLeft: '0.05em' }}
        >_</span>
      </span>
    </span>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/[0.04]"
      style={{
        paddingLeft: 'clamp(1.5rem, 12vw, 260px)',
        paddingRight: 'clamp(1.5rem, 6vw, 140px)',
        paddingTop: 'clamp(7rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      <div className="max-w-[1250px]">

        {/* ── Scroll-typed headline ─────────────────────────────────── */}
        <p
          className="mt-0 font-[Archivo,sans-serif] font-light leading-[1.08] tracking-[-0.045em] text-[#d9d9d9]"
          style={{
            marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
            fontSize: 'clamp(2.5rem, 5.2vw, 4.1rem)',
          }}
        >
          <ScrollTypeText text={HEADLINE} />
        </p>

        <p
          className="font-[Inter,sans-serif] text-base tracking-[0.02em]"
          style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
        >
          <FoldText
            {...FOLD_WORD_PROPS}
            text="This is me."
            fontSize="1rem"
            fontWeight={400}
            color="#8892A4"
            stagger={0.04}
            style={{ lineHeight: 1.65, letterSpacing: '0.02em' }}
          />
        </p>

        <div className="border-t border-white/[0.12]" style={{ paddingTop: 'clamp(0.2rem, 1vw, 0.5rem)' }}>
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start"
            style={{
              marginTop: 'clamp(2rem, 4vw, 3.5rem)',
              gap: 'clamp(2rem, 8vw, 8rem)',
            }}
          >
            <h2
              className="m-0 font-[Archivo,sans-serif] font-extrabold leading-[1.05] tracking-[-0.045em]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              <FoldText
                {...FOLD_WORD_PROPS}
                text="Hi, I'm Prince."
                fontSize="clamp(2.2rem, 4vw, 4rem)"
                fontWeight={800}
                color="#f0f0ee"
                stagger={0.025}
                style={{ lineHeight: 1.05, letterSpacing: '-0.045em' }}
              />
            </h2>

            <div>
              <p className="m-0" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.2rem)', lineHeight: 1.65 }}>
                <FoldText
                  {...FOLD_WORD_PROPS}
                  text={BIO_LINE1}
                  fontSize="clamp(1rem, 1.25vw, 1.2rem)"
                  fontWeight={400}
                  color="#aeb4c0"
                />
              </p>

              <p className="m-0" style={{ marginTop: '1.5rem', fontSize: 'clamp(1rem, 1.25vw, 1.2rem)', lineHeight: 1.65 }}>
                <FoldText
                  {...FOLD_WORD_PROPS}
                  text={BIO_LINE2}
                  fontSize="clamp(1rem, 1.25vw, 1.2rem)"
                  fontWeight={400}
                  color="#aeb4c0"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
