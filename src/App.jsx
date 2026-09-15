import { useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import SmoothScrollProvider from './components/SmoothScrollProvider.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem('pk_loaded') === '1'
  })

  useEffect(() => {
    if (!loaded) {
      document.body.classList.add('loading')
    }
  }, [loaded])

  const handleLoaded = () => {
    sessionStorage.setItem('pk_loaded', '1')
    document.body.classList.remove('loading')
    setLoaded(true)
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollProgress />
      {!loaded && <Loader onComplete={handleLoaded} />}
      <SmoothScrollProvider>
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
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
      <span style={{ transform: `translateY(${progress * 64}px)` }} />
    </div>
  )
}
