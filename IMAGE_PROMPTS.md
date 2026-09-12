# Aradhaya Beauty Hub — Image Generation Guide

Every visual on the site is wired through **`src/data/images.ts`**. This guide is the
companion for generating the original campaign imagery that fills those slots.

The goal: one cohesive **luxury Indian beauty campaign** — Vogue-India editorial, not
AI stock. The generated people are **campaign / editorial models, never presented as real
customers** of the studio.

---

## How the slot system works

Each slot in `images.ts` carries a `ready` flag:

- `ready: true` — a real file exists in `public/images/`; the site shows the photo.
- `ready: false` — no file yet; the site shows an on-brand **designed plate** (never a
  broken image, never a borrowed poster).

**Drop-in workflow for one slot**

1. Generate the image using its prompt below + the shared style/negative blocks.
2. Export **two WebP files** at the exact names in the table (full size + `-720`/small).
   Target ~80–85% quality; keep each full file roughly ≤ 250 KB.
3. Copy both into `public/images/`.
4. In `src/data/images.ts`, set that slot's `ready: true` (only needed for the pending
   slots — the rest are already `true`).
5. Done. No component changes.

> The `ready`-true slots currently point at the studio's own reference photography.
> To fully de-couple the site from the supplied posters/photos, regenerate those slots
> too using the **same filenames** and the prompts already in `images.ts`.

---

## Shared style block (append to every prompt)

Exported from code as `CAMPAIGN_STYLE` in `images.ts`:

```
luxury Indian beauty campaign, fashion-editorial photography, cinematic studio lighting,
soft warm key light with gentle rim light, shallow depth of field, natural realistic skin
texture with visible pores, refined subtle makeup, elegant authentic kundan/gold jewellery,
burgundy / wine / champagne / ivory palette, Vogue-India editorial composition, 85mm lens,
medium-format quality, colour-graded warm and rich, no text, no logo, no watermark
```

## Negative prompt (always)

Exported as `CAMPAIGN_NEGATIVE`:

```
plastic AI skin, waxy over-smoothed skin, extra fingers, deformed hands, malformed jewellery,
excessive makeup, cartoon, illustration, 3d render, stock-photo look, oversaturated pink,
busy background, harsh flash, distorted face, watermark, text, logo, low resolution
```

**Consistency:** generate the whole set with one model reference / seed family and the same
lighting so the collection reads as a single shoot. Keep skin realistic; reject any frame
with malformed hands or fake-looking jewellery.

---

## Interim stock photography (currently live)

To make the site presentable immediately, five slots are filled with **licensed stock
photos from Unsplash** (Unsplash License: free for commercial use, no attribution
required). They are saved locally as `.jpg` in `public/images/` and are drop-in
replaceable — regenerate the AI version, overwrite the file (any name), update the slot,
done. These are **editorial/campaign visuals, not real customers of the studio.**

| Slot | Local files | Source (unsplash.com/photos/…) |
|---|---|---|
| `hairImage` | `hair-spa.jpg` / `-720` | photo-1629397685944-7073f5589754 |
| `facialImage` | `facial.jpg` / `-720` | photo-1616394584738-fc6e612e71b9 |
| `nailsImage` | `nails.jpg` / `-720` | photo-1610992015762-45dca7fa3a85 |
| `salonComposition` | `salon.jpg` / `-720` | photo-1761470575018-135c213340eb |
| `offerImage` | `offer-campaign.jpg` / `-720` | photo-1587271315307-eaebc181c749 |
| `instagramImage` | `social-campaign.jpg` / `-720` | photo-1761498443962-1f00eed12137 |
| `abstractCampaign` | `abstract-campaign.jpg` / `-720` | photo-1622618991746-fe6004db3a47 |

`instagramImage` feeds the Instagram section portrait; `abstractCampaign` is the
"The Counter" panel in the Signature filmstrip.

## Still pending — generate to complete the set

| Slot (`images.ts`) | Files in `public/images/` | Size (px) | Subject |
|---|---|---|---|
| `storefront` | `storefront.webp`, `-820` | 1178×1335 | Real shopfront (the supplied file is a poster; slot currently unused) |

> **Why the studio slots changed:** the supplied `studio-front`, `storefront` and
> `brand-banner` files are printed promotional **posters** (logos, price lists, collages),
> not photography — so they were removed from the UI. `salonComposition` now uses a stock
> salon interior; regenerate it and `storefront` with real photos of the actual studio
> when available.

Per-slot prompts live in `images.ts` (the `prompt` field on each slot) so code and docs
never drift. Read them there, append the shared style + negative blocks, and generate.

---

## Already-wired slots (regenerate to replace reference photos)

`heroImage`, `bridalCloseup`, `editorialPortrait`, `artistryCloseup`, `mehndiImage`,
`salonComposition`, `storefront`, `detailMaang`, `detailLehenga` — each already has a
`prompt` in `images.ts`. Regenerate with the same filenames to swap the supplied
reference photography for original campaign frames.

`instagramQr` is the studio's printed QR card — **do not regenerate**.

---

## The 12 campaign visuals (brief mapping)

1. Premium Indian bridal makeup portrait → `heroImage`
2. Close-up bridal makeup beauty shot → `bridalCloseup`
3. Elegant Indian bride editorial portrait → `editorialPortrait`
4. Luxury makeup artistry close-up → `artistryCloseup`
5. Hair styling / hair spa → `hairImage`
6. Facial / skincare → `facialImage`
7. Manicure / pedicure → `nailsImage`
8. Mehndi → `mehndiImage`
9. Luxury salon / editorial composition → `salonComposition`
10. Abstract beauty campaign (3D section) → `abstractCampaign`
11. Instagram / social campaign → `instagramImage`
12. Promotional / offer campaign → `offerImage`

---

## Optimisation checklist

- Export **WebP**, ~80–85% quality. Provide both the full and `-720`/small sizes.
- Keep intrinsic `width`/`height` in `images.ts` matching the exported file (prevents layout shift).
- Portraits 4:5, squares 1:1, landscape ~16:10 — match the table so nothing is cropped hard.
- Never upscale a low-res generation; regenerate at target size instead.
