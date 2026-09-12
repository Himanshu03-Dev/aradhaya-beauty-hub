import { Instagram } from 'lucide-react'
import { images } from '../../data/images'
import { galleryImages } from '../../data/gallery'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { Media } from '../ui/Media'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

// A varied feed strip — different faces and looks, not one repeated shoot.
const stripIds = ['bride-1', 'eye-1', 'glam-2', 'bride-3', 'edit-1', 'bride-5', 'glam-1', 'eye-3', 'edit-2', 'bride-2']
const strip = stripIds
  .map((id) => galleryImages.find((image) => image.id === id))
  .filter((image): image is (typeof galleryImages)[number] => Boolean(image))

export function InstagramSection() {
  return (
    <section aria-label="Instagram" className="grain relative overflow-hidden bg-ink py-section text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(55% 50% at 20% 0%, rgba(90,15,43,0.7), transparent 60%), radial-gradient(45% 45% at 90% 100%, rgba(168,25,78,0.35), transparent 62%)',
        }}
      />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading index="07" eyebrow="Instagram" title="Follow our" accent="beauty journal." tone="light" />

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-[1rem] leading-relaxed text-champagne/65">
              Fresh bridal looks, mehndi designs and what has just landed at the cosmetics counter — posted from
              the studio as the work happens.
            </p>
          </Reveal>

          <Reveal delay={0.26} className="mt-8">
            <p className="font-display text-[clamp(1.4rem,3.4vw,2.4rem)] tracking-[0.06em] text-champagne">
              {site.instagram.handle.toLowerCase()}
            </p>
          </Reveal>

          <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={site.instagram.url} external variant="light" withArrow>
              <span className="inline-flex items-center gap-2">
                <Instagram aria-hidden="true" className="h-4 w-4" />
                Visit Instagram
              </span>
            </Button>
            <span className="text-[0.75rem] uppercase tracking-[0.18em] text-champagne/45">
              Or scan the code
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto max-w-[24rem] lg:max-w-none">
            <Media
              image={images.instagramImage}
              reveal
              parallax={24}
              sizes="(max-width: 1024px) 80vw, 34vw"
              className="aspect-[4/5] w-full rounded-t-[9rem]"
              cursor="view"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-t-[8rem] border border-champagne/15" />

            {/* QR card, overlapping the corner */}
            <div className="absolute -bottom-6 -left-4 w-32 border border-champagne/20 bg-wine-deep/80 p-3 backdrop-blur-md sm:w-40 lg:-left-10">
              <Media image={images.instagramQr} sizes="160px" className="w-full" />
              <p className="mt-2 text-center text-[0.6rem] uppercase tracking-[0.18em] text-champagne/60">
                Scan to follow
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-16 flex gap-4 overflow-hidden">
        <div className="flex animate-marquee gap-4 pr-4 motion-reduce:animate-none">
          {[...strip, ...strip].map((image, i) => (
            <div key={i} className="h-40 w-32 shrink-0 overflow-hidden sm:h-52 sm:w-44" aria-hidden={i >= strip.length}>
              <img
                src={image.small ?? image.src}
                alt={i < strip.length ? image.alt : ''}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
