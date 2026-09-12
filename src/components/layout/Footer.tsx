import { Instagram, MapPin, Phone } from 'lucide-react'
import { navItems, site } from '../../data/site'
import { services } from '../../data/services'
import { Reveal } from '../ui/Reveal'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-champagne/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 10% 0%, rgba(90,15,43,0.55), transparent 62%), radial-gradient(40% 50% at 95% 100%, rgba(194,155,84,0.14), transparent 60%)',
        }}
      />

      <div className="shell relative pb-10 pt-section">
        <Reveal className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-none tracking-[0.06em] text-ivory">
              {site.nameLine1.toUpperCase()}
            </p>
            <p className="eyebrow mt-3 text-gold">{site.nameLine2}</p>
            <p className="mt-7 max-w-xs font-display text-2xl italic text-champagne/80">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow text-champagne/45">Explore</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline text-[0.95rem] hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow text-champagne/45">Services</p>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a href="#services" className="link-underline text-[0.95rem] hover:text-gold">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <p className="eyebrow text-champagne/45">Visit &amp; call</p>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.address.area}
                  <br />
                  {site.address.landmark}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                <a href={site.phoneHref} className="link-underline hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline hover:text-gold"
                >
                  {site.instagram.handle.toLowerCase()}
                </a>
              </li>
            </ul>
          </address>
        </Reveal>

        <div className="mt-16 h-px w-full bg-champagne/[0.12]" />

        <div className="mt-6 flex flex-col gap-3 text-[0.75rem] uppercase tracking-[0.16em] text-champagne/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.note}</p>
          <a href="#home" className="link-underline self-start hover:text-gold sm:self-auto">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
