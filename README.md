# NOIR & BLADE — Premium Barbershop Template

Hochwertiges Next.js 14 Template für Premium-Barbershops. Editorial Grooming Studio Ästhetik, dunkle Atmosphäre, warme Gold-Akzente, präzise Typografie. Gebaut von **Origami Web Agency** als Vertriebs-Demo für lokale Barbershops.

## Quickstart

```bash
npm install
npm run dev
```

Öffne http://localhost:3000

```bash
npm run build   # Production Build
npm run start   # Production Server
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** + Custom Design Tokens
- **Framer Motion** für dezente Animationen
- **Lucide React** Icons
- Google Fonts: Playfair Display + Inter

## Designsystem

| Token | Wert | Verwendung |
|-------|------|------------|
| `ink` | `#0B0B0A` | Background |
| `ink-800` | `#161614` | Sektion-Alt |
| `ink-700` | `#1E1D1A` | Card |
| `gold` | `#D8B65A` | Akzent, CTA |
| `gold-600` | `#A88B3D` | Hover |
| `cream` | `#F4EFE6` | Text Primary |
| `muted` | `#A9A39A` | Text Secondary |

**Typografie:** Playfair Display (Display/Serif), Inter (Body/UI).

## Struktur

```
app/
  layout.tsx       Root layout, Fonts, Metadata
  page.tsx         Compose
  globals.css      Tokens + Editorial Helpers
  sitemap.ts       SEO
  robots.ts        SEO
components/
  Header / Hero / TrustBar / Services / SignatureExperience
  Team / Gallery / Pricing / BookingSection / Testimonials
  LocationContact / FAQ / Footer
  Logo / SectionHeader / PhotoPlaceholder
  MobileStickyCTA / CookieBanner / JsonLd
data/
  services.ts / team.ts / pricing.ts / faq.ts
  testimonials.ts / gallery.ts
```

## Bilder austauschen

Photo-Platzhalter sind via `<PhotoPlaceholder>` realisiert. Für echte Bilder einfach `next/image` einsetzen:

```tsx
import Image from 'next/image';
<Image src="/images/hero-razor.jpg" alt="..." fill className="object-cover" />
```

Erwartete Bilder unter `public/images/`:
- `hero-razor.jpg` (Hero, 4:5 oder 3:4)
- `signature-experience.jpg` (4:5)
- `team-malik.jpg`, `team-elias.jpg`, `team-noah.jpg` (3:4)
- `gallery-fade.jpg`, `-beard.jpg`, `-styling.jpg`, `-salon.jpg`, `-shave.jpg`, `-before-after.jpg`

## SEO

- Meta Title / Description / OpenGraph in `app/layout.tsx`
- `HairSalon` und `FAQPage` Schema.org JSON-LD in `components/JsonLd.tsx`
- `sitemap.xml` + `robots.txt` automatisch generiert
- `hreflang` Tags vorbereitet (de-DE / en-US)
- Eine einzige H1 (im Hero), saubere H2/H3-Hierarchie

## Anpassen für Kunden

1. **Brand:** `components/Logo.tsx` + Farben in `tailwind.config.ts`
2. **Texte:** `data/*.ts` – alle Inhalte zentral
3. **Kontakt:** `LocationContact.tsx`, `Footer.tsx`, `JsonLd.tsx`
4. **Buchung:** `BookingSection.tsx` – aktuell Demo; an Treatwell/Fresha/etc. anbinden
5. **Bilder:** `public/images/` befüllen

---

© Origami Web Agency — *We fold ideas into digital masterpieces.*
