import { motion, useMotionValue, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { images } from '../../data/images'
import { site } from '../../data/site'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { useIntroComplete } from '../../lib/introStore'
import { Button } from '../ui/Button'
import { Marquee } from '../ui/Marquee'
import { Media } from '../ui/Media'
import { HeroScene } from '../../three/HeroScene'
import { Stage } from '../../three/Stage'

const rise: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1.15, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Hero() {
  const tier = useDeviceTier()
  const reduced = usePrefersReducedMotion()
  const introDone = useIntroComplete()
  const go = introDone ? 'show' : 'hidden'
  const ref = useRef<HTMLElement>(null)
  const compRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '26%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0])

  // Layered mouse parallax across the composition — each layer at its own depth.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 110, damping: 18, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 110, damping: 18, mass: 0.5 })
  const imgPX = useTransform(sx, (v) => v * 16)
  const imgPY = useTransform(sy, (v) => v * 16)
  const cardPX = useTransform(sx, (v) => v * 38)
  const cardPY = useTransform(sy, (v) => v * 38)
  const badgePX = useTransform(sx, (v) => v * -26)
  const badgePY = useTransform(sy, (v) => v * -26)
  const arcPX = useTransform(sx, (v) => v * -34)
  const arcPY = useTransform(sy, (v) => v * -34)

  const handlePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = compRef.current?.getBoundingClientRect()
    if (!rect) return
    px.set((event.clientX - (rect.left + rect.width / 2)) / rect.width)
    py.set((event.clientY - (rect.top + rect.height / 2)) / rect.height)
  }
  const resetPointer = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative isolate min-h-[100svh] overflow-hidden bg-ivory pb-10 pt-28 lg:pb-0 lg:pt-32"
    >
      {/* Ground wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(75% 60% at 78% 18%, rgba(233,218,190,0.75), transparent 62%), radial-gradient(60% 50% at 6% 92%, rgba(243,234,220,0.95), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 hidden h-[34rem] w-[34rem] rounded-full border border-gold/15 lg:block"
      />

      <div className="shell grid items-center gap-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-12 lg:gap-8">
        {/* ── Copy ───────────────────────────────────────────── */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <span aria-hidden="true" className="h-px w-12 bg-gold" />
            <span className="eyebrow text-ink/60">{site.name}</span>
          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(2.9rem,8.3vw,7rem)] leading-[0.9] tracking-[-0.02em] text-ink">
            <span className="sr-only">Beauty, reimagined — {site.tagline}</span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.08em] pr-[0.12em]">
              <motion.span variants={rise} initial="hidden" animate={go} custom={0} className="block">
                Beauty,
              </motion.span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.08em] pr-[0.14em]">
              <motion.span
                variants={rise}
                initial="hidden"
                animate={go}
                custom={1}
                className="block italic text-gold-gradient animate-shimmer"
              >
                Reimagined.
              </motion.span>
            </span>
          </h1>

          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={introDone ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 block h-px w-44 origin-left bg-gradient-to-r from-gold-deep via-gold-light to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink/65"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button href="#services" variant="solid" withArrow>
              Explore Services
            </Button>
            <Button href="#contact" variant="outline">
              Book Appointment
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.78rem] uppercase tracking-[0.16em] text-ink/55"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-gold-deep" />
              {site.address.full}
            </span>
            <a href={site.phoneHref} className="link-underline inline-flex items-center gap-2 hover:text-wine">
              <Phone aria-hidden="true" className="h-3.5 w-3.5 text-gold-deep" />
              {site.phone}
            </a>
          </motion.div>
        </motion.div>

        {/* ── Composition ────────────────────────────────────── */}
        <div className="relative lg:col-span-6">
          <motion.div
            ref={compRef}
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
            className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] [perspective:1200px] sm:max-w-[30rem] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]"
          >
            {/* 3D layer sits behind and slightly outside the photograph */}
            <Stage
              tier={tier}
              camera={{ position: [0, 0, 6.4], fov: 34 }}
              className="absolute -inset-x-[18%] -inset-y-[12%] -z-10"
              fallback={
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[999px] opacity-70"
                  style={{
                    backgroundImage:
                      'radial-gradient(closest-side, rgba(233,218,190,0.9), transparent 72%)',
                  }}
                />
              }
            >
              <HeroScene tier={tier} />
            </Stage>

            {/* Slowly rotating dashed gold ring, drifting against the cursor */}
            <motion.div
              aria-hidden="true"
              style={{ x: arcPX, y: arcPY }}
              className="pointer-events-none absolute -inset-x-[9%] -inset-y-[6%] -z-[5] hidden lg:block"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="h-full w-full text-gold/30"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="0.6 3.4" />
              </motion.svg>
            </motion.div>

            {/* Photograph — mouse-parallax layer wrapping the entrance reveal */}
            <motion.div style={{ x: imgPX, y: imgPY }} className="relative h-full w-full">
              <motion.div
                initial={{ clipPath: 'inset(0% 0% 100% 0%)', scale: 1.06 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                transition={{ duration: 1.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Media
                  image={images.heroImage}
                  priority
                  parallax={26}
                  sizes="(max-width: 1024px) 90vw, 46vw"
                  className="h-full w-full rounded-t-[14rem] shadow-[0_50px_110px_-55px_rgba(54,10,28,0.75)]"
                  imgClassName="object-[50%_18%]"
                >
                  {/* Editorial scrim + warm top light for depth */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(to top, rgba(54,10,28,0.5), transparent 34%), radial-gradient(60% 40% at 50% 4%, rgba(233,218,190,0.35), transparent 60%)',
                    }}
                  />
                </Media>
                {/* Double gold frame */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-t-[14rem] border border-gold/40" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-[9px] rounded-t-[13rem] border border-gold/15" />
              </motion.div>

              {/* Floating glass caption chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-10 right-0 hidden items-center gap-2.5 rounded-full border border-gold/30 bg-ivory/75 px-4 py-2 shadow-[0_18px_40px_-24px_rgba(54,10,28,0.6)] backdrop-blur-md sm:flex lg:-right-6"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="eyebrow text-wine">Bridal Artistry</span>
              </motion.div>
            </motion.div>

            {/* Overlapping mehndi detail card — nearest parallax layer */}
            <motion.div
              style={{ x: cardPX, y: cardPY }}
              className="absolute -bottom-6 -left-4 w-28 sm:-left-8 sm:w-36 lg:-left-14 lg:w-44"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Media
                  image={images.mehndiImage}
                  sizes="180px"
                  parallax={16}
                  className="aspect-[3/4] border-4 border-ivory shadow-[0_24px_60px_-30px_rgba(54,10,28,0.7)]"
                />
              </motion.div>
            </motion.div>

            {/* Women-only badge — as stated on the studio's own signage */}
            <motion.div
              style={{ x: badgePX, y: badgePY }}
              className="absolute -top-4 -left-2 hidden sm:block lg:-left-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 1.2 }}
                className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 backdrop-blur-sm lg:h-28 lg:w-28"
              >
                <span className="text-center font-display text-sm italic leading-tight text-wine">
                  Women
                  <br />
                  only
                  <br />
                  <span className="eyebrow not-italic text-gold-deep">studio</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Floating vertical label */}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              aria-hidden="true"
              className="writing-vertical absolute -right-8 top-1/2 hidden -translate-y-1/2 text-[0.65rem] uppercase tracking-[0.42em] text-ink/40 xl:block"
            >
              Bridal · Mehndi · Glam
            </motion.span>

            {/* Soft gold sparkles */}
            {!reduced && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="absolute right-[16%] top-[7%] hidden h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(194,155,84,0.7)] lg:block"
                  animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.25, 0.7] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-[16%] right-[7%] hidden h-1 w-1 rounded-full bg-gold-light shadow-[0_0_12px_2px_rgba(227,200,142,0.7)] lg:block"
                  animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
                  transition={{ duration: 4.2, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Foot of the hero ───────────────────────────────── */}
      <div className="shell mt-14 flex items-end justify-between gap-6 lg:mt-10">
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="group flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.3em] text-ink/45 transition-colors hover:text-wine"
        >
          <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-scrollDot bg-gold" />
          </span>
          Scroll
        </motion.a>

        <span className="hidden text-right font-display text-xl italic text-ink/45 sm:block">
          {site.tagline}
        </span>
      </div>

      <div className="mt-10 border-y border-ink/10 py-4 lg:mt-14">
        <Marquee
          items={['Bridal Makeup', 'Mehndi', 'Facial', 'Hair Spa', 'Party Makeup', 'Manicure', 'Pedicure', 'Waxing']}
          className="text-[0.72rem] uppercase tracking-[0.32em] text-ink/45"
        />
      </div>
    </section>
  )
}
