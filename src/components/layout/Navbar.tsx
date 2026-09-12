import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Phone } from 'lucide-react'
import { navItems, site } from '../../data/site'
import { lockScroll, unlockScroll } from '../../lib/scrollLock'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Magnetic } from '../ui/Magnetic'

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const last = useRef(0)

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 40)
    // Hide on the way down, reveal on the way up — but never while the menu is open.
    setHidden(!open && value > 420 && value > last.current)
    last.current = value
  })

  // Lock the page behind the mobile menu.
  useEffect(() => {
    if (!open) return
    lockScroll()
    return unlockScroll
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 transition-[background-color,box-shadow,border-color] duration-500 ease-silk',
          // Sits above the mobile overlay so the close button stays reachable.
          open ? 'z-[110]' : 'z-[90]',
          scrolled
            ? 'border-b border-ink/10 bg-ivory/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav aria-label="Primary" className="shell flex items-center justify-between gap-6 py-4 lg:py-5">
          <a
            href="#home"
            className="group relative z-10 flex flex-col leading-[0.92]"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-[1.45rem] tracking-[0.12em] text-ink transition-colors duration-500 group-hover:text-wine">
              {site.nameLine1.toUpperCase()}
            </span>
            <span className="eyebrow mt-1 text-gold-deep">{site.nameLine2}</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <Magnetic strength={0.4}>
                  <a
                    href={item.href}
                    className="link-underline block px-1 py-1 text-[0.78rem] uppercase tracking-[0.2em] text-ink/70 transition-colors duration-300 hover:text-wine"
                  >
                    {item.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[0.78rem] tracking-[0.14em] text-ink/70 transition-colors hover:text-wine md:inline-flex lg:hidden xl:inline-flex"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              {site.phone}
            </a>

            <div className="hidden lg:block">
              <Button href="#contact" variant="solid" className="px-6 py-3">
                Book Appointment
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[110] flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="flex h-4 w-6 flex-col justify-between">
                <motion.span
                  animate={open ? { rotate: 45, y: 7, backgroundColor: '#E9DABE' } : { rotate: 0, y: 0 }}
                  className="block h-px w-full bg-ink"
                />
                <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-px w-full bg-ink" />
                <motion.span
                  animate={open ? { rotate: -45, y: -7, backgroundColor: '#E9DABE' } : { rotate: 0, y: 0 }}
                  className="block h-px w-full bg-ink"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-wine-deep px-[var(--shell-x)] pb-10 pt-28 lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(90% 60% at 100% 0%, rgba(168,25,78,0.55), transparent 60%), radial-gradient(70% 50% at 0% 100%, rgba(194,155,84,0.28), transparent 60%)',
              }}
            />

            <ul className="relative space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden border-b border-champagne/15"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 font-display text-4xl text-ivory sm:text-5xl"
                  >
                    <span className="eyebrow text-gold">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative space-y-5"
            >
              <div className="rule" />
              <a href={site.phoneHref} className="block font-display text-3xl text-champagne">
                {site.phone}
              </a>
              <p className="text-sm leading-relaxed text-champagne/60">
                {site.address.area}
                <br />
                {site.address.landmark}
              </p>
              <Button href="#contact" variant="light" magnetic={false} withArrow>
                Book Appointment
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
