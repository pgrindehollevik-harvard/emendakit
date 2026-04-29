# EmendaKit · Photography Manifest

This file lists every photo slot used in the design mockups, what photo belongs there, and the filename the production site expects. Replace the dark placeholder treatments in `02b-nordic-clinical-v2.html` (and later, the Astro components) with the real `.jpg`/`.avif` files at the paths listed here.

All production photos should live at `src/assets/photos/` and be served via Astro's `<Image>` component (auto-resized + AVIF/WebP).

| Slot         | Filename                                  | Status     | Description                                                                 | Crop                                                       |
|--------------|-------------------------------------------|------------|-----------------------------------------------------------------------------|------------------------------------------------------------|
| FOTO 01      | `hero-helicopter-hangar.jpg`              | ✅ wired   | Gregers in red flight suit, holding the anafylaksiskrin, helicopter behind. | 4:3, subject centered, hangar symmetry preserved.          |
| FOTO 02      | `product-hospital-studio.webp`            | ⚠ partial | Hospital kit on neutral background — **studio substitute**, not in-situ.    | Studio cutout (transparent / white).                       |
| FOTO 03      | `product-dental-in-situ.jpg`              | ❌ missing | Dental kit on a dental clinic surface — **needs a shoot**.                  | 16:11 landscape.                                           |
| FOTO 04      | `field-ambulance-interior.jpg`            | ✅ wired   | Air ambulance interior, kit context.                                        | 4:5 portrait, vertical for field-section.                  |
| FOTO 05      | `founder-kjersti-portrait.jpg`            | ✅ wired   | Kjersti, dark background — `_edited_edited` variant.                        | 1:1 square.                                                |
| FOTO 06      | `founder-gregers-portrait.jpg`            | ✅ wired   | Gregers, "Kult portrett" — edited variant.                                  | 1:1 square.                                                |
| FOTO 07–10   | _reserved_                                | —          | Future: behovstilpasset case studies, Helse Førde mediaomtale callouts.     | TBD                                                        |

### Outstanding shoots needed

- **FOTO 02 (in-situ)** — current production uses a studio cutout because no in-situ shot of the hospital kit exists. Worth commissioning when a Helse Førde shoot is next on the calendar: kit open in ambulance interior, mid-procedure light.
- **FOTO 03** — dental clinic shoot still needed: tannlege wearing scrubs, kit on a dental tray, cinematic lighting consistent with the rest of the brand.

### Bonus material on hand (not yet wired)

In `~/Desktop/projects/websites/emendakit/src/assets/`:

- `field_shots/` — four Kjersti-as-midwife shots (forløsning, jordmorstetoskop, med baby, undersøker gravid mage), two Gregers-with-patient shots, helicopter side view (alt FOTO 01).
- `portraits/` — alt edits of both founders + a "serious" Gregers (`Portrett Gregers.Alvorlig.jpg`).
- `logo/` — Monochrome on Transparent, Original on Transparent, White on Black, Blå på kvit bakgrunn variants.

These are candidates for `/om-oss`, the founders' bios, or a "in the field" strip on `/opplaering`. They have not been copied into this worktree's `src/assets/photos/` yet.

## Photo notes

- All shots already supplied are top-tier editorial quality. Do not re-color or filter — the existing dark, cinematic mood is the brand.
- The kit's red signal accents and the flight suit red harmonize with the navy/cyan logo palette. The site palette deliberately leaves space for those reds to pop in the photos rather than competing with them.
- For **FOTO 03** (dental kit in context): worth commissioning a small studio shoot — a tannlege wearing scrubs, kit on a dental tray. Without this, the dental product page will lean too heavily on the studio kit shot.

## Production conversion

When ready, drop the originals into `design/assets/photos/originals/`. Then convert + resize to optimized AVIF for the production site:

```bash
# install avif tools once
npm install -g sharp-cli

# convert each
sharp -i originals/hero-helicopter-hangar.jpg \
  -o ../../src/assets/photos/hero-helicopter-hangar.avif \
  --format avif --width 2400
```

Astro's `<Image>` component will further generate responsive sizes at build time.

## Replacement in the mockup

In `02b-nordic-clinical-v2.html`, each photo slot is marked with a `<figure>` or `<div>` that has a class like `.hero-photo`, `.product-img.kit-clinic`, etc. To swap in a real photo, replace the placeholder treatment with:

```html
<img src="assets/photos/hero-helicopter-hangar.jpg" alt="Gregers Halvorsen i flygedrakt foran luftambulansen, med EmendaKit anafylaksiskrin" />
```

…and remove the inline `background:` gradients on the slot. The captions (`.photo-stamp`, `.photo-caption`) can stay as overlays or be moved to a `<figcaption>` below depending on layout decision.
