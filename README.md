# Aradhaya Beauty Hub

A premium single-page website for **Aradhaya Beauty Hub** — a women-only beauty and makeup
studio in M.P. Nagar, near Om Guest House.

Built as a static site: React + TypeScript on Vite, Tailwind for the design system,
React Three Fiber for two lightweight WebGL scenes, GSAP + Framer Motion for the motion
layer. It deploys to GitHub Pages with no server of any kind.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
npm run lint     # TypeScript, no emit
```

Node 20 or newer.

---

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. The workflow builds `dist/` and deploys it.

`vite.config.ts` uses `base: './'`, so the build works at a user-site root
(`user.github.io`) *and* in a project sub-path (`user.github.io/repo/`) with no config
change. `public/.nojekyll` stops GitHub from filtering the build output.

---

## Project structure

```
src/
├─ components/
│  ├─ layout/     Navbar, Footer
│  ├─ sections/   Hero, About, Services, ServiceItem, ThreeDShowcase,
│  │              BridalSection, Gallery, OfferSection, InstagramSection,
│  │              BookingSection
│  └─ ui/         Button, SectionHeading, Reveal/RevealText, Media, Magnetic,
│                 Placeholder, Marquee, CustomCursor, ScrollProgress
├─ three/         Stage (lazy canvas), HeroScene, ShowcaseScene, primitives
├─ hooks/         useMediaQuery, useDeviceTier, useSmoothScroll
├─ data/          site, services, gallery, offers, images
└─ lib/           cn
```

Everything that is *content* lives in `src/data/`. Everything that is *design* lives in
`tailwind.config.js` and `src/index.css`. Components hold no hard-coded copy.

---

## Changing content

### Business details
`src/data/site.ts` — name, tagline, phone, address, Instagram handle, navigation.

> The Instagram **URL** in that file is derived from the handle printed on the studio's QR
> card. Confirm it resolves to the right profile before going live; the handle itself is
> what the UI displays.

### Services
`src/data/services.ts` — nine entries, each with a number, title, summary, description and
detail chips. Add or remove an entry and the services list, the footer and the booking
form's dropdown all follow.

### Images
`src/data/images.ts` is the single registry for every photograph on the site. Drop a new
file into `public/images/` and change one line:

```ts
detailMehndi: {
  src: img('your-new-photo.webp'),
  small: img('your-new-photo-480.webp'),  // optional, used below 768px
  width: 800,
  height: 1191,                            // real pixel dimensions — prevents layout shift
  alt: 'Describe the photograph',
},
```

Services without a photograph render `Placeholder` — a designed gold-lattice plate rather
than a broken frame. Point the service at an image key and the placeholder disappears.

### The promotional offer
`src/data/offers.ts`. Set `active: false` (or empty the array) and the whole offer section
removes itself from the page — no other file needs touching. Edit `headline`, `subject`,
`includes` and `terms` to run a different campaign.

---

## The booking form

The site is static, so nothing pretends to be a backend.

With `FORM_ENDPOINT` empty (the default, in `BookingSection.tsx`) the form composes the
enquiry and hands it to WhatsApp on the studio's own number, with every field pre-filled.
That works today, with no service to sign up for.

To post to a real form service instead — Formspree, Basin, Netlify Forms, your own API —
set the endpoint and the same form submits to it:

```ts
const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx'
```

---

## Performance & accessibility

- **Tiered 3D.** `useDeviceTier` picks `high`, `low` or `off` from WebGL support, pointer
  type, core count and pixel ratio. Low tier drops the transmission material, halves the
  particle count and caps DPR; `off` renders a designed CSS fallback instead of a canvas.
- **Canvases are lazy.** `Stage` code-splits `@react-three/fiber`, mounts only when the
  section is within 250px of the viewport, and drops the frameloop to `demand` when it
  scrolls away — an off-screen 3D section costs nothing.
- **Reduced motion is honoured everywhere.** Smooth scrolling, parallax, reveals, the
  magnetic buttons, the custom cursor and both WebGL scenes all switch off under
  `prefers-reduced-motion: reduce`.
- **Images** are WebP, lazy by default, art-directed with a smaller source below 768px, and
  always carry intrinsic `width`/`height` so nothing shifts as they load. The hero
  photograph is preloaded.
- **Accessibility.** Semantic landmarks, a single `h1`, ordered headings, a skip link,
  visible gold focus rings, an Escape-and-arrow-key gallery lightbox that restores focus to
  the thumbnail it opened from, labelled form fields, and `aria-live` feedback on submit.
- **Bundling.** Three.js and the motion libraries are split into their own chunks so the
  first paint does not wait on them.

---

## Content provenance

Business name, tagline, address, phone number, Instagram handle, service list, the
women-only policy and the Teej facial offer all come from the studio's own signage,
posters and QR card. Photography is the studio's own. Nothing else is claimed on the site —
no prices, no ratings, no awards, no years in business, no invented testimonials.
