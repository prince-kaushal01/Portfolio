import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import BoxLoader from './ui/box-loader'

export default function LoadingScreen({ onComplete }) {
  const screenRef    = useRef(null)
  const contentRef   = useRef(null)
  const progressRef  = useRef(null)
  const percentRef   = useRef(null)

  useEffect(() => {
    document.body.classList.add('loading')

    const startTime   = Date.now()
    const MIN_DISPLAY = 2200 // ms — enough time to appreciate the animation

    // Animate a fake-progress counter to 90 % while resources are loading.
    // We drive it with GSAP so the number ticks up smoothly.
    const proxy = { v: 0 }
    const progressTween = gsap.to(proxy, {
      v: 90,
      duration: MIN_DISPLAY / 1000 * 0.85,
      ease: 'power1.in',
      onUpdate() {
        const val = Math.round(proxy.v)
        if (percentRef.current)  percentRef.current.textContent = `${val}%`
        if (progressRef.current) progressRef.current.style.width = `${val}%`
      },
    })

    const runExit = () => {
      progressTween.kill()

      // Snap to 100 %
      if (percentRef.current)  percentRef.current.textContent = '100%'
      if (progressRef.current) progressRef.current.style.width = '100%'

      // Brief hold at 100 %, then play the curtain-lift exit
      setTimeout(() => {
        const tl = gsap.timeline({
          onComplete() {
            document.body.classList.remove('loading')
            onComplete?.()
          },
        })

        // 1. Fade + lift the inner content
        tl.to(contentRef.current, {
          opacity: 0,
          y: -24,
          duration: 0.45,
          ease: 'power2.in',
        })

        // 2. Slide the whole curtain upward
        tl.to(screenRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power3.inOut',
        }, '-=0.05')
      }, 350)
    }

    const finish = () => {
      const elapsed   = Date.now() - startTime
      const remaining = Math.max(0, MIN_DISPLAY - elapsed)
      setTimeout(runExit, remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      progressTween.kill()
      window.removeEventListener('load', finish)
      document.body.classList.remove('loading')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={screenRef}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         99999,
        background:     'var(--bg-primary)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
      }}
    >
      {/* Subtle noise — matches the site-wide body::before */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity:         0.03,
          pointerEvents:   'none',
        }}
      />

      {/* Centre content */}
      <div
        ref={contentRef}
        style={{
          position:       'relative',
          zIndex:         1,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '2.5rem',
          textAlign:      'center',
        }}
      >
        {/* 3-D box loader — scaled up for visibility */}
        <div style={{ transform: 'scale(2)', margin: '2.5rem 0 2rem' }}>
          <BoxLoader />
        </div>

        {/* Percentage */}
        <span
          ref={percentRef}
          style={{
            fontFamily:    '"Courier New", monospace',
            fontSize:      '0.8rem',
            color:         'var(--text-muted)',
            letterSpacing: '0.15em',
          }}
        >
          0%
        </span>
      </div>

      {/* Bottom progress bar */}
      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '2px',
          background: 'rgba(255,255,255,0.06)',
        }}
      >
        <div
          ref={progressRef}
          style={{
            height:     '100%',
            width:      '0%',
            background: '#ffffff',
            boxShadow:  '0 0 14px rgba(255,255,255,0.35)',
          }}
        />
      </div>
    </div>
  )
}
