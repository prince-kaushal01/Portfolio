import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Particles from './components/Particles.jsx'
import { initLenis, destroyLenis } from './lib/lenis.js'

export default function App() {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  return (
    <>
      {/* ── Fixed particle bg — viewport-locked, never scrolls ───────── */}
      <div style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
      }}>
        <Particles
          particleColors={['#ffffff', '#ffffff', '#aaaaaa']}
          particleCount={180}
          particleSpread={8}
          speed={0.04}
          particleBaseSize={120}
          alphaParticles={false}
          sizeRandomness={1}
          disableRotation={false}
          cameraDistance={20}
          pixelRatio={window.devicePixelRatio || 1}
        />
      </div>

      {/* ── All page content sits above the fixed canvas ─────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <ScrollProgress />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      setProgress(Math.min(1, Math.max(0, nextProgress)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ '--scroll-progress': `${progress * 64}px`, transform: 'translateY(var(--scroll-progress))' }} />
    </div>
  )
}
