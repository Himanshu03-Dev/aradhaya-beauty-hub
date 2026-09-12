import type { ImageKey } from './images'

export type Service = {
  id: string
  index: string
  title: string
  /** Short line used in lists and the booking form. */
  summary: string
  description: string
  /** Omit to render the designed placeholder plate instead of a photograph. */
  image?: ImageKey
  /** Small detail lines shown on hover / expand. */
  notes: string[]
  featured?: boolean
}

export const services: Service[] = [
  {
    id: 'hair-spa',
    index: '01',
    title: 'Hair Spa',
    summary: 'Nourish, repair and shine',
    description:
      'A slow conditioning ritual — massage, steam and a treatment mask chosen for your scalp. Best booked a few days before an event, when hair still has time to settle.',
    image: 'hairImage',
    notes: ['Scalp massage', 'Steam & mask', 'Blow-dry finish'],
  },
  {
    id: 'manicure',
    index: '02',
    title: 'Manicure',
    summary: 'Beautiful nails, perfect you',
    description:
      'Shaping, cuticle care and a soak that leaves hands soft enough for close-up photographs. Finished with polish in the shade you bring or one from our counter.',
    image: 'nailsImage',
    notes: ['Shape & buff', 'Cuticle care', 'Polish of your choice'],
  },
  {
    id: 'pedicure',
    index: '03',
    title: 'Pedicure',
    summary: 'Relax, refresh, rejuvenate',
    description:
      'A warm soak, exfoliation and a long foot and calf massage. The service most brides thank themselves for after a full day of standing.',
    image: 'nailsImage',
    notes: ['Warm soak', 'Exfoliation', 'Massage & polish'],
  },
  {
    id: 'facial',
    index: '04',
    title: 'Facial',
    summary: 'Glow naturally, feel beautiful',
    description:
      'Cleansing, exfoliation, extraction where needed and a mask matched to your skin that day. We keep the products in view so you always know what is going on your face.',
    image: 'facialImage',
    notes: ['Skin-matched products', 'Clean-up included', 'Calming finish'],
    featured: true,
  },
  {
    id: 'haircutting',
    index: '05',
    title: 'Haircutting',
    summary: 'Style that defines you',
    description:
      'Cuts, layers, fringes and shaping — discussed properly before scissors are picked up, and cut to fall the way you actually wear your hair.',
    image: 'hairImage',
    notes: ['Consultation first', 'Layers & fringe', 'Styling'],
  },
  {
    id: 'mehndi',
    index: '06',
    title: 'Mehndi',
    summary: 'Beautiful designs for every occasion',
    description:
      'From a light festival motif to full bridal hands and feet. Traditional Rajasthani and Indo-Arabic patterns drawn freehand, with paste mixed fresh on the day.',
    image: 'mehndiImage',
    notes: ['Freehand design', 'Bridal & festival', 'Fresh paste'],
    featured: true,
  },
  {
    id: 'wax',
    index: '07',
    title: 'Wax',
    summary: 'Smooth skin, silky confidence',
    description:
      'Full-body and part waxing with disposable spatulas and a fresh strip for every pass. Threading for eyebrows, forehead and upper lips is done in the same sitting.',
    image: 'facialImage',
    notes: ['Hygienic, single-use', 'Threading available', 'Soothing after-care'],
  },
  {
    id: 'makeup',
    index: '08',
    title: 'Party Makeup',
    summary: 'Enhance your beauty for every occasion',
    description:
      'Engagement, sangeet, reception or a family function — a lighter, camera-friendly face built to last the evening without a touch-up bag.',
    image: 'artistryCloseup',
    notes: ['Camera-friendly', 'Long wear', 'Hair styling add-on'],
  },
  {
    id: 'bridal-makeup',
    index: '09',
    title: 'Bridal Makeup',
    summary: 'The complete bridal look',
    description:
      'Base, eyes, drape, jewellery setting and hair — planned around your lehenga, your jewellery and the light you will be photographed in. Mehndi can be booked alongside.',
    image: 'heroImage',
    notes: ['Full bridal look', 'Draping & hair', 'Mehndi can be added'],
    featured: true,
  },
]

export const serviceOptions = services.map((s) => s.title)
