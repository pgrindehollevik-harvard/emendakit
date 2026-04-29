# EmendaKit · Design System

**Direction:** Nordic Clinical (B v2 — locked).
**Reference mockups:** `design/02b-nordic-clinical-v2.html` (homepage), `design/04-product-detail-klinikk.html` (product detail page).

Read this doc before changing any visual property of the site. The design system below is what every Astro component should resolve to.

---

## Brand

| Token              | Value                                                                                            |
|--------------------|--------------------------------------------------------------------------------------------------|
| Brand name         | **EmendaKit** — camelCase. Never "Emendakit", never "EMENDAKIT".                                 |
| Legal entity       | EmendaKit AS                                                                                      |
| Tagline (NO)       | "Innovasjon gjennom kunnskap og erfaring."                                                        |
| Tagline (EN)       | "Innovation through knowledge and experience."                                                    |
| Logo file          | `src/assets/logo/emendakit-logo-blue-on-grey.{avif,png,svg}` — prefer SVG once vectorized        |
| Mark               | Stylized medical cross — 4 light-cyan + 1 navy rounded squares, separated from wordmark by rule |

Wordmark must always sit on a light, calm surface (cream, white, soft cyan). Do not place on dark backgrounds without an inverted variant — that variant doesn't exist yet, so don't.

## Products (3 offerings)

| Slug                              | Display name              | Audience                              | Norwegian descriptor                          |
|-----------------------------------|---------------------------|---------------------------------------|-----------------------------------------------|
| `emendakit-hospital`              | EmendaKit Hospital        | Sykehus, ambulanse, fødestue, vaksinasjon | "Anafylaksiskrin for helsepersonell"           |
| `emendakit-dentist`               | EmendaKit Dentist         | Tannlegeklinikker, oralkirurgi        | "Anafylaksiskrin for tannhelsetjenesten"        |
| `behovstilpasset`                 | Behovstilpasset / Custom kit | Helseforetak med spesielle behov   | "Behovstilpassede medisinske skrin"            |

The English brand names (`Hospital`, `Dentist`) are intentional — they keep URLs and product references stable across NO and EN, while the Norwegian SEO term `anafylaksiskrin` lives in body copy, headings, and meta descriptions.

## Color palette

All values pulled from the actual logo. **Never use the previous teal `#2A7C6F`** — it predates the logo and is off-brand.

| Token              | Hex        | Use                                                                            |
|--------------------|------------|--------------------------------------------------------------------------------|
| `--navy`           | `#1E3A5F`  | Primary brand color. Wordmark, primary buttons, CTAs, body links.              |
| `--navy-deep`      | `#122544`  | Hover/active states, dark CTA strips, headings on light fills.                 |
| `--cyan`           | `#8DC4CD`  | Secondary mark color, accent dots, dark-mode CTA fills.                        |
| `--cyan-soft`      | `#E6F1F3`  | Surface tint for muted sections, badge backgrounds.                            |
| `--bg`             | `#FAFAF7`  | Page background — warm off-white, not pure white.                              |
| `--surface`        | `#FFFFFF`  | Cards, modals.                                                                  |
| `--ink`            | `#0C1421`  | Primary text.                                                                   |
| `--ink-2`          | `#4A5568`  | Body text, secondary.                                                           |
| `--ink-3`          | `#8A96A3`  | Muted text, eyebrows, captions.                                                 |
| `--rule`           | `#E6E2D8`  | Hairlines, dividers, card borders.                                              |
| `--signal`         | `#C54A3A`  | The signal red on the kit + flight suits. Use sparingly — it's a *signal*.     |

Tailwind tokens live in `src/styles/global.css` under `@theme`. Don't redefine them locally in components.

## Typography

| Role               | Font                | Weight | Notes                                                              |
|--------------------|---------------------|--------|--------------------------------------------------------------------|
| Display headings   | Inter Tight         | 500    | Tight tracking (`-0.025em` to `-0.035em`), generous line-height fall (0.98–1.05) |
| Body text          | Inter               | 400    | `letter-spacing: -0.005em`, line-height 1.55–1.6                   |
| Eyebrows / mono    | JetBrains Mono      | 500    | Small caps via `text-transform: uppercase` + letter-spacing 0.06–0.12em |
| Body buttons       | Inter               | 500    | 14–15 px                                                            |

Self-host via `@fontsource/inter`, `@fontsource/inter-tight`, and `@fontsource/jetbrains-mono` — don't load from Google Fonts in production (privacy + performance). Subset to Latin Extended.

**Type scale:**
- `display-xl` 76 px / line-height 0.98 (homepage hero only)
- `display-lg` 56 px (product titles, section heads)
- `display-md` 44 px (large section heads)
- `display-sm` 28–32 px (cards, callouts)
- `body-lg` 19 px (lede / intro paragraphs)
- `body` 16 px
- `body-sm` 14 px
- `caption` 12 px (mono eyebrows, stamps)
- `micro` 11 px (mono labels) — never below

## Spacing

Use a 4 px grid. Vertical rhythm in rem (`1`, `1.5`, `2`, `3`, `4`, `5`, `6` rem). Section padding for major blocks: `padding: 80px 0` (light) or `padding: 96px 0` (heavy). Container max-width: `1320 px`, side padding `32 px`.

## Radii

| Token              | Value  | Use                                |
|--------------------|--------|------------------------------------|
| `--radius-sm`      | `6 px` | Inline pills, mono labels          |
| `--radius-md`      | `12 px`| Buttons, small cards               |
| `--radius-lg`      | `20 px`| Standard cards                     |
| `--radius-xl`      | `24 px`| Hero photo, big content frames     |
| `--radius-pill`    | `999px`| Buttons, language toggle, hero tag |

Never use rounded corners on single-sided borders (`border-left` etc.) — they don't render right.

## Motion

Restrained. Default: `transition: 120–200ms cubic-bezier(0.16, 1, 0.3, 1)`. No bouncy springs, no big slide-ins. Astro view-transitions enabled but limited to `name: "fade"` between pages.

## Components (Astro)

Implement these in `src/components/`:

- `BaseLayout.astro` — wraps every page with header, footer, SEO/schema slot
- `Header.astro` — sticky nav + logo + nav-links + lang-toggle + CTA button
- `Footer.astro` — colophon + columns + redundant lang switch
- `LangSwitch.astro` — see `I18N.md`
- `Section.astro` — wraps `<section>` with `padding`, `muted` variant for `--cyan-soft` background
- `Container.astro` — `max-width: 1320px; padding: 0 32px`
- `Button.astro` — `variant: "primary" | "secondary" | "block"`, `as: "a" | "button"`
- `ProductCard.astro` — used on landing page for the two-product split
- `PhotoSlot.astro` — placeholder image with stamp caption (replace with real `<Image>` once photos arrive)
- `SchemaOrganization.astro`, `SchemaProduct.astro`, `SchemaFAQPage.astro`, `SchemaVideoObject.astro` — JSON-LD emitters
- `SEO.astro` — `<title>`, meta description, OG tags, hreflang, canonical
- `Video.astro` — `<video>` with `<source>` + `<details>` transcript + `VideoObject` JSON-LD
- `BreadCrumbs.astro`
- `StatRow.astro`
- `FAQ.astro` — accordion + `FAQPage` JSON-LD

## Voice

Norwegian (primary):
- Bokmål, never nynorsk.
- Precise, clinical, lightly informal where appropriate. Kjersti and Gregers' voice — anesthesiologist + jordmor — both pragmatic, both anti-fluff.
- Use clinical terms confidently (`anafylaksi`, `intramuskulær`, `mg/ml`) without explaining them. The reader is a clinician.
- No exclamation marks. No "Vi er stolte av…". No emojis.

English:
- Neutral international clinical English.
- ml, mg, IM/IV — never US units.
- "Clinician", not "doctor" or "nurse" specifically, when speaking generally.
- Same anti-fluff posture.

## Image / video brief

See `design/PHOTOS.md` and `design/VIDEOS.md` for the full asset inventory and where each goes.

Tone: cinematic, real-context, dark backgrounds preferred for production photography. Studio portraits on black. Do not retouch the existing photos to look brighter or more "friendly" — the dramatic mood is the brand.

## What we deliberately don't do

- No hero gradient meshes, no AI-generated abstract shapes, no stock photography of generic doctors smiling.
- No on-site AI chat assistant (Peter's call). The site is brochure + AEO target, not a conversational app.
- No e-commerce on-domain — all purchase paths are `mailto:kjersti@emendakit.com`. (Fosen Tools link from old site is removed.)
- No scroll-jacking, no fade-up-on-scroll spam, no hover micro-interactions on every card.
- No marketing buzzwords. Clinicians can smell them.
