import { motion } from 'framer-motion'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ShowcaseScene } from '../../three/ShowcaseScene'
import { Stage } from '../../three/Stage'

const notes = [
  { label: 'Colour', value: 'Wine, rouge & gold' },
  { label: 'Finish', value: 'Soft-glam, camera ready' },
  { label: 'Craft', value: 'Hand-drawn mehndi' },
]

export function ThreeDShowcase() {
  const tier = useDeviceTier()

  return (
    <section
      aria-label="Beauty in motion"
      className="grain relative isolate overflow-hidden bg-ink py-section text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(60% 55% at 50% 40%, rgba(90,15,43,0.75), transparent 68%), radial-gradient(40% 40% at 85% 90%, rgba(194,155,84,0.16), transparent 65%)',
        }}
      />

      <div className="shell relative">
        <div className="flex flex-col items-center text-center">
          <SectionHeading index="03" eyebrow="The signature" title="Beauty in" accent="motion." align="center" tone="light" size="lg" />
        </div>

        <div className="relative mt-4 lg:-mt-6">
          <Stage
            tier={tier}
            camera={{ position: [0, 0, 6.6], fov: 36 }}
            interactive
            className="relative mx-auto h-[46svh] w-full min-h-[20rem] sm:h-[58svh] lg:h-[64svh]"
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div
                  aria-hidden="true"
                  className="h-56 w-56 rounded-full border border-gold/40 sm:h-72 sm:w-72"
                  style={{
                    backgroundImage:
                      'radial-gradient(closest-side, rgba(194,155,84,0.35), rgba(168,25,78,0.12) 60%, transparent 72%)',
                  }}
                />
              </div>
            }
          >
            <ShowcaseScene tier={tier} />
          </Stage>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="rule mx-auto max-w-3xl origin-center"
          />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.label} delay={i * 0.09} className="text-center">
              <p className="eyebrow text-gold">{note.label}</p>
              <p className="mt-3 font-display text-2xl text-champagne/90">{note.value}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="mx-auto max-w-xl text-[0.95rem] leading-relaxed text-champagne/55">
            <span className="hidden lg:inline">Move your cursor to turn the piece. </span>
            The palette above is the one the studio actually works in — deep wine, rouge and warm gold, the
            colours of the lehengas and jewellery that come through the door.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
