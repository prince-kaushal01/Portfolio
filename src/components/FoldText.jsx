import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FoldText.css'

gsap.registerPlugin(ScrollTrigger)

const HINGE_CONFIG = {
  top:    { origin: '50% 0%',   rotateX: -92, rotateY: 0   },
  bottom: { origin: '50% 100%', rotateX:  92, rotateY: 0   },
  left:   { origin: '0% 50%',   rotateX:   0, rotateY: 92  },
  right:  { origin: '100% 50%', rotateX:   0, rotateY: -92 },
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const renderWhitespace = (value, key) =>
  value.split(/(\n)/).map((part, i) => {
    if (part === '\n') return <br key={`${key}-br-${i}`} />
    if (!part) return null
    return (
      <span className="fold-text-whitespace" key={`${key}-space-${i}`}>
        {part.replace(/ /g, '\u00A0')}
      </span>
    )
  })

const FoldText = ({
  text          = 'Design unfolds',
  splitBy       = 'char',
  hinge         = 'top',
  duration      = 0.65,
  stagger       = 0.045,
  ease          = 'power3.out',
  perspective   = 700,
  creaseShading = 0.55,
  trigger       = 'mount',
  // When trigger="scroll", pass scrub={true} or scrub={1} to tie
  // animation progress directly to scroll position (1 = 1s smoothing).
  scrub         = false,
  scrollStart   = 'top 85%',
  scrollEnd     = 'bottom 20%',
  fontSize      = 80,
  fontWeight    = 800,
  color         = '#f7f2e8',
  className     = '',
  style         = {},
}) => {
  const rootRef     = useRef(null)
  const tlRef       = useRef(null)
  const hingeConfig = HINGE_CONFIG[hinge] || HINGE_CONFIG.top
  const safeCrease  = clamp(creaseShading, 0, 1)
  const safePerspective = Math.max(120, perspective)

  const segments = useMemo(() => {
    let segIdx = 0

    const renderSegment = (content, key, split = splitBy) => {
      segIdx += 1
      return (
        <span
          className="fold-text-segment"
          data-fold-split={split}
          key={key}
          style={{ '--fold-perspective': `${safePerspective}px` }}
        >
          <span
            className="fold-text-piece"
            data-fold-hinge={hinge}
            style={{ transformOrigin: hingeConfig.origin, '--fold-crease': 0 }}
          >
            {content || '\u00A0'}
          </span>
        </span>
      )
    }

    if (splitBy === 'line') {
      return text.split('\n').map((line, i) => (
        <span className="fold-text-line" key={`line-${i}`}>
          {renderSegment(line || '\u00A0', `segment-line-${i}`, 'line')}
        </span>
      ))
    }

    if (splitBy === 'word') {
      return text.split(/(\s+)/).flatMap((part, i) => {
        if (!part) return []
        if (/^\s+$/.test(part)) return renderWhitespace(part, `ws-${i}`)
        return renderSegment(part, `segment-word-${segIdx}`)
      })
    }

    return Array.from(text).map((char, i) => {
      if (char === '\n') return <br key={`br-${i}`} />
      return renderSegment(char === ' ' ? '\u00A0' : char, `segment-char-${i}`)
    })
  }, [text, splitBy, hinge, hingeConfig.origin, safePerspective])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = rootRef.current
    if (!root) return

    const pieces = Array.from(root.querySelectorAll('.fold-text-piece'))
    if (!pieces.length) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const activeDuration = reduceMotion ? Math.min(duration, 0.22) : duration
    const activeStagger  = reduceMotion ? Math.min(stagger, 0.02)  : stagger

    const fromVars = {
      opacity:         0,
      rotateX:         reduceMotion ? 0 : hingeConfig.rotateX,
      rotateY:         reduceMotion ? 0 : hingeConfig.rotateY,
      '--fold-crease': reduceMotion ? 0 : safeCrease,
      transformOrigin: hingeConfig.origin,
      force3D:         true,
    }
    const toVars = {
      opacity:         1,
      rotateX:         0,
      rotateY:         0,
      '--fold-crease': 0,
      duration:        activeDuration,
      ease:            reduceMotion ? 'power1.out' : ease,
      stagger:         activeStagger,
      clearProps:      'willChange',
    }

    const kill = () => {
      tlRef.current?.scrollTrigger?.kill()
      tlRef.current?.kill()
      tlRef.current = null
      gsap.killTweensOf(pieces)
    }

    const play = (repeat = false) => {
      kill()
      tlRef.current = gsap.timeline({
        repeat: repeat ? -1 : 0,
        repeatDelay: repeat ? 0.75 : 0,
      })
      tlRef.current.fromTo(pieces, fromVars, toVars)
      return tlRef.current
    }

    let hoverHandler
    let st

    if (trigger === 'hover') {
      gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0, transformOrigin: hingeConfig.origin })
      hoverHandler = () => play(false)
      root.addEventListener('mouseenter', hoverHandler)

    } else if (trigger === 'scroll') {
      gsap.set(pieces, fromVars)

      if (scrub) {
        // ── Scrub mode: scroll position drives animation progress 1-to-1 ──
        kill()
        tlRef.current = gsap.timeline({
          scrollTrigger: {
            trigger:  root,
            start:    scrollStart,
            end:      scrollEnd,
            scrub:    typeof scrub === 'number' ? scrub : 1,
          },
        })
        tlRef.current.fromTo(pieces, fromVars, toVars)
      } else {
        // ── One-shot mode: plays once when the element enters the viewport ─
        st = ScrollTrigger.create({
          trigger: root,
          start:   'top 82%',
          once:    true,
          onEnter: () => play(false),
        })
      }

    } else if (trigger === 'loop') {
      play(true)
    } else {
      play(false)
    }

    return () => {
      if (hoverHandler) root.removeEventListener('mouseenter', hoverHandler)
      st?.kill()
      kill()
    }
  }, [text, splitBy, hinge, duration, stagger, ease, perspective, safeCrease,
      trigger, scrub, scrollStart, scrollEnd,
      hingeConfig.origin, hingeConfig.rotateX, hingeConfig.rotateY])

  return (
    <span
      ref={rootRef}
      className={`fold-text ${className}`.trim()}
      style={{
        '--fold-text-font-size':   typeof fontSize   === 'number' ? `${fontSize}px`   : fontSize,
        '--fold-text-font-weight': fontWeight,
        '--fold-text-color':       color,
        ...style,
      }}
    >
      <span className="fold-text-sr-only">{text}</span>
      <span className="fold-text-visual" aria-hidden="true">
        {segments}
      </span>
    </span>
  )
}

export default FoldText
