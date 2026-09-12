import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ImageAsset } from '../../data/images'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

type MediaProps = {
  image: ImageAsset
  className?: string
  imgClassName?: string
  /** Above-the-fold images skip lazy loading and decode eagerly. */
  priority?: boolean
  /** Vertical drift, in pixels, across the element's scroll range. */
  parallax?: number
  /** Wipe the image in from the bottom when it enters view. */
  reveal?: boolean
  sizes?: string
  cursor?: string
  /** Short label shown on the brand plate when the slot has no photograph yet. */
  plateLabel?: string
  plateTone?: 'wine' | 'cream'
  children?: ReactNode
}

/**
 * Designed stand-in shown while a slot is awaiting original photography
 * (`image.ready === false`). Never a broken image, never a borrowed poster —
 * an on-brand plate that vanishes the moment a real file is dropped in.
 */
function BrandPlate({ label, tone = 'wine' }: { label?: string; tone?: 'wine' | 'cream' }) {
  const dark = tone === 'wine'
  const id = label ? label.replace(/\W+/g, '') : 'plate'
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 flex items-center justify-center overflow-hidden',
        dark ? 'bg-wine-deep text-champagne' : 'bg-cream text-ink',
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(120% 90% at 20% 0%, rgba(194,155,84,0.30), transparent 62%), radial-gradient(90% 80% at 100% 100%, rgba(168,25,78,0.42), transparent 60%)'
            : 'radial-gradient(120% 90% at 15% 0%, rgba(194,155,84,0.28), transparent 60%), radial-gradient(90% 80% at 100% 100%, rgba(223,208,188,0.9), transparent 60%)',
        }}
      />
      <svg className={cn('absolute inset-0 h-full w-full', dark ? 'text-gold/25' : 'text-gold/30')}>
        <defs>
          <pattern id={`plate-${id}`} width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M17 1 L33 17 L17 33 L1 17 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#plate-${id})`} />
      </svg>
      <span aria-hidden="true" className={cn('absolute inset-4 border', dark ? 'border-gold/25' : 'border-gold/30')} />
      <span className="relative px-6 text-center">
        <span className={cn('eyebrow block', dark ? 'text-gold-light/80' : 'text-gold-deep/80')}>Aradhaya</span>
        {label && <span className="mt-2 block font-display text-xl italic opacity-80">{label}</span>}
      </span>
    </div>
  )
}

/**
 * One image primitive for the whole site: art-directed sources, correct
 * intrinsic sizing (so nothing distorts or shifts), optional scroll parallax
 * and an optional mask reveal.
 */
export function Media({
  image,
  className,
  imgClassName,
  priority = false,
  parallax = 0,
  reveal = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  cursor,
  plateLabel,
  plateTone,
  children,
}: MediaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = parallax && !reduced ? parallax : 0
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  return (
    <motion.div
      ref={ref}
      data-cursor={image.ready ? cursor : undefined}
      className={cn('relative overflow-hidden bg-cream', className)}
      initial={reveal && !reduced ? { clipPath: 'inset(100% 0% 0% 0%)' } : undefined}
      whileInView={reveal && !reduced ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {image.ready ? (
        <motion.div style={drift ? { y } : undefined} className="h-full w-full">
          <picture className="block h-full w-full">
            {/* No explicit type: the browser sniffs the format, so the registry
                can mix webp and jpg sources freely. */}
            {image.small && <source media="(max-width: 768px)" srcSet={image.small} />}
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              decoding={priority ? 'sync' : 'async'}
              className={cn('h-full w-full object-cover', drift && 'scale-[1.12]', imgClassName)}
            />
          </picture>
        </motion.div>
      ) : (
        <BrandPlate label={plateLabel} tone={plateTone} />
      )}
      {children}
    </motion.div>
  )
}
