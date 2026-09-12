import { Check } from 'lucide-react'
import { activeOffer } from '../../data/offers'
import { images } from '../../data/images'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'
import { Reveal } from '../ui/Reveal'

/**
 * Reads entirely from `data/offers.ts`. With no active offer the section
 * removes itself, so a campaign can be retired without a code change.
 */
export function OfferSection() {
  if (!activeOffer) return null
  const offer = activeOffer

  return (
    <section aria-label={`${offer.eyebrow} offer`} className="relative bg-cream py-section">
      <div className="shell">
        <Reveal>
          <div className="grain relative isolate overflow-hidden bg-wine-deep text-ivory">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  'radial-gradient(60% 70% at 85% 10%, rgba(168,25,78,0.6), transparent 62%), radial-gradient(50% 60% at 0% 100%, rgba(194,155,84,0.22), transparent 60%)',
              }}
            />

            <div className="grid items-stretch lg:grid-cols-12">
              <div className="relative order-2 min-h-[18rem] lg:order-1 lg:col-span-4">
                <Media
                  image={images.offerImage}
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="h-full w-full"
                  imgClassName="object-cover object-top"
                  plateLabel={offer.eyebrow}
                />
                {/* Original campaign treatment, drawn in-page — not a pasted poster.
                    An oversized discount numeral, a gold rule and the season label,
                    composited over the image/plate so the slot reads as designed art. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex flex-col justify-end p-7 lg:p-9"
                >
                  <span className="font-display text-[7rem] leading-[0.75] text-champagne/10 lg:text-[9rem]">
                    %
                  </span>
                  <span className="mt-3 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
                  <span className="mt-3 font-display text-2xl italic text-champagne/70">
                    {offer.subject}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-wine-deep/10 lg:to-wine-deep"
                />
              </div>

              <div className="order-1 px-[clamp(1.5rem,5vw,4.5rem)] py-14 lg:order-2 lg:col-span-8 lg:py-20">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-10 bg-gold" />
                  <span className="eyebrow text-gold">{offer.eyebrow}</span>
                </div>

                <p className="mt-7 font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] text-gold-gradient">
                  {offer.headline}
                </p>
                <p className="mt-2 font-display text-display-sm italic text-champagne/90">{offer.subject}</p>

                <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                  <div>
                    <p className="eyebrow text-champagne/55">Included free</p>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                      {offer.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[0.95rem] text-champagne/90">
                          <Check aria-hidden="true" className="h-4 w-4 text-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-8 max-w-md text-[0.9rem] leading-relaxed text-champagne/55">{offer.terms}</p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href="#contact" variant="light" withArrow>
                    {offer.ctaLabel}
                  </Button>
                  <a
                    href={site.phoneHref}
                    className="link-underline text-[0.8rem] uppercase tracking-[0.18em] text-champagne/70 hover:text-gold"
                  >
                    Or call {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
