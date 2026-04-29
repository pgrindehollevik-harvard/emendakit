# EmendaKit — Agent Brief

You're an agent working on the EmendaKit website. **Read this entire file before doing anything.** It captures every decision made during scoping so you don't have to rediscover them.

If you're a human reading this in Conductor or Claude Code: this is also your reference.

---

## What this is

EmendaKit AS is a small Norwegian medical device company. It sells anaphylaxis emergency kits ("anafylaksiskrin") to healthcare professionals. The company was founded by Peter's mother — Kjersti Grinde, a midwife — and Gregers Halvorsen, an anesthesiologist. They are not e-commerce; they take quotes by email and deliver in ~2 weeks.

This site replaces an old Wix brochure (`https://www.emendakit.com`). The goal is two things in one move:

1. **Modernize the site.** Astro + Tailwind + MDX, deployed on Vercel, repo on GitHub. Brochure architecture, no app, no on-site AI assistant.
2. **Make it AI-native in the discovery sense.** The site itself does not talk to an LLM. The site is *structured to be cited by* LLMs. Schema.org, `llms.txt`, semantic HTML, real transcripts on every video. When a Norwegian nurse asks ChatGPT "anafylaksiskrin Norge" or an English clinician asks "where can I get a clinician-designed anaphylaxis kit", we want EmendaKit to be in the answer.

There is no on-site chatbot. Don't add one. (Peter explicitly ruled it out.)

## Stack

- **Astro 5** with `@astrojs/mdx` and `@astrojs/sitemap`
- **Tailwind 4** via `@tailwindcss/vite`, theme tokens declared in `src/styles/global.css` `@theme` block
- **Self-hosted fonts** via `@fontsource/inter`, `@fontsource/inter-tight`, `@fontsource/jetbrains-mono` — never load from Google Fonts in production
- **TypeScript** strict via `astro/tsconfigs/strict`
- **Content collections** with Zod schemas in `src/content/config.ts`
- **Hosting:** Vercel, connected to the GitHub repo. Auto-deploys on push to `main`.
- **Domain:** `https://www.emendakit.com` (DNS swap when ready to launch)

## Repository conventions

```
emendakit/
├── astro.config.mjs                    Astro + i18n + sitemap + Tailwind plugin
├── tsconfig.json                       Aliases: ~ -> src
├── package.json
├── design/                             Mockups + design docs (not deployed)
│   ├── 02b-nordic-clinical-v2.html     LOCKED homepage mockup (open in browser)
│   ├── 04-product-detail-klinikk.html  Product detail mockup
│   ├── DESIGN.md                       Design system spec — read first
│   ├── PHOTOS.md                       Photography manifest + filename map
│   ├── VIDEOS.md                       Video placement plan + transcript workflow
│   ├── I18N.md                         Bilingual strategy — URL table, language switch
│   └── assets/                         Logo + (later) photos as design references
├── public/
│   ├── llms.txt                        Bilingual press-kit-for-LLMs
│   └── robots.txt                      AI crawlers explicitly allowed
└── src/
    ├── assets/logo/                    Imported by components
    ├── components/                     Astro components — see DESIGN.md for what to build
    ├── content/
    │   ├── config.ts                   Zod schemas for all collections
    │   ├── products/                   .no.mdx + later .en.mdx
    │   ├── services/
    │   ├── team/
    │   ├── videos/
    │   └── transcripts/                One per video, per locale
    ├── layouts/BaseLayout.astro        Wraps every page: SEO + schema + header + footer
    ├── lib/site.ts                     Site-wide constants
    ├── pages/                          File-based routes
    │   ├── index.astro                 NO homepage
    │   ├── produkt/[slug].astro        NO product detail (dynamic route)
    │   └── en/                         English mirror, `/en/` prefix
    └── styles/global.css               Tailwind 4 theme tokens
```

**Path aliases:** `~/*` maps to `src/*`. Use `import X from "~/components/X.astro"`.

**Branch hygiene:** any agent working in parallel via Conductor worktrees — keep changes scoped to one of: layout components, page-level Astro, content MDX, AEO/schema components, styles. Avoid touching `astro.config.mjs` unless that's specifically your task.

## Design — locked direction

**Direction B v2 — Nordic Clinical**, with the actual EmendaKit logo and palette. Reference mockups are in `design/`. Open them in your browser to see proper fidelity.

Everything visual must match `design/DESIGN.md`. No teal `#2A7C6F` from the old Wix site — that color predates the logo. The palette is navy + cyan + warm whites (see `DESIGN.md` for hex values, all wired into `global.css` already).

## Brand & products

- **Brand name:** "EmendaKit" — camelCase. Match the wordmark exactly. Never "Emendakit", never all-caps.
- **Three offerings:**
  - `EmendaKit Hospital` (slug: `emendakit-hospital`) — for hospitals, ambulances, fødestue, vaksinasjon
  - `EmendaKit Dentist` (slug: `emendakit-dentist`) — for dental clinics
  - `Behovstilpasset` (custom kits) — co-design service
- **Norwegian SEO descriptor:** `anafylaksiskrin` — keep this in body copy, headings, meta descriptions. Brand names give us URL stability across NO/EN; the SEO term gives us discoverability.
- **No Fosen Tools link.** Removed deliberately. All purchase intent → `mailto:kjersti@emendakit.com`.
- **Delivery:** "Ca. 2 uker" / "Approximately 2 weeks". Don't write "in stock" or "ships in 24h" — that's not how the business works.

## Voice

- **Norwegian (primary):** bokmål, never nynorsk. Precise, lightly informal where appropriate. Clinical terms used confidently. No exclamation marks. No marketing fluff. Kjersti and Gregers' voice — both anti-fluff clinicians.
- **English:** neutral international clinical English. ml/mg/IM/IV (no US units). Same anti-fluff posture.
- See `design/DESIGN.md` for the full voice section.

## i18n

- Default locale: `no` (no path prefix). English under `/en/`.
- See `design/I18N.md` for the full URL table, language switch behavior, and Kjersti-must-review-EN gate. The `reviewedByKjersti` Zod field on every collection blocks unreviewed English content from production.
- Language switch lives in two places: header (segmented pill) and footer (text link). Both navigate to the equivalent URL in the target language, never just to the localized homepage.

## AEO (Answer Engine Optimization) — non-negotiables

This is the entire point of the modernization. Every page must:

1. Render as **static HTML** server-side, no client hydration required for content.
2. Use **semantic HTML** (`<article>`, `<section>`, `<h1>` hierarchy, descriptive `<a>` text, alt text on every image).
3. Emit **schema.org JSON-LD** appropriate to the page type:
   - Every page: `Organization` (already in `BaseLayout`)
   - Product pages: `Product` + `Offer` + `FAQPage`
   - Video pages: `VideoObject` with full `transcript` field
   - Founder/about: optional `Person`
4. Include `<link rel="alternate" hreflang>` tags for both NO and EN counterparts + `x-default`.
5. Have a clean meta description and OpenGraph image.
6. Be reachable from `sitemap-index.xml`.

`/llms.txt` lives at the root and contains the press-kit summary in NO + EN. Update it whenever product info changes.

## Photography

See `design/PHOTOS.md`. Six photo slots are mapped (helicopter hangar hero, two product in-situ shots, ambulance interior with patient, two founder portraits). The mockups currently use intentional dark wireframe placeholders with mono captions — when real photos arrive, swap each slot per the manifest.

The dental product still needs an in-context shot (FOTO 03). Note this in the open-issues backlog.

## Video

See `design/VIDEOS.md`. The current Wix site has the training films buried at the bottom of `/services-1`. New site moves them to a dedicated `/opplaering` (Training) page with full transcripts (the AEO win) and embeds the primary training film at the bottom of each product detail page. The kit's QR code points to `/opplaering`, never directly to a video file (so future video updates don't break the QR).

**Critical AEO step:** transcribe both training films via Whisper, have Kjersti review for clinical accuracy, store as content-collection entries, render via the `Video.astro` component (to be built), emit `VideoObject` JSON-LD with the full transcript inline.

## What's done vs. what's not

### Done in this scaffold
- Astro + Tailwind 4 + MDX wired up
- i18n config + sitemap config
- Content collection schemas (`products`, `services`, `team`, `videos`, `posts`)
- NO content seeded for both products + behovstilpasset service + both founders
- Logo files in `src/assets/logo/`
- `BaseLayout` + `Header` + `Footer` + `LangSwitch` + `SEO` + four `Schema*` components
- `/` (NO homepage) + `/en/` (stub) + `/produkt/[slug]` (dynamic route)
- `public/llms.txt` (bilingual)
- `public/robots.txt` (AI crawlers allowed)
- All design docs (`DESIGN.md`, `PHOTOS.md`, `VIDEOS.md`, `I18N.md`)

### Open (priority ordered)
1. **Run `npm install` and verify `npm run build` succeeds.** Local first, then push.
2. **Build the EN content mirrors** for products, services, team — set `reviewedByKjersti: false` initially. Have Kjersti review before flipping the flag.
3. **Build remaining pages:** `/tjenester`, `/tjenester/behovstilpasset`, `/om-oss`, `/kontakt`, `/opplaering`, plus EN equivalents.
4. **Build `/en/product/[slug].astro`** — mirror of `/produkt/[slug].astro` reading EN locale entries.
5. **Build `Video.astro` component** with `<video>` + `<details>` transcript + `VideoObject` schema.
6. **Get the training video source files** from Kjersti or the Wix VOD export. Transcribe via Whisper. Have Kjersti clinical-review the transcripts. Add to `src/content/videos/` and `src/content/transcripts/`.
7. **Photography** — when Peter supplies the real photos, place under `src/assets/photos/` and swap into the photo slots per `design/PHOTOS.md`. Use Astro's `<Image>` for responsive AVIF.
8. **Add a favicon** at `public/favicon.png` derived from the logo mark (just the cross, not the wordmark).
9. **Set up Vercel deployment.** Connect GitHub repo `pgrindehollevik-harvard/emendakit` (or whatever Peter names it). Default settings work — Astro is a first-class Vercel framework.
10. **Domain swap.** Point `emendakit.com` DNS to Vercel when ready. Set up redirects from old Wix URLs (`/services-1` → `/tjenester`).

### Anti-priorities — don't do these
- No on-site AI chat assistant. Peter ruled it out.
- No e-commerce on-domain. Stay brochure + email.
- No fade-up-on-scroll, no scroll-jacking, no marquee animation.
- No stock photography of generic doctors smiling. The brand is real-context, dramatic, dark-mode photography.
- No abandoning the navy/cyan palette for the old Wix teal.
- No exclamation marks in body copy.

## Common commands

```bash
# install
npm install

# dev (port 4321 by default)
npm run dev

# typecheck
npm run check

# production build
npm run build

# preview the production build
npm run preview
```

## A note on parallel agents

If multiple Claude Code agents are working in Conductor worktrees on this repo simultaneously: split work along these lines to minimize merge conflicts.

- **Agent A — Content:** writes/edits `.mdx` files in `src/content/**`. Touches no other files.
- **Agent B — Pages:** writes `.astro` files in `src/pages/**`. Imports from `src/components/**` and `src/content/**` but doesn't modify them.
- **Agent C — Components:** owns `src/components/**` and `src/layouts/**`. Adds new components only when a page or a content type needs one.
- **Agent D — AEO/SEO:** owns `src/components/Schema*.astro`, `src/components/SEO.astro`, `public/llms.txt`, `public/robots.txt`, `astro.config.mjs` sitemap config.
- **Agent E — Styles:** owns `src/styles/global.css` and Tailwind theme tokens. Other agents read tokens, don't redefine them.

If you change anything outside your agent's lane, leave a clear commit message saying so.

## When in doubt

Match what's in `design/02b-nordic-clinical-v2.html` and `design/04-product-detail-klinikk.html`. Those are the locked references. If something looks off, the mockup is the source of truth, not your interpretation of "modern web design."
