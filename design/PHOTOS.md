# EmendaKit · Photography Manifest

This file lists every photo slot used in the design mockups, what photo belongs there, and the filename the production site expects. Replace the dark placeholder treatments in `02b-nordic-clinical-v2.html` (and later, the Astro components) with the real `.jpg`/`.avif` files at the paths listed here.

All production photos should live at `src/assets/photos/` and be served via Astro's `<Image>` component (auto-resized + AVIF/WebP).

| Slot         | Filename                                  | Description                                                                 | Crop                                                       | Treatment                                                                                  |
|--------------|-------------------------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| FOTO 01      | `hero-helicopter-hangar.jpg`              | Gregers in red flight suit, holding the anafylaksiskrin, helicopter behind. | 4:3, subject centered, hangar symmetry preserved.          | None — hero image stands on its own. Optional: subtle bottom gradient for caption legibility. |
| FOTO 02      | `product-clinic-in-situ.jpg`              | The Klinikk-skrinet in clinical context (e.g. sitting open in ambulance).   | 16:11 landscape.                                           | None.                                                                                       |
| FOTO 03      | `product-dental-in-situ.jpg`              | The Tannlege-skrinet on a dental clinic surface.                            | 16:11 landscape.                                           | None. (TODO: this photo doesn't exist yet — needs a shoot.)                                 |
| FOTO 04      | `field-ambulance-interior.jpg`            | Gregers tending to a patient inside the air ambulance, kit visible.         | 4:5 portrait, vertical for field-section.                  | None.                                                                                       |
| FOTO 05      | `founder-kjersti-portrait.jpg`            | Kjersti, white scrubs, black background, warm professional smile.           | 1:1 square.                                                | None — leave the existing studio black background.                                          |
| FOTO 06      | `founder-gregers-portrait.jpg`            | Gregers, surgical scrub cap and teal scrubs, black background.              | 1:1 square.                                                | None.                                                                                       |
| FOTO 07–10   | _reserved_                                | Future: behovstilpasset case studies, Helse Førde mediaomtale callouts.     | TBD                                                        | TBD                                                                                         |

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
