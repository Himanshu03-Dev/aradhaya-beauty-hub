import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { scrollToTarget } from '../../lib/scrollLock'

/**
 * A restrained gold return-to-top control that fades in once the visitor is a
 * screenful or two down the page.
 */
export function BackToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (value) => setShow(value > 900))

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => scrollToTarget(0)}
          aria-label="Back to top"
          data-cursor="open"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-5 z-[85] flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 text-wine backdrop-blur-md transition-colors duration-300 hover:border-gold hover:bg-wine hover:text-champagne lg:bottom-8 lg:right-8"
        >
          <ArrowUp aria-hidden="true" className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
