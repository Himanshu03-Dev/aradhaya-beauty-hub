import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, animate } from 'framer-motion'
import { site } from '../../data/site'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { lockScroll, unlockScroll } from '../../lib/scrollLock'
import { beginIntro, completeIntro } from '../../lib/introStore'

const SESSION_KEY = 'aradhaya:intro-played'

/**
 * One-time luxury preloader: the wordmark rises behind a gold progress line and
 * a counter, then the panel lifts like a curtain to reveal the hero, whose
 * headline animates in on the same beat (see introStore).
 *
 * Skipped entirely for reduced-motion visitors and on repeat visits within a
 * session, in which case the hero is released immediately.
 */
export function IntroLoader() {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'run' | 'gone'>('idle')
  const [count, setCount] = useState(0)
  const progress = useMotionValue(0)

  useMotionValueEvent(progress, 'change', (v) => setCount(Math.round(v)))

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      seen = false
    }

    // Nothing to play: release the hero at once.
    if (reduced || seen) {
      completeIntro()
      setPhase('gone')
      return
    }

    // Play: hold the hero, run the count, then lift the curtain. Scroll locking
    // is handled by the phase-keyed effect below so it balances under StrictMode.
    beginIntro()
    setPhase('run')

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* private mode — the loader simply plays again next visit */
      }
      // Release the hero as the curtain begins to lift.
      completeIntro()
      setPhase('gone')
    }

    const controls = animate(progress, 100, { duration: 1.5, ease: [0.22, 1, 0.36, 1] })
    const hold = window.setTimeout(finish, 1750)
    const failSafe = window.setTimeout(finish, 3200)
    return () => {
      controls.stop()
      window.clearTimeout(hold)
      window.clearTimeout(failSafe)
    }
  }, [reduced, progress])

  // Hold the page still only while the curtain is up; releases as it lifts.
  useEffect(() => {
    if (phase !== 'run') return
    lockScroll()
    return unlockScroll
  }, [phase])

  return (
    <AnimatePresence>
      {phase === 'run' && (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="grain fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-wine-deep"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                'radial-gradient(60% 50% at 50% 32%, rgba(168,25,78,0.5), transparent 62%), radial-gradient(50% 45% at 50% 100%, rgba(194,155,84,0.22), transparent 60%)',
            }}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="eyebrow text-gold-light/70"
            >
              {site.address.full}
            </motion.span>

            <div className="mt-5 overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.4rem,9vw,5.5rem)] leading-none text-ivory"
              >
                {site.nameLine1}{' '}
                <span className="italic text-gold-gradient animate-shimmer">Beauty Hub</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-4 font-display text-lg italic text-champagne/60"
            >
              {site.tagline}
            </motion.p>

            {/* Gold progress track */}
            <div className="relative mt-9 h-px w-[min(18rem,60vw)] overflow-hidden bg-champagne/15">
              <motion.span
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-deep via-gold-light to-gold"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="mt-4 font-display text-sm tracking-[0.3em] text-champagne/45">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
