/**
 * Promotional content, kept as data so a campaign can be swapped or switched
 * off without touching a single component. Set `active: false` (or empty the
 * array) and the offer section removes itself from the page.
 */
export type Offer = {
  id: string
  active: boolean
  eyebrow: string
  headline: string
  subject: string
  /** Complimentary add-ons included with the offer. */
  includes: string[]
  terms: string
  ctaLabel: string
}

export const offers: Offer[] = [
  {
    id: 'teej-facial',
    active: true,
    eyebrow: 'Teej Special',
    headline: '20% Off',
    subject: 'on any facial',
    includes: ['Eyebrow', 'Forehead', 'Upper Lips'],
    terms: 'Complimentary with every facial booked during the offer period.',
    ctaLabel: 'Claim this offer',
  },
]

export const activeOffer: Offer | null = offers.find((offer) => offer.active) ?? null
