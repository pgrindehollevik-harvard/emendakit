# EmendaKit

The EmendaKit AS website — Norwegian-clinical anaphylaxis kits, designed by clinicians for clinicians.

Built with **Astro 5 + Tailwind 4 + MDX**, deployed on Vercel.

> **Working with this repo via an AI agent (Conductor, Claude Code, Cursor, etc.)?** Read [`CLAUDE.md`](./CLAUDE.md) first. It captures every decision made during scoping and design — brand, voice, palette, products, AEO requirements, parallel-agent conventions, and a prioritized todo list.

## Quick start

```bash
git clone https://github.com/pgrindehollevik-harvard/emendakit.git
cd emendakit
npm install
npm run dev          # http://localhost:4321
```

Requires Node 20+ (see `.nvmrc`).

## Scripts

| Command          | What it does                                    |
|------------------|-------------------------------------------------|
| `npm run dev`    | Start Astro dev server (port 4321)              |
| `npm run build`  | Production build → `dist/`                      |
| `npm run preview`| Preview the production build locally            |
| `npm run check`  | TypeScript + Astro type check                   |
| `npm run format` | Prettier across the repo                        |

## Repository tour

```
design/      Mockups + design system docs (open the HTML files in your browser)
public/      Static assets — llms.txt, robots.txt, favicons
src/
  assets/    Logo + (later) photos imported by components
  components/Astro components — header, footer, schemas, SEO
  content/   MDX content collections (products, services, team, videos, posts)
  layouts/   BaseLayout — wraps every page
  lib/       site.ts — site-wide constants
  pages/     File-based routes (Norwegian default, English under /en/)
  styles/    global.css — Tailwind theme tokens
CLAUDE.md    Agent brief — read before doing any work
```

## Design references

The agreed-on design direction is **Nordic Clinical** (B v2). Open the locked mockups in your browser:

- `design/02b-nordic-clinical-v2.html` — homepage
- `design/04-product-detail-klinikk.html` — product detail page

Design system spec lives in `design/DESIGN.md`. Photography, video, and i18n strategy each have their own doc next to it.

## Deploy

Connected to Vercel via GitHub. Push to `main` → auto-deploy. The site config in `astro.config.mjs` is set up for Vercel and Cloudflare equally — switch hosts by changing the adapter import if needed.

For production:
1. Set the project's domain to `www.emendakit.com` in Vercel
2. Point DNS at Vercel (CNAME `www` to `cname.vercel-dns.com`, A `@` to `76.76.21.21`)
3. Verify `https://www.emendakit.com/llms.txt`, `/robots.txt`, and `/sitemap-index.xml` return 200

## Setting up the GitHub repo from this scaffold

```bash
cd emendakit
git init
git add .
git commit -m "Initial scaffold from design discovery"
gh repo create pgrindehollevik-harvard/emendakit --public --source=. --remote=origin
git push -u origin main
```

(Or create the repo via the GitHub web UI and `git remote add origin <url>` manually.)

## Editing content

All copy lives in MDX under `src/content/`. Frontmatter is type-checked against the Zod schemas in `src/content/config.ts` — if you misspell a field, `npm run check` will catch it.

The `reviewedByKjersti` boolean on every collection entry blocks the page from production builds until set to `true`. This is intentional for English translations and clinical text — Kjersti's review gate.

## License

Private. EmendaKit AS, © 2026.
