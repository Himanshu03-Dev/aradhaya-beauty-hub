import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './useMediaQuery'
import { registerLenis } from '../lib/scrollLock'

gsap.registerPlugin(ScrollTrigger)

/**
 * Momentum scrolling wired into GSAP's ScrollTrigger so scrubbed animations
 * stay in sync. Disabled entirely when the visitor prefers reduced motion,
 * which leaves plain, fully accessible native scrolling in place.
 */
export function useSmoothScroll(): void {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', () => ScrollTrigger.update())
    registerLenis(lenis)

    const onRaf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      gsap.ticker.lagSmoothing(500, 33)
      registerLenis(null)
      lenis.destroy()
    }
  }, [reduced])
}
