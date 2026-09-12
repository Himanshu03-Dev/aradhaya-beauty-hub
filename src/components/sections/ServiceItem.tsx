import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Service } from '../../data/services'
import { images } from '../../data/images'
import { Placeholder } from '../ui/Placeholder'
import { cn } from '../../lib/cn'

type ServiceItemProps = {
  service: Service
  active: boolean
  isDesktop: boolean
  onActivate: () => void
  onToggle: () => void
}

export function ServiceItem({ service, active, isDesktop, onActivate, onToggle }: ServiceItemProps) {
  return (
    <li
      className={cn(
        'group relative border-b border-ink/[0.12] transition-colors duration-500',
        active && 'border-gold/60',
      )}
      onMouseEnter={isDesktop ? onActivate : undefined}
      onFocus={isDesktop ? onActivate : undefined}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={active}
        data-cursor={isDesktop ? 'view' : undefined}
        className="flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-8"
      >
        <motion.span
          animate={{ y: active ? -4 : 0, color: active ? '#C29B54' : 'rgba(20,13,16,0.35)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-lg sm:text-xl"
        >
          {service.index}
        </motion.span>

        <span className="min-w-0 flex-1">
          <motion.span
            animate={{ x: active && isDesktop ? 14 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'block font-display text-[2rem] leading-tight transition-colors duration-500 sm:text-[2.6rem] lg:text-[3.1rem]',
              active ? 'text-wine' : 'text-ink',
            )}
          >
            {service.title}
          </motion.span>
        </span>

        <span className="hidden max-w-[16rem] text-right text-[0.72rem] uppercase tracking-[0.18em] text-ink/45 lg:block">
          {service.summary}
        </span>

        <motion.span
          animate={{ rotate: active ? 135 : 0, borderColor: active ? 'rgba(194,155,84,0.9)' : 'rgba(20,13,16,0.18)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:h-11 sm:w-11"
        >
          <Plus aria-hidden="true" className={cn('h-4 w-4', active ? 'text-gold' : 'text-ink/50')} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 pl-10 pr-2 sm:pl-16 lg:grid-cols-[1fr_auto] lg:items-end lg:pl-24">
              {/* Inline visual — shown on touch layouts, where there is no
                  cursor-tracked preview. Desktop keeps the floating preview. */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-gold/25 lg:hidden">
                {service.image && images[service.image].ready ? (
                  <img
                    src={images[service.image].small ?? images[service.image].src}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Placeholder index={service.index} title={service.title} />
                )}
              </div>
              <p className="max-w-xl text-[0.98rem] leading-relaxed text-ink/65">{service.description}</p>
              <ul className="flex flex-wrap gap-2">
                {service.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-full border border-gold/40 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-ink/55"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
