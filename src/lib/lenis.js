import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let instance = null

export function initLenis() {
  if (instance) return instance

  instance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    smoothTouch: false,
    infinite: false,
  })

  // Sync GSAP ScrollTrigger with Lenis scroll position
  instance.on('scroll', ScrollTrigger.update)

  // Drive Lenis from GSAP's ticker so it stays in sync with all animations
  gsap.ticker.add((time) => {
    instance.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return instance
}

export function getLenis() {
  return instance
}

export function destroyLenis() {
  if (instance) {
    instance.destroy()
    instance = null
  }
}
