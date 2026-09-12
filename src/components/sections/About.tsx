import { images } from '../../data/images'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Media } from '../ui/Media'
import { Button } from '../ui/Button'

const principles = [
  {
    index: '01',
    title: 'Hygiene, visibly',
    body: 'Single-use spatulas and strips, tools cleaned between clients, and products kept in view so you always know what is being used on your skin.',
  },
  {
    index: '02',
    title: 'Time, not turnover',
    body: 'Bridal and mehndi work is booked with room around it. Nothing is rushed to fit another chair in.',
  },
  {
    index: '03',
    title: 'A room of your own',
    body: 'The studio is women only — an unhurried, private space to get ready in, whether it is a wedding morning or a Tuesday facial.',
  },
]

export function About() {
  return (
    <section id="about" className="grain relative overflow-hidden bg-ivory py-section">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[22vw] leading-none text-ink/[0.035] lg:top-10"
      >
        Aradhaya
      </span>

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* ── Imagery ───────────────────────────────────────── */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-[24rem] lg:max-w-none">
            <Media
              image={images.salonComposition}
              reveal
              parallax={22}
              sizes="(max-width: 1024px) 80vw, 34vw"
              className="aspect-[4/5] w-full"
              plateLabel="The Studio"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-ivory/30" />

            <div className="absolute -bottom-10 right-0 w-32 border-4 border-ivory shadow-[0_24px_60px_-32px_rgba(54,10,28,0.6)] sm:w-44 lg:-right-10">
              <Media image={images.detailMaang} sizes="180px" reveal className="aspect-square" />
            </div>

            <div className="absolute -left-3 top-8 hidden lg:block">
              <span className="writing-vertical eyebrow text-ink/35">The Studio · M.P. Nagar</span>
            </div>
          </div>
        </div>

        {/* ── Copy ──────────────────────────────────────────── */}
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading index="01" eyebrow="About the studio" title="Beauty crafted" accent="with intention." />

          <Reveal delay={0.22} className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ink/70">
            <p>
              Aradhaya Beauty Hub is a small studio in {site.address.area}, {site.address.landmark.toLowerCase()}.
              What began as a neighbourhood parlour now handles full bridal mornings — makeup, drape, hair and
              mehndi — alongside the facials, threading and haircuts people come back for month after month.
            </p>
            <p>
              The counter at the front carries cosmetics, bangles, chudiya and jewellery, so a look can be
              finished in one place rather than assembled across three shops. It is a practical studio run with
              an eye for detail, and that is exactly how the work is done.
            </p>
          </Reveal>

          <div className="mt-12 space-y-px">
            {principles.map((principle, i) => (
              <Reveal key={principle.index} delay={0.1 + i * 0.08}>
                <div className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-ink/10 py-6 transition-colors duration-500 hover:border-gold/60">
                  <span className="font-display text-2xl text-gold-deep/70 transition-colors duration-500 group-hover:text-gold">
                    {principle.index}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink">{principle.title}</h3>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink/60">{principle.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <Button href="#bridal" variant="outline" withArrow>
              See the bridal work
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
