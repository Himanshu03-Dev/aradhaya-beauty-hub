import { useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { images } from '../../data/images'
import { services } from '../../data/services'
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { Button } from '../ui/Button'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceItem } from './ServiceItem'

export function Services() {
  const isDesktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const previewX = useSpring(x, { stiffness: 190, damping: 22, mass: 0.5 })
  const previewY = useSpring(y, { stiffness: 190, damping: 22, mass: 0.5 })

  const activeService = services.find((service) => service.id === active) ?? null

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || reduced) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left - 150)
    y.set(event.clientY - rect.top - 190)
  }

  return (
    <section id="services" className="grain relative overflow-hidden bg-cream py-section">
      <motion.div
        aria-hidden="true"
        animate={{ opacity: activeService ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(70% 55% at 80% 20%, rgba(233,218,190,0.85), transparent 65%), radial-gradient(60% 50% at 10% 90%, rgba(168,25,78,0.07), transparent 60%)',
        }}
      />

      <div className="shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading index="02" eyebrow="What we do" title="Where elegance" accent="meets artistry." />
          </div>

          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-[1rem] leading-relaxed text-ink/60">
              Nine services, one studio. Choose one for a quiet hour to yourself, or put several together for a
              wedding morning.
            </p>
          </Reveal>
        </div>

        <div
          ref={sectionRef}
          onMouseMove={handleMove}
          onMouseLeave={() => isDesktop && setActive(null)}
          className="relative mt-14"
        >
          <ul className="relative z-10 border-t border-ink/[0.12]">
            {services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                isDesktop={isDesktop}
                active={active === service.id}
                onActivate={() => setActive(service.id)}
                onToggle={() => setActive((current) => (current === service.id ? null : service.id))}
              />
            ))}
          </ul>

          {/* Cursor-tracked preview — desktop only, and never for reduced motion */}
          {isDesktop && !reduced && (
            <motion.div
              aria-hidden="true"
              style={{ x: previewX, y: previewY }}
              className="pointer-events-none absolute left-0 top-0 z-0 h-[24rem] w-[19rem]"
            >
              <AnimatePresence mode="wait">
                {activeService && (
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
                    exit={{ opacity: 0, scale: 0.96, rotate: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full overflow-hidden shadow-[0_40px_90px_-45px_rgba(54,10,28,0.7)]"
                  >
                    {activeService.image && images[activeService.image].ready ? (
                      <img
                        src={images[activeService.image].small ?? images[activeService.image].src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Placeholder index={activeService.index} title={activeService.title} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center gap-6">
          <Button href="#contact" variant="solid" withArrow>
            Book a service
          </Button>
          <p className="text-[0.8rem] uppercase tracking-[0.16em] text-ink/45">
            Bridal &amp; party makeup by appointment
          </p>
        </Reveal>
      </div>
    </section>
  )
}
