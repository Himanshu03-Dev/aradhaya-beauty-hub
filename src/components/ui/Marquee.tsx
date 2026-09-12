import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

type MarqueeProps = {
  items: string[]
  className?: string
  itemClassName?: string
  /** Idle drift speed, %/s. Negative scrolls left. */
  baseVelocity?: number
}

/**
 * Kinetic editorial ticker: drifts on its own, then speeds up, reverses and
 * skews with the page's scroll velocity — the row leans into the motion. Falls
 * back to a plain static strip when the visitor prefers reduced motion.
 */
export function Marquee({ items, className, itemClassName, baseVelocity = -2.2 }: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const row = [...items, ...items, ...items, ...items]

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const skew = useTransform(smooth, [-1200, 0, 1200], [-5, 0, 5], { clamp: true })

  // Four copies → wrap over a quarter of the track for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  if (reduced) {
    return (
      <div className={cn('relative flex overflow-hidden', className)} aria-hidden="true">
        <div className="flex items-center gap-10 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className={cn('flex items-center gap-10', itemClassName)}>
              {item}
              <span className="inline-block h-1 w-1 rotate-45 bg-current opacity-50" />
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={cn('relative flex overflow-hidden', className)}
      aria-hidden="true"
      style={{ skewX: skew }}
    >
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className={cn('flex items-center gap-10 pr-10', itemClassName)}>
            {item}
            <span className="inline-block h-1 w-1 rotate-45 bg-current opacity-50" />
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
