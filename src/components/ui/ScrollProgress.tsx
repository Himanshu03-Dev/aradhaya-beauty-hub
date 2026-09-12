import { motion, useScroll, useSpring } from 'framer-motion'

/** Hairline gold progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold-light to-gold"
    />
  )
}
