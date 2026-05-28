/**
 * Single source of truth for site-wide metadata.
 * Update here, and every page / schema / OG card updates with it.
 */
export const SITE = {
  name: "EmendaKit",
  legalName: "EmendaKit AS",
  url: "https://www.emendakit.com",
  email: "kjersti@emendakit.no",
  defaultLocale: "no" as const,
  locales: ["no", "en"] as const,
  taglines: {
    no: "Innovasjon gjennom kunnskap og erfaring.",
    en: "Innovation through knowledge and experience.",
  },
  founders: [
    {
      slug: "kjersti-grinde",
      name: "Kjersti Grinde",
      role: { no: "Medstifter · Jordmor", en: "Co-founder · Midwife" },
    },
    {
      slug: "gregers-halvorsen",
      name: "Gregers Halvorsen",
      role: { no: "Medstifter · Anestesilege", en: "Co-founder · Anesthesiologist" },
    },
  ],
  products: [
    { slug: "emendakit-hospital", number: 1 },
    { slug: "emendakit-dentist", number: 2 },
  ],
} as const;

export type Locale = (typeof SITE.locales)[number];

/** Resolve a localized URL: getLocalizedUrl("en", "/produkt/emendakit-hospital", "/en/product/emendakit-hospital") */
export function getLocalizedUrl(
  targetLocale: Locale,
  defaultPath: string,
  altPath: string,
): string {
  if (targetLocale === SITE.defaultLocale) return defaultPath;
  return altPath;
}
