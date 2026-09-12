import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * A soft gold light that trails the cursor. Screen-blended, so it is invisible
 * on the ivory sections and blooms gently across the dark ones — depth without
 * a hard effect. Desktop only, and never for reduced motion.
 */
export function CursorGlow() {
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const disabled = touch || reduced

  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.7 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.7 })

  useEffect(() => {
    if (disabled) return
    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [disabled, x, y])

  if (disabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      <motion.div
        className="absolute h-[34rem] w-[34rem] rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(closest-side, rgba(194,155,84,0.16), rgba(168,25,78,0.06) 45%, transparent 72%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
