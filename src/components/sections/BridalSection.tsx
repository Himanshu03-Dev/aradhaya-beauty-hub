import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { images } from '../../data/images'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const panels = [
  { title: 'The full look', body: 'Base, eyes, lips, drape and hair, planned around your lehenga and jewellery.' },
  { title: 'Mehndi alongside', body: 'Hands and feet drawn freehand, booked for the day before so the colour deepens.' },
  { title: 'Built to photograph', body: 'Long-wear products chosen for the light you will actually be shot in.' },
]

export function BridalSection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const wordX = useTransform(scrollYProgress, [0, 1], ['8%', reduced ? '8%' : '-14%'])

  return (
    <section
      id="bridal"
      ref={ref}
      className="grain relative isolate overflow-hidden bg-wine-deep py-section text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(65% 50% at 15% 10%, rgba(168,25,78,0.55), transparent 62%), radial-gradient(50% 45% at 90% 85%, rgba(194,155,84,0.2), transparent 62%)',
        }}
      />

      <motion.span
        aria-hidden="true"
        style={{ x: wordX }}
        className="pointer-events-none absolute inset-x-0 top-6 select-none whitespace-nowrap font-display text-[26vw] leading-none text-champagne/[0.055] lg:top-2"
      >
        The Bride · The Bride
      </motion.span>

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* ── Campaign image ────────────────────────────────── */}
        <div className="relative lg:col-span-6 lg:col-start-1">
          <div className="relative mx-auto max-w-[26rem] lg:max-w-none">
            <Media
              image={images.editorialPortrait}
              reveal
              parallax={30}
              sizes="(max-width: 1024px) 85vw, 42vw"
              className="aspect-[4/5] w-full"
              cursor="view"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-4 border border-gold/30" />

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 left-1/2 w-[min(20rem,88%)] -translate-x-1/2 border border-champagne/20 bg-wine/70 px-6 py-5 backdrop-blur-md lg:-right-10 lg:bottom-10 lg:left-auto lg:translate-x-0"
            >
              <p className="eyebrow text-gold">Bridal makeup</p>
              <p className="mt-3 font-display text-xl italic leading-snug text-champagne/90">
                “A face that still looks like you — at the mandap, and in every photograph after.”
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Copy ──────────────────────────────────────────── */}
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading index="04" eyebrow="The bridal experience" title="Your day," accent="unhurried." tone="light" />

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-champagne/70">
              Bridal bookings get the studio to themselves. We talk through the lehenga, the jewellery and the
              timing beforehand, so the morning itself is calm — one thing after another, finished well before
              you need to leave.
            </p>
          </Reveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px origin-left bg-gradient-to-r from-gold via-gold-light to-transparent"
          />

          <div className="mt-8 space-y-6">
            {panels.map((panel, i) => (
              <Reveal key={panel.title} delay={0.1 + i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rotate-45 bg-gold" />
                  <div>
                    <h3 className="font-display text-xl text-ivory">{panel.title}</h3>
                    <p className="mt-1 max-w-sm text-[0.95rem] leading-relaxed text-champagne/60">
                      {panel.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <Button href="#contact" variant="light" withArrow>
              Discover bridal makeup
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
