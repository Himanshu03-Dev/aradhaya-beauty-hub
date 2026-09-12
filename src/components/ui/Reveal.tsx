import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

/** Fades and lifts its children the first time they enter the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -10% 0px' }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

type RevealTextProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/**
 * Editorial headline reveal: each word rides up from behind a mask.
 * Renders as one accessible string — the split is presentational only.
 */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  as: Tag = 'h2',
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
            <motion.span
              className={cn('inline-block', wordClassName)}
              initial={reduced ? undefined : { y: '110%', opacity: 0 }}
              animate={reduced ? undefined : inView ? { y: '0%', opacity: 1 } : undefined}
              transition={{ duration: 1, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
