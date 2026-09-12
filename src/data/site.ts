/**
 * Single source of truth for business information.
 * Every value below is taken from the studio's own printed material.
 */
export const site = {
  name: 'Aradhaya Beauty Hub',
  nameLine1: 'Aradhaya',
  nameLine2: 'Beauty Hub',
  tagline: 'Look Beautiful. Feel Confident.',
  intro:
    'A women-only beauty studio in M.P. Nagar, Etah where bridal artistry, mehndi and everyday beauty care are practised with the same patience.',
  phone: '9058093532',
  phoneHref: 'tel:+919058093532',
  /** The printed material lists this number for calls and WhatsApp alike. */
  whatsappHref: 'https://wa.me/919058093532',
  instagram: {
    handle: '@_ARADHAYA_BEAUTY_HUB',
    /** Derived from the handle on the studio's Instagram QR card — verify before publishing. */
    url: 'https://www.instagram.com/_aradhaya_beauty_hub/',
  },
  address: {
    area: 'M.P. Nagar',
    landmark: 'Near Om Guest House',
    city: 'Etah',
    state: 'Uttar Pradesh',
    postalCode: '207001',
    /** Used in the hero strip, where the line has to stay short. */
    short: 'M.P. Nagar, Near Om Guest House, Etah',
    full: 'M.P. Nagar, Near Om Guest House, Etah, Uttar Pradesh 207001',
  },
  /**
   * Google Maps pin for the Om Guest House landmark the studio sits beside.
   * Visitors navigate to the landmark and the studio confirms the last few
   * steps over WhatsApp.
   */
  mapsUrl: 'https://maps.app.goo.gl/my7vV7SFvbnx8k2r6',
  geo: { latitude: 27.5611147, longitude: 78.6585873 },
  note: 'Studio services are for women only.',
} as const

export type NavItem = { label: string; href: string }

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Bridal', href: '#bridal' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]
