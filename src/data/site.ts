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
    'A women-only beauty studio in M.P. Nagar where bridal artistry, mehndi and everyday beauty care are practised with the same patience.',
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
    full: 'M.P. Nagar, Near Om Guest House',
  },
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
