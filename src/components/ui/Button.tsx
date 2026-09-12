import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Magnetic } from './Magnetic'

type Variant = 'solid' | 'outline' | 'light' | 'ghost'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  withArrow?: boolean
  magnetic?: boolean
}

type ButtonProps = CommonProps & {
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
  external?: boolean
}

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ease-silk sm:px-9'

const variants: Record<Variant, string> = {
  solid: 'bg-wine text-champagne hover:text-ivory',
  outline: 'border border-ink/25 text-ink hover:text-ivory',
  light: 'border border-champagne/35 text-champagne hover:text-wine-deep',
  ghost: 'text-ink/70 hover:text-wine',
}

const fills: Record<Variant, string> = {
  solid: 'bg-wine-light',
  outline: 'bg-ink',
  light: 'bg-champagne',
  ghost: 'bg-transparent',
}

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  className,
  withArrow = false,
  magnetic = true,
  ariaLabel,
  external = false,
}: ButtonProps) {
  const content = (
    <>
      {/* Curtain fill that wipes up on hover */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-silk group-hover:scale-y-100 group-focus-visible:scale-y-100',
          fills[variant],
        )}
      />
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {withArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )

  const classes = cn(base, variants[variant], className)

  const element = href ? (
    <a
      href={href}
      aria-label={ariaLabel}
      data-cursor="open"
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {content}
    </a>
  ) : (
    <button type={type} onClick={onClick} aria-label={ariaLabel} data-cursor="open" className={classes}>
      {content}
    </button>
  )

  return magnetic ? <Magnetic className="inline-flex">{element}</Magnetic> : element
}
