/**
 * Centralised image registry — the single place every visual on the site is
 * referenced from. Swapping artwork later is a one-line change here.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ART DIRECTION
 * Aradhaya Beauty Hub reads as a *luxury Indian beauty campaign*, not stock
 * photography. Every slot below carries a `prompt` written to that direction so
 * the collection can be regenerated as one cohesive shoot. See IMAGE_PROMPTS.md
 * for the shared style block, negatives and the drop-in workflow.
 *
 * `ready: false` marks a slot that has no original photograph yet. The UI
 * renders a designed brand plate in its place (never a broken image and never a
 * borrowed poster), so the site is presentable before the shoot lands. Generate
 * the image, drop the file into `public/images/`, flip `ready` to `true`, and
 * the plate is replaced automatically — nothing else changes.
 *
 * Paths are relative to `public/`; `BASE_URL` keeps them correct under the
 * GitHub Pages sub-path. `small` is the ≤768px source, `src` the full size.
 * ─────────────────────────────────────────────────────────────────────────
 */
export type ImageAsset = {
  src: string
  small?: string
  width: number
  height: number
  alt: string
  /** AI art-direction brief for regenerating this exact slot. */
  prompt: string
  /**
   * `true` — an original photograph exists in `public/images/`.
   * `false` — awaiting generation; the UI shows a designed brand plate instead.
   */
  ready: boolean
}

const base = import.meta.env.BASE_URL
const img = (file: string) => `${base}images/${file}`

/**
 * Shared style suffix, appended to every prompt so the collection stays one
 * coherent campaign. Kept here (not in the docs) so a regenerated slot can pull
 * the exact string the site was built against.
 */
export const CAMPAIGN_STYLE =
  'luxury Indian beauty campaign, fashion-editorial photography, cinematic studio lighting, ' +
  'soft warm key light with gentle rim light, shallow depth of field, natural realistic skin ' +
  'texture with visible pores, refined subtle makeup, elegant authentic kundan/gold jewellery, ' +
  'burgundy / wine / champagne / ivory palette, Vogue-India editorial composition, 85mm lens, ' +
  'medium-format quality, colour-graded warm and rich, no text, no logo, no watermark'

export const CAMPAIGN_NEGATIVE =
  'plastic AI skin, waxy over-smoothed skin, extra fingers, deformed hands, malformed jewellery, ' +
  'excessive makeup, cartoon, illustration, 3d render, stock-photo look, oversaturated pink, ' +
  'busy background, harsh flash, distorted face, watermark, text, logo, low resolution'

const registry = {
  /** 1 · Hero — premium Indian bridal makeup portrait. */
  heroImage: {
    src: img('bridal-portrait.webp'),
    small: img('bridal-portrait-720.webp'),
    width: 1200,
    height: 1523,
    ready: true,
    alt: 'Indian bride in soft-glam bridal makeup and kundan jewellery — Aradhaya Beauty Hub',
    prompt:
      'Premium Indian bridal portrait, three-quarter view, a graceful bride in a deep magenta ' +
      'embroidered lehenga and dupatta, soft-glam bridal makeup with luminous skin, kundan maang ' +
      'tikka and layered necklaces, downcast serene expression, warm champagne background bokeh',
  },
  /** 2 · Close-up bridal makeup beauty shot. */
  bridalCloseup: {
    src: img('detail-makeup.webp'),
    small: img('detail-makeup-520.webp'),
    width: 900,
    height: 900,
    ready: true,
    alt: 'Close-up of soft-glam bridal eye makeup with a maang tikka and nose ring',
    prompt:
      'Macro bridal beauty close-up, one eye and cheekbone in frame, softly blended warm-bronze ' +
      'eyeshadow, defined lashes, dewy highlight on the cheekbone, delicate nose ring and tikka ' +
      'catching light, flawless real skin texture, extreme shallow depth of field',
  },
  /** 3 · Elegant Indian bride editorial portrait (full length). */
  editorialPortrait: {
    src: img('bridal-full.webp'),
    small: img('bridal-full-720.webp'),
    width: 1200,
    height: 1523,
    ready: true,
    alt: 'Full-length editorial portrait of a bride in an embroidered magenta lehenga and dupatta',
    prompt:
      'Full-length editorial portrait of an Indian bride, standing poised against a warm ivory ' +
      'studio backdrop, embroidered magenta lehenga with gold zari, dupatta draped over the head, ' +
      'elegant fashion-editorial pose, cinematic soft light, generous negative space above',
  },
  /** 4 · Luxury makeup artistry close-up (jewellery + eyes from above). */
  artistryCloseup: {
    src: img('detail-eyes.webp'),
    small: img('detail-eyes-560.webp'),
    width: 900,
    height: 960,
    ready: true,
    alt: 'Bridal makeup and layered kundan necklaces photographed from above',
    prompt:
      'Overhead luxury beauty detail, a bride reclining, layered kundan and pearl necklaces across ' +
      'the collarbone, soft-glam eye makeup, warm gold highlights, rich wine drape, editorial ' +
      'jewellery-campaign framing, shallow depth of field',
  },
  /** 5 · Hair styling / hair spa visual. */
  hairImage: {
    src: img('hair-spa.jpg'),
    small: img('hair-spa-720.jpg'),
    width: 1000,
    height: 1250,
    ready: true,
    alt: 'Glossy styled hair after a nourishing hair-spa and blow-dry',
    prompt:
      'Luxury hair campaign, back-three-quarter view of long healthy dark Indian hair in soft ' +
      'glossy waves with a fresh blow-dry finish, a hand gently lifting a strand, warm salon light, ' +
      'champagne background, editorial hair-care advertisement, natural realistic hair texture',
  },
  /** 6 · Facial / skincare beauty visual. */
  facialImage: {
    src: img('facial.jpg'),
    small: img('facial-720.jpg'),
    width: 1000,
    height: 1250,
    ready: true,
    alt: 'Serene skincare beauty portrait with luminous, healthy skin',
    prompt:
      'Serene skincare beauty portrait of an Indian woman, eyes closed, fresh luminous bare skin ' +
      'with a healthy natural glow, a single droplet of sheen on the cheek, minimal jewellery, ' +
      'soft diffused spa light, ivory and champagne palette, clean skincare-campaign composition',
  },
  /** 7 · Manicure / pedicure beauty visual. */
  nailsImage: {
    src: img('nails.jpg'),
    small: img('nails-720.jpg'),
    width: 1000,
    height: 1250,
    ready: true,
    alt: 'Elegantly manicured hands resting against a wine-toned drape',
    prompt:
      'Elegant manicure beauty detail, a pair of well-groomed Indian hands with a glossy nude-rose ' +
      'polish and neat cuticles, resting gracefully on a wine silk drape, a thin gold ring, warm ' +
      'soft light, luxury nail-care campaign, flawless real skin, perfectly formed fingers',
  },
  /** 8 · Mehndi beauty visual. */
  mehndiImage: {
    src: img('detail-mehndi.webp'),
    small: img('detail-mehndi-480.webp'),
    width: 800,
    height: 1191,
    ready: true,
    alt: 'Mehndi-covered hand and forearm stacked with gold and magenta bridal bangles',
    prompt:
      'Bridal mehndi detail, a hand and forearm covered in intricate freshly-applied henna in a ' +
      'traditional Rajasthani pattern, stacked with gold and magenta glass bangles, resting on ' +
      'embroidered fabric, warm directional light, luxury bridal-campaign close-up',
  },
  /** 9 · Luxury salon / editorial beauty composition (portrait).
   *  The supplied studio-front asset was a printed banner, so this slot uses a
   *  licensed salon-interior photograph instead. Swap for a real studio shot. */
  salonComposition: {
    src: img('salon.jpg'),
    small: img('salon-720.jpg'),
    width: 1000,
    height: 1250,
    ready: true,
    alt: 'The Aradhaya Beauty Hub studio interior',
    prompt:
      'Wide luxury beauty-studio interior, warm ivory and wine palette, a styling chair and a lit ' +
      'mirror vanity with soft bulbs, brass accents, flowers, elegant uncluttered editorial ' +
      'composition, cinematic warm light, no people, high-end salon advertisement',
  },
  /** 10 · Abstract beauty campaign image for the 3D section backdrop. */
  abstractCampaign: {
    src: img('abstract-campaign.jpg'),
    small: img('abstract-campaign-720.jpg'),
    width: 1200,
    height: 1200,
    ready: true,
    alt: 'Abstract wine-and-gold beauty campaign composition',
    prompt:
      'Abstract luxury beauty campaign still-life, silk fabric in wine and burgundy folds with ' +
      'liquid-gold ribbons and champagne light, a single gold ring and scattered petals, no face, ' +
      'macro cinematic light, editorial cosmetics-advertisement mood, rich colour grade',
  },
  /** 11 · Instagram / social-media campaign visual (portrait). */
  instagramImage: {
    src: img('social-campaign.jpg'),
    small: img('social-campaign-720.jpg'),
    width: 1000,
    height: 1250,
    ready: true,
    alt: 'Aradhaya Beauty Hub social-media campaign visual',
    prompt:
      'Social-media beauty campaign portrait, an Indian model with radiant soft-glam makeup looking ' +
      'to camera, warm wine and champagne backdrop, generous clean space for a caption, modern ' +
      'Instagram-editorial framing, natural realistic skin, elegant styling',
  },
  /** 12 · Promotional / offer campaign visual (portrait). */
  offerImage: {
    src: img('offer-campaign.jpg'),
    small: img('offer-campaign-720.jpg'),
    width: 1000,
    height: 1250,
    ready: true,
    alt: 'Radiant facial-glow beauty visual for the seasonal offer',
    prompt:
      'Festive beauty-offer campaign portrait, an Indian woman with a luminous freshly-facialled ' +
      'glow and a soft confident smile, delicate gold jewellery, warm celebratory wine-and-gold ' +
      'light, editorial promotional composition with room for a headline, natural realistic skin',
  },

  /* ── Supporting detail slots (real photography, used in the gallery) ─────── */
  detailMaang: {
    src: img('detail-maang.webp'),
    small: img('detail-maang-520.webp'),
    width: 760,
    height: 645,
    ready: true,
    alt: 'Kundan maang tikka set into a bridal hairstyle',
    prompt:
      'Bridal hair-and-jewellery detail, a kundan maang tikka set into a sleek dark bridal updo, ' +
      'baby-breath tucked in, warm side light, luxury close-up, natural realistic hair',
  },
  detailLehenga: {
    src: img('detail-lehenga.webp'),
    small: img('detail-lehenga-600.webp'),
    width: 1000,
    height: 744,
    ready: true,
    alt: 'Gold zari embroidery across the skirt of a magenta bridal lehenga',
    prompt:
      'Textile detail, gold zari and sequin embroidery across a magenta silk bridal lehenga, raking ' +
      'warm light catching the threadwork, luxury fashion-fabric close-up, shallow depth of field',
  },
  storefront: {
    src: img('storefront.webp'),
    small: img('storefront-820.webp'),
    width: 1178,
    height: 1335,
    ready: false,
    alt: 'Signage and shopfront of Aradhaya Beauty Hub',
    prompt:
      'Elegant beauty-studio shopfront at dusk, warm interior glow through glass, refined signage, ' +
      'wine-and-gold palette, editorial architectural composition, no visible brand text',
  },

  /* ── Utility slots (not campaign imagery) ───────────────────────────────── */
  instagramQr: {
    src: img('instagram-qr.webp'),
    width: 560,
    height: 758,
    ready: true,
    alt: 'QR code linking to the Aradhaya Beauty Hub Instagram profile',
    prompt: 'Not a campaign image — the studio’s printed Instagram QR card. Do not regenerate.',
  },
} satisfies Record<string, ImageAsset>

export type ImageKey = keyof typeof registry

export const images: Record<ImageKey, ImageAsset> = registry

/** Every slot still awaiting original photography — surfaced by IMAGE_PROMPTS. */
export const pendingImages = (Object.keys(registry) as ImageKey[]).filter((k) => !registry[k].ready)
