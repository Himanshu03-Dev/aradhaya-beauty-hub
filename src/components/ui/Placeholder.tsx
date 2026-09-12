import { cn } from '../../lib/cn'

type PlaceholderProps = {
  index: string
  title: string
  className?: string
  tone?: 'wine' | 'cream'
}

/**
 * Designed stand-in for services we do not yet have photography for.
 * Drop a real photograph into `data/images.ts`, point the service at it, and
 * this disappears — nothing else needs to change.
 */
export function Placeholder({ index, title, className, tone = 'wine' }: PlaceholderProps) {
  const dark = tone === 'wine'
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        dark ? 'bg-wine-deep text-champagne' : 'bg-cream text-ink',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(120% 90% at 20% 0%, rgba(194,155,84,0.30), transparent 62%), radial-gradient(90% 80% at 100% 100%, rgba(168,25,78,0.42), transparent 60%)'
            : 'radial-gradient(120% 90% at 15% 0%, rgba(194,155,84,0.28), transparent 60%), radial-gradient(90% 80% at 100% 100%, rgba(223,208,188,0.9), transparent 60%)',
        }}
      />
      <svg
        className={cn('absolute inset-0 h-full w-full', dark ? 'text-gold/25' : 'text-gold/30')}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`lattice-${index}`} width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M17 1 L33 17 L17 33 L1 17 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#lattice-${index})`} />
      </svg>

      <span
        className={cn(
          'pointer-events-none select-none font-display text-[7rem] leading-none sm:text-[9rem]',
          dark ? 'text-champagne/15' : 'text-wine/10',
        )}
      >
        {index}
      </span>

      <span className="absolute inset-x-0 bottom-6 text-center font-display text-xl italic opacity-70">
        {title}
      </span>

      <span
        aria-hidden="true"
        className={cn('absolute inset-4 border', dark ? 'border-gold/25' : 'border-gold/30')}
      />
    </div>
  )
}
