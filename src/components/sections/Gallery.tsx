import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { galleryCategories, galleryImages, type GalleryCategory } from '../../data/gallery'
import { lockScroll, unlockScroll } from '../../lib/scrollLock'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Filter = 'All' | GalleryCategory
const filters: Filter[] = ['All', ...galleryCategories]

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [index, setIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const open = index !== null

  const shown = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((item) => item.category === filter)),
    [filter],
  )

  const close = useCallback(() => {
    setIndex(null)
    openerRef.current?.focus()
  }, [])

  const step = useCallback(
    (direction: number) => {
      setIndex((current) => {
        if (current === null) return current
        return (current + direction + shown.length) % shown.length
      })
    },
    [shown.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const lastEl = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          lastEl.focus()
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    lockScroll()
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [open, close, step])

  const current = index === null ? null : shown[index]

  return (
    <section id="gallery" className="grain relative overflow-hidden bg-ivory py-section">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHeading index="06" eyebrow="Selected work" title="The" accent="lookbook." />
          </div>
          <Reveal delay={0.18}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink/60">
              A cross-section of bridal, glam and beauty work. Select any image to view it full screen — arrow
              keys and swipe both work.
            </p>
          </Reveal>
        </div>

        {/* Category filter */}
        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2 sm:gap-3">
          {filters.map((item) => {
            const active = filter === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={cn(
                  'relative rounded-full border px-5 py-2 text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-400',
                  active
                    ? 'border-wine text-champagne'
                    : 'border-ink/15 text-ink/55 hover:border-wine/50 hover:text-wine',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-wine"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {item}
              </button>
            )
          })}
        </Reveal>

        {/* Masonry — remounts per filter so the set re-reveals in a stagger */}
        <div key={filter} className="mt-10 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {shown.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              data-cursor="view"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => {
                openerRef.current = event.currentTarget
                setIndex(i)
              }}
              aria-label={`View: ${item.caption}`}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-cream"
            >
              <img
                src={item.small}
                alt={item.alt}
                width={item.width}
                height={item.height}
                srcSet={`${item.small} 720w, ${item.src} ${item.width}w`}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="h-auto w-full object-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-wine-deep/75 via-wine-deep/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-left opacity-0 transition-all duration-700 ease-silk group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="eyebrow block text-gold-light">{item.category}</span>
                <span className="mt-2 block font-display text-xl text-ivory">{item.caption}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && current && (
          <motion.div
            key="lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[120] flex flex-col bg-ink/[0.96] backdrop-blur-md"
          >
            <div className="flex items-center justify-between px-[var(--shell-x)] py-5">
              <p className="eyebrow text-champagne/70">
                {String((index ?? 0) + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close gallery"
                data-cursor="close"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-colors hover:border-gold hover:text-gold"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
              <motion.img
                key={current.id}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) step(1)
                  if (info.offset.x > 70) step(-1)
                }}
                className="max-h-full max-w-full cursor-grab object-contain active:cursor-grabbing"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-[var(--shell-x)] pb-8">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/25 text-champagne transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <p className="text-center font-display text-lg italic text-champagne/80">{current.caption}</p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/25 text-champagne transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
