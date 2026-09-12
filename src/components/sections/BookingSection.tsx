import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'
import { serviceOptions } from '../../data/services'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

/**
 * The site is a static build, so there is no server to post to and nothing
 * here pretends otherwise.
 *
 * • Leave FORM_ENDPOINT empty and the form hands the enquiry to WhatsApp with
 *   every field pre-filled — genuinely working, no backend required.
 * • Drop in a form service URL (Formspree, Basin, Netlify Forms, your own API)
 *   and the same form posts to it instead. That is the only change needed.
 */
const FORM_ENDPOINT = ''

type Status = 'idle' | 'sending' | 'handoff' | 'sent' | 'error'

const fieldClass =
  'w-full border-b border-ink/20 bg-transparent px-0 py-3 text-[0.98rem] text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-gold focus:outline-none'

const labelClass = 'eyebrow block text-ink/50'

export function BookingSection() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const get = (key: string) => String(data.get(key) ?? '').trim()

    const enquiry = [
      `Appointment enquiry — ${site.name}`,
      `Name: ${get('name')}`,
      `Phone: ${get('phone')}`,
      `Service: ${get('service')}`,
      get('date') && `Preferred date: ${get('date')}`,
      get('message') && `Message: ${get('message')}`,
    ]
      .filter(Boolean)
      .join('\n')

    if (!FORM_ENDPOINT) {
      setStatus('handoff')
      window.open(`${site.whatsappHref}?text=${encodeURIComponent(enquiry)}`, '_blank', 'noopener')
      form.reset()
      return
    }

    try {
      setStatus('sending')
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ivory py-section">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* ── Details ───────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <SectionHeading index="07" eyebrow="Bookings" title="Book your" accent="appointment." />

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-[1rem] leading-relaxed text-ink/65">
              Bridal dates fill up early in the season — the sooner you call, the more of the morning we can
              hold for you.
            </p>
          </Reveal>

          <div className="mt-12 space-y-8">
            <Reveal delay={0.1}>
              <p className={labelClass}>Studio</p>
              <p className="mt-3 flex items-start gap-3 font-display text-2xl text-ink">
                <MapPin aria-hidden="true" className="mt-2 h-4 w-4 shrink-0 text-gold-deep" />
                <span>
                  {site.name}
                  <span className="mt-1 block text-lg text-ink/60">
                    {site.address.area}, {site.address.landmark}
                  </span>
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className={labelClass}>Call or WhatsApp</p>
              <a
                href={site.phoneHref}
                className="link-underline mt-3 inline-flex items-center gap-3 font-display text-3xl text-wine"
              >
                <Phone aria-hidden="true" className="h-5 w-5 text-gold-deep" />
                {site.phone}
              </a>
            </Reveal>

            <Reveal delay={0.22}>
              <p className={labelClass}>Instagram</p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline mt-3 inline-flex items-center gap-3 text-lg tracking-[0.06em] text-ink/75"
              >
                <Instagram aria-hidden="true" className="h-4 w-4 text-gold-deep" />
                {site.instagram.handle.toLowerCase()}
              </a>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="border-t border-ink/10 pt-6 text-[0.85rem] leading-relaxed text-ink/50">
                {site.note}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Form ──────────────────────────────────────────── */}
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="relative bg-cream p-[clamp(1.5rem,4vw,3rem)]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold/25" />

            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    pattern="[0-9+\s-]{8,16}"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service
                  </label>
                  <select id="service" name="service" defaultValue={serviceOptions[8]} className={cn(fieldClass, 'appearance-none')}>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className={labelClass}>
                    Preferred date
                  </label>
                  <input id="date" name="date" type="date" className={fieldClass} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Anything we should know — timings, function, number of people"
                  className={cn(fieldClass, 'resize-none')}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Button type="submit" variant="solid" magnetic={false} withArrow>
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </Button>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-wine"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4 text-gold-deep" />
                  WhatsApp instead
                </a>
              </div>

              <p aria-live="polite" className="min-h-[1.5rem]">
                <AnimatePresence mode="wait">
                  {status !== 'idle' && status !== 'sending' && (
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={cn(
                        'block text-[0.88rem] leading-relaxed',
                        status === 'error' ? 'text-rouge' : 'text-ink/60',
                      )}
                    >
                      {status === 'handoff' &&
                        `Your enquiry is ready in WhatsApp — press send there and we'll reply on ${site.phone}.`}
                      {status === 'sent' && 'Thank you — your enquiry has been received. We will call you back shortly.'}
                      {status === 'error' &&
                        `That did not go through. Please call or WhatsApp us on ${site.phone} instead.`}
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
