import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [isTouch] = useState(() => window.matchMedia('(hover: none)').matches)
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    if (isTouch) return

    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
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
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <div style={{ left: position.x, top: position.y }} className={`pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39FF6A] shadow-[0_0_8px_#39FF6A] ${hovered ? 'h-2 w-2' : 'h-1.5 w-1.5'}`} />
      {/* Ring */}
      <div style={{ left: position.x, top: position.y }} className={`pointer-events-none fixed z-[99998] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] ${hovered ? 'h-10 w-10 border-[#39FF6A] opacity-90' : 'h-7 w-7 border-[rgba(57,255,106,0.4)] opacity-50'}`} />
    </>
  )
}
