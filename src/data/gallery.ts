/**
 * Editorial lookbook. A deliberately varied set — different faces, different
 * crops (portrait, landscape, close-up) — so the masonry reads like a beauty
 * magazine rather than one repeated shoot. These are licensed editorial /
 * campaign visuals, not photographs of real Aradhaya Beauty Hub customers.
 *
 * Self-contained (its own files) so the lookbook can be curated independently
 * of the campaign slots in `images.ts`.
 */
const base = import.meta.env.BASE_URL
const g = (file: string) => `${base}images/${file}`

export const galleryCategories = ['Bridal', 'Glam', 'Makeup', 'Editorial', 'Details'] as const
export type GalleryCategory = (typeof galleryCategories)[number]

export type GalleryImage = {
  id: string
  src: string
  small: string
  width: number
  height: number
  alt: string
  caption: string
  category: GalleryCategory
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'bride-1',
    src: g('g-bride-1.jpg'),
    small: g('g-bride-1-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Bridal',
    caption: 'Kundan & rose',
    alt: 'Indian bride in soft-glam bridal makeup, kundan jewellery and a pink dupatta',
  },
  {
    id: 'eye-1',
    src: g('g-eye-1.jpg'),
    small: g('g-eye-1-720.jpg'),
    width: 1200,
    height: 800,
    category: 'Makeup',
    caption: 'Winged & warm',
    alt: 'Close-up of an eye with a warm smoky lid and a winged liner',
  },
  {
    id: 'bride-2',
    src: g('g-bride-2.jpg'),
    small: g('g-bride-2-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Bridal',
    caption: 'Magenta drape',
    alt: 'Profile of a bride in magenta with layered gold jewellery',
  },
  {
    id: 'glam-2',
    src: g('g-glam-2.jpg'),
    small: g('g-glam-2-720.jpg'),
    width: 1200,
    height: 900,
    category: 'Glam',
    caption: 'A radiant smile',
    alt: 'A smiling model in polished party makeup and kundan jewellery',
  },
  {
    id: 'bride-3',
    src: g('g-bride-3.jpg'),
    small: g('g-bride-3-720.jpg'),
    width: 900,
    height: 1200,
    category: 'Bridal',
    caption: 'Regal in red',
    alt: 'Bride seated in a red and emerald bridal ensemble with heavy jewellery',
  },
  {
    id: 'edit-1',
    src: g('g-edit-1.jpg'),
    small: g('g-edit-1-720.jpg'),
    width: 1200,
    height: 800,
    category: 'Editorial',
    caption: 'The veil',
    alt: 'Editorial portrait of a woman with a bindi, eyes framed by a veil',
  },
  {
    id: 'eye-3',
    src: g('g-eye-3.jpg'),
    small: g('g-eye-3-720.jpg'),
    width: 1000,
    height: 1000,
    category: 'Makeup',
    caption: 'Rose-gold eye',
    alt: 'Macro close-up of a rose-gold shimmer eyeshadow',
  },
  {
    id: 'bride-4',
    src: g('g-bride-4.jpg'),
    small: g('g-bride-4-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Bridal',
    caption: 'Behind the veil',
    alt: 'Bride in a red veil raising a mehndi-covered hand',
  },
  {
    id: 'glam-1',
    src: g('g-glam-1.jpg'),
    small: g('g-glam-1-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Glam',
    caption: 'Party glam',
    alt: 'Model in glam makeup with a nose ring and gold jewellery',
  },
  {
    id: 'eye-2',
    src: g('g-eye-2.jpg'),
    small: g('g-eye-2-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Makeup',
    caption: 'In the chair',
    alt: 'A makeup artist blending eyeshadow onto a client',
  },
  {
    id: 'bride-5',
    src: g('g-bride-5.jpg'),
    small: g('g-bride-5-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Bridal',
    caption: 'Golden hour',
    alt: 'Bride front-on in gold jewellery and a bright bridal look',
  },
  {
    id: 'mehndi',
    src: g('detail-mehndi.webp'),
    small: g('detail-mehndi-480.webp'),
    width: 800,
    height: 1191,
    category: 'Details',
    caption: 'Mehndi & bangles',
    alt: 'Mehndi-covered hand and forearm stacked with gold and magenta bangles',
  },
  {
    id: 'edit-2',
    src: g('g-edit-2.jpg'),
    small: g('g-edit-2-720.jpg'),
    width: 1000,
    height: 1250,
    category: 'Editorial',
    caption: 'Modern muse',
    alt: 'Moody fashion-editorial beauty portrait',
  },
  {
    id: 'bride-6',
    src: g('g-bride-6.jpg'),
    small: g('g-bride-6-720.jpg'),
    width: 900,
    height: 1200,
    category: 'Bridal',
    caption: 'Silk & bangles',
    alt: 'Bride in a red embroidered lehenga with stacked bangles',
  },
  {
    id: 'hand',
    src: g('g-hand.jpg'),
    small: g('g-hand-720.jpg'),
    width: 1000,
    height: 1000,
    category: 'Details',
    caption: 'Gilded detail',
    alt: 'A hand lifted to the face showing a gold ring and warm light',
  },
]
