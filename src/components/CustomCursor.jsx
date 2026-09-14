import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(true)
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
          borderRadius: '50%',
          background: '#00D9FF',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px #00D9FF',
          transition: 'width 0.15s, height 0.15s'
        }}
      />
      {/* Ring */}
      <motion.div
        animate={{
          x: pos.x - (hovered ? 20 : 14),
          y: pos.y - (hovered ? 20 : 14),
          width: hovered ? 40 : 28,
          height: hovered ? 40 : 28,
          borderColor: hovered ? '#00D9FF' : 'rgba(0,217,255,0.4)',
          opacity: hovered ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.5 }}
        style={{
          position: 'fixed',
          borderRadius: '50%',
          border: '1.5px solid rgba(0,217,255,0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />
    </>
  )
}
