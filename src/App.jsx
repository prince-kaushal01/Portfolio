import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import { initLenis, destroyLenis } from './lib/lenis.js'
import ProjectDetail from './pages/ProjectDetail.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      {/* Loading curtain — sits above everything; unmounts after exit animation */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<MainPage ready={!loading} />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </>
  )
}

function MainPage({ ready }) {
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
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
