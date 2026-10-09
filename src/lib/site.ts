/**
 * Single source of truth for site-wide metadata.
 * Update here, and every page / schema / OG card updates with it.
 */
export const SITE = {
  name: "EmendaKit",
  legalName: "EmendaKit AS",
  url: "https://www.emendakit.com",
  email: "kjersti@emendakit.com",
  phone: "+47 954 45 726",
  /**
   * Contact-form backend. Formsubmit AJAX endpoint — no account or API key.
   * First submission triggers a one-time activation email to the address above;
   * Kjersti must click it once, then messages deliver to the inbox.
   * After activation you can swap the email for Formsubmit's hashed alias to hide it.
   */
  contactFormEndpoint: "https://formsubmit.co/ajax/kjersti@emendakit.com",
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
      role: { no: "Gründer · Jordmor", en: "Founder · Midwife" },
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

/** "29. september 2023" / "29 September 2023" */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "no" ? "nb-NO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",             // frontmatter dates are date-only; keep the calendar day stable
  }).format(date);
}
