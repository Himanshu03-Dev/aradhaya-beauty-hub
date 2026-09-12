import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const labels: Record<string, string> = {
  view: 'View',
  open: '',
  drag: 'Drag',
  close: 'Close',
}

/**
 * A restrained two-part cursor: a small dot that tracks exactly, and a ring
 * that lags slightly and grows over interactive elements. Desktop only.
 */
export function CustomCursor() {
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const [mode, setMode] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 340, damping: 34, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 340, damping: 34, mass: 0.5 })

  const disabled = touch || reduced

  useEffect(() => {
    if (disabled) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)

      const target = event.target as HTMLElement | null
      const holder = target?.closest?.('[data-cursor]') as HTMLElement | null
      if (holder) {
        setMode(holder.dataset.cursor ?? 'open')
        return
      }
      const interactive = target?.closest?.('a, button, input, textarea, select, [role="button"]')
      setMode(interactive ? 'open' : null)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [disabled, visible, x, y])

  if (disabled) return null

  const label = mode ? labels[mode] ?? '' : ''
  const expanded = mode === 'view' || mode === 'drag' || mode === 'close'

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-wine"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !expanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-wine/40 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: expanded ? 84 : mode === 'open' ? 48 : 30,
          height: expanded ? 84 : mode === 'open' ? 48 : 30,
          opacity: visible ? 1 : 0,
          backgroundColor: expanded ? 'rgba(90,15,43,0.92)' : 'rgba(90,15,43,0)',
          borderColor: expanded ? 'rgba(90,15,43,0)' : 'rgba(90,15,43,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[0.6rem] uppercase tracking-[0.2em] text-champagne"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
