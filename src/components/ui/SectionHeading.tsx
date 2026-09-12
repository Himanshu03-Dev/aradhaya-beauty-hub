import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal, RevealText } from './Reveal'

type SectionHeadingProps = {
  index?: string
  eyebrow: string
  title: string
  /** Trailing words rendered in italic serif for editorial contrast. */
  accent?: string
  children?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  as?: 'h2' | 'h3'
  size?: 'md' | 'lg'
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  children,
  align = 'left',
  tone = 'dark',
  as = 'h2',
  size = 'md',
  className,
}: SectionHeadingProps) {
  const scale = size === 'lg' ? 'text-display-lg' : 'text-display-md'
  const muted = tone === 'dark' ? 'text-ink/55' : 'text-champagne/60'
  const strong = tone === 'dark' ? 'text-ink' : 'text-ivory'

  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal className={cn('flex items-center gap-4', align === 'center' && 'justify-center')}>
        {index && <span className={cn('eyebrow text-gold')}>{index}</span>}
        <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
        <span className={cn('eyebrow', muted)}>{eyebrow}</span>
      </Reveal>

      <RevealText
        as={as}
        text={title}
        delay={0.08}
        className={cn('mt-6', scale, strong)}
      />

      {accent && (
        <RevealText
          as="span"
          text={accent}
          delay={0.18}
          className={cn('block font-display italic text-gold-gradient', scale)}
        />
      )}

      {children && (
        <Reveal delay={0.24} className={cn('mt-7 max-w-xl text-[1.02rem] leading-relaxed', align === 'center' && 'mx-auto', tone === 'dark' ? 'text-ink/65' : 'text-champagne/70')}>
          {children}
        </Reveal>
      )}
    </div>
  )
}
