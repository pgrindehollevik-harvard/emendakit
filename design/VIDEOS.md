# EmendaKit · Video Plan

The current `emendakit.com/services-1` page embeds a Wix-VOD training film ("Anafylaksi/Allergisjokk-opplæringsfilm"). The QR-code on the kit's side links to **two opplæringsfilmer**. These videos are an underexploited asset on the existing site — we want them in more places, properly transcribed, and marked up so LLMs can cite them.

## Inventory (what we know exists)

| ID            | Working title                                          | Length     | Source on current site                    | Owner                 |
|---------------|--------------------------------------------------------|------------|-------------------------------------------|-----------------------|
| `vid-anaf-1`  | Anafylaksi / Allergisjokk — opplæringsfilm             | ~2 min     | services-1, Wix VOD widget                | Kjersti & Gregers     |
| `vid-anaf-2`  | Second QR-linked opplæringsfilm (specifics TBD)        | ~2 min     | QR-code on kit                            | Kjersti & Gregers     |
| `vid-hero-*`  | Optional new short clips (kit opening, in-context)     | 5–15 sec   | not yet shot                              | TBD                   |
| `vid-found`   | Optional founder intro video for /om-oss               | 60–90 sec  | not yet shot                              | TBD                   |

**Action item for Peter / Kjersti**: confirm what the second QR-linked film actually covers and supply both source files (.mp4 or .mov). If they're currently locked inside Wix VOD, request the originals from the videographer or extract from Wix.

## Where each video lives in the new site

### 1. `/opplaering` — dedicated training hub (NEW page)

The single most important addition. Right now the videos are buried at the bottom of `/services-1` and locked to one page. They should live on a dedicated, high-authority page that becomes the canonical destination for the QR code on the kit.

Structure:
- `<h1>` Opplæring i akuttbehandling av anafylaksi
- Both videos embedded with full transcripts (collapsible `<details>`)
- Clinical context above each: "When to use this", "Who this is for"
- Link to PDF download of the national flytskjema
- Cross-link to the two product pages
- Schema.org `LearningResource` + `VideoObject` per video

### 2. `/produkt/emendakit-hospital` (and `…dentist`)

Embed `vid-anaf-1` at the bottom of the "Klinisk grunnlag" section (slot already in the v2 mockup as the empty video frame).

The QR code on the printed kit links to `/opplaering` (not the video file directly), so any future updates to the films don't break the QR. The training hub page can list both films + transcripts + extra material.

### 3. `/` — homepage

Optional: a short, **muted, autoplay-on-hover** clip (5–8 seconds) of the kit being opened, embedded in the hero photo slot or below the hero. Adds dynamism without being noisy. Use only if `vid-hero-*` exists; do not autoplay full-length training films.

### 4. `/om-oss`

Optional: founder intro video (`vid-found`) — Kjersti and Gregers introducing themselves and the philosophy. Embed near the founder bios.

### 5. `/tjenester/behovstilpasset`

A short case-study clip if/when one is filmed (kit being co-designed with a fødeavdeling). Not blocking.

## Embed pattern

Self-hosted on Cloudflare Stream or Mux (not YouTube — keeps the brand controlled, no YouTube end-screens recommending unrelated videos, no GDPR cookie issues, plays in muted autoplay on iOS).

```astro
---
// src/components/Video.astro
const { id, title, transcript, poster } = Astro.props;
---
<figure class="video">
  <video
    id={id}
    poster={poster}
    controls
    preload="metadata"
    playsinline
    aria-label={title}
  >
    <source src={`/videos/${id}.mp4`} type="video/mp4" />
    <source src={`/videos/${id}.webm`} type="video/webm" />
  </video>
  <figcaption>{title}</figcaption>
  {transcript && (
    <details>
      <summary>Vis transkripsjon · Show transcript</summary>
      <div class="transcript">{transcript}</div>
    </details>
  )}
</figure>
```

## Transcripts (the AEO hack)

This is the biggest LLM-discovery lever in the entire project.

LLMs cannot watch video. They can read transcripts. Every minute of training content that is currently audio-only is content **invisible to ChatGPT, Perplexity, Claude search, and Google's AI Overviews.** Transcribe both training films and embed the full text on the same page as the video, inside `<details>` so it doesn't dominate visually but is in the DOM for crawlers.

Workflow:
1. Run each video through Whisper (locally or via OpenAI/Anthropic API).
2. Have Kjersti review for clinical accuracy — terminology, dosages, drug names.
3. Save as `src/content/transcripts/<videoId>.no.mdx` and `.en.mdx`.
4. The `<Video>` component pulls the transcript from the matching content collection entry.

```bash
# Local Whisper transcription example
whisper vid-anaf-1.mp4 --language Norwegian --output_format vtt --model large
```

## Schema.org markup

Each video page emits `VideoObject` JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Anafylaksi / Allergisjokk — opplæringsfilm",
  "description": "Opplæring i akuttbehandling av anafylaksi for helsepersonell. Demonstrasjon av nasjonalt flytskjema og bruk av EmendaKit Hospital.",
  "thumbnailUrl": "https://www.emendakit.com/videos/vid-anaf-1-poster.jpg",
  "uploadDate": "2024-09-15",
  "duration": "PT2M14S",
  "contentUrl": "https://www.emendakit.com/videos/vid-anaf-1.mp4",
  "transcript": "[…full Norwegian transcript here…]",
  "inLanguage": "nb-NO",
  "isFamilyFriendly": true,
  "publisher": {
    "@type": "Organization",
    "name": "EmendaKit AS"
  },
  "learningResourceType": "Video",
  "educationalLevel": "Professional"
}
```

The `transcript` field is what ChatGPT search and Google AI Overviews ingest most reliably.

## Production checklist

- [ ] Get source files (.mp4 / .mov) for both existing training films from the original videographer or Wix VOD export
- [ ] Decide hosting: Cloudflare Stream (recommended, free up to a generous quota) vs. Mux vs. self-hosted
- [ ] Transcribe both films via Whisper
- [ ] Kjersti clinical review of transcripts
- [ ] Translate transcripts to English (with Kjersti review)
- [ ] Generate poster frames (`ffmpeg -ss 00:00:02 -i input.mp4 -frames:v 1 poster.jpg`)
- [ ] Build `/opplaering` page with both videos, transcripts, schema.org
- [ ] Embed `vid-anaf-1` in product detail page bottom section
- [ ] Update QR code on next kit print run to point to `/opplaering` (canonical, future-proof)

## Why this matters for "AI-native"

The whole point of going AI-native is that when a Norwegian nurse asks ChatGPT "hvordan håndterer jeg anafylaktisk sjokk under vaksinasjon" or an English clinician asks "what's a well-designed anaphylaxis kit", we want EmendaKit's training material to be quoted in the answer. That only happens if the transcripts are in clean static HTML with proper `VideoObject` markup — not locked inside a Wix VOD blob.
