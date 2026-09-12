import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navItems } from '../../data/site'
import { useIsTouch } from '../../hooks/useMediaQuery'
import { scrollToTarget } from '../../lib/scrollLock'

/**
 * A quiet editorial section index pinned to the right edge on large screens.
 * The active dot tracks the section in view; a hover reveals its label. Purely
 * additive — the anchors in the navbar still work on their own.
 */
export function SectionNav() {
  const touch = useIsTouch()
  const [active, setActive] = useState(navItems[0]?.href ?? '')

  useEffect(() => {
    if (touch) return
    const ids = navItems.map((item) => item.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the vertical centre of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [touch])

  if (touch) return null

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-4">
        {navItems.map((item) => {
          const isActive = active === item.href
          return (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => scrollToTarget(item.href)}
                className="group flex items-center gap-3"
                aria-label={`Go to ${item.label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className="translate-x-2 text-[0.62rem] uppercase tracking-[0.22em] text-ink/50 opacity-0 transition-all duration-500 ease-silk group-hover:translate-x-0 group-hover:opacity-100"
                >
                  {item.label}
                </span>
                <span
                  className={
                    'relative flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-colors duration-500 ' +
                    (isActive ? 'border-gold' : 'border-ink/30 group-hover:border-wine')
                  }
                >
                  <motion.span
                    className="rounded-full bg-gold"
                    animate={{ scale: isActive ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    style={{ width: 5, height: 5 }}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
