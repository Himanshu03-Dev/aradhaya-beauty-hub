import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { images, type ImageKey } from '../../data/images'
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { SectionHeading } from '../ui/SectionHeading'

type Panel = { key: ImageKey; index: string; title: string; tag: string }

const allPanels: Panel[] = [
  { key: 'heroImage', index: '01', title: 'Bridal', tag: 'The complete look' },
  { key: 'mehndiImage', index: '02', title: 'Mehndi', tag: 'Freehand, fresh paste' },
  { key: 'artistryCloseup', index: '03', title: 'Party Makeup', tag: 'Camera-ready glam' },
  { key: 'hairImage', index: '04', title: 'Hair', tag: 'Spa, cut & styling' },
  { key: 'facialImage', index: '05', title: 'Facial', tag: 'A natural glow' },
  { key: 'nailsImage', index: '06', title: 'Hands & Feet', tag: 'Manicure & pedicure' },
  { key: 'abstractCampaign', index: '07', title: 'The Counter', tag: 'Cosmetics & jewellery' },
  { key: 'editorialPortrait', index: '08', title: 'The Bride', tag: 'Unhurried, unforgettable' },
]

const panels: Panel[] = allPanels.filter((panel) => images[panel.key].ready)

function PanelCard({ panel }: { panel: Panel }) {
  const image = images[panel.key]
  return (
    <article className="group relative h-full w-[78vw] shrink-0 snap-center overflow-hidden sm:w-[52vw] lg:w-[30vw]">
      <img
        src={image.small ?? image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.06]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/10"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-4 border border-champagne/15" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 lg:p-7">
        <div>
          <p className="eyebrow text-gold-light">{panel.tag}</p>
          <h3 className="mt-2 font-display text-3xl text-ivory lg:text-4xl">{panel.title}</h3>
        </div>
        <span className="font-display text-5xl leading-none text-champagne/25">{panel.index}</span>
      </div>
    </article>
  )
}

/**
 * "Signature" filmstrip. On the desktop it pins to the viewport and the strip
 * of looks travels sideways as you scroll down — a horizontal chapter inside a
 * vertical page. The pin is pure CSS `sticky` plus a scroll-linked transform,
 * which stays perfectly in step with the smooth-scroll layer. On touch and for
 * reduced motion it becomes a simple swipeable rail.
 */
export function SignatureScroll() {
  const isDesktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const pinned = isDesktop && !reduced

  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    if (!pinned) {
      setDistance(0)
      return
    }
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    // Re-measure once images have settled their layout.
    const timer = window.setTimeout(measure, 400)
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(timer)
    }
  }, [pinned])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  if (!pinned) {
    // Touch / reduced-motion: a horizontal swipe rail.
    return (
      <section aria-label="Signature looks" className="grain relative overflow-hidden bg-ink py-section text-ivory">
        <div className="relative mb-10 px-[var(--shell-x)]">
          <SectionHeading index="05" eyebrow="Signature looks" title="A studio," accent="in full." tone="light" />
        </div>
        <div className="no-scrollbar flex h-[64vh] max-h-[34rem] snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--shell-x)] pb-4">
          {panels.map((panel) => (
            <PanelCard key={panel.key} panel={panel} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Signature looks" className="relative bg-ink text-ivory">
      <div
        ref={targetRef}
        className="relative"
        style={{ height: distance > 0 ? `calc(100vh + ${distance}px)` : '100vh' }}
      >
        <div className="grain sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="shrink-0 px-[var(--shell-x)] pt-[calc(var(--shell-x)+2rem)]">
            <SectionHeading index="05" eyebrow="Signature looks" title="A studio," accent="in full." tone="light" />
          </div>
          <div className="flex min-h-0 flex-1 items-center pb-10">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex h-full max-h-[30rem] gap-6 pl-[var(--shell-x)] pr-[14vw] will-change-transform"
            >
              {panels.map((panel) => (
                <PanelCard key={panel.key} panel={panel} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
