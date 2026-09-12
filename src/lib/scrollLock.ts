import type Lenis from 'lenis'

/**
 * Reference-counted scroll lock.
 *
 * `overflow: hidden` alone is not enough here: Lenis scrolls the document
 * programmatically, which that property does not block. So the lock pauses the
 * Lenis instance too, and counting means the mobile menu and the gallery
 * lightbox can be open at once without one releasing the other's lock.
 */
let instance: Lenis | null = null
let count = 0

export function registerLenis(lenis: Lenis | null) {
  instance = lenis
  // If a lock is already held when Lenis mounts (e.g. the intro loader), honour it.
  if (lenis && count > 0) lenis.stop()
}

/**
 * Smoothly scroll to a target (pixel offset, CSS selector, or element),
 * routing through Lenis when it is active and falling back to native smooth
 * scrolling otherwise (reduced-motion visitors).
 */
export function scrollToTarget(target: number | string | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.2, offset: -1 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}

export function lockScroll() {
  count += 1
  if (count > 1) return
  instance?.stop()
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  count = Math.max(0, count - 1)
  if (count > 0) return
  instance?.start()
  document.body.style.overflow = ''
}
