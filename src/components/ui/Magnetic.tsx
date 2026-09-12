import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

/** Pulls its child gently toward the cursor. No-op on touch and reduced motion. */
export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const disabled = touch || reduced

  if (disabled) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
