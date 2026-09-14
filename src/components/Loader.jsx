import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const DURATION = 1800 // ms

  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const pct = Math.min(Math.floor((elapsed / DURATION) * 100), 100)
      setProgress(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 600)
        }, 200)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#0A0A0B',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem'
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#00D9FF',
              letterSpacing: '0.3em',
              textTransform: 'uppercase'
            }}
          >
            PK
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 700,
              color: '#F0F4FF',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              minWidth: '3ch',
              textAlign: 'center'
            }}
          >
            {String(progress).padStart(2, '0')}
            <span style={{ color: '#00D9FF', fontSize: '0.5em' }}>%</span>
          </motion.div>

          {/* Status line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: '#8892A4',
              textTransform: 'uppercase'
            }}
          >
            Loading experience
            <BlinkCursor />
          </motion.p>

          {/* Progress bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            height: '2px', width: '100%',
            background: 'rgba(255,255,255,0.05)'
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00D9FF, #0EA5E9)',
                width: `${progress}%`,
                boxShadow: '0 0 12px #00D9FF'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BlinkCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      style={{ marginLeft: '2px', color: '#00D9FF' }}
    >_</motion.span>
  )
}
