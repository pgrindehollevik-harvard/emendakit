import { defineCollection, z } from "astro:content";

const localeSchema = z.enum(["no", "en"]);

const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: localeSchema,
    urlSlug: z.string(),                     // clean URL slug, shared across locales
    altSlug: z.string(),                    // counterpart in the other locale
    productNumber: z.number().int(),         // 1 = Hospital, 2 = Dentist
    audience: z.string(),                    // "for helsepersonell" / "for tannlegeklinikker"
    descriptor: z.string(),                  // "Anafylaksiskrin for helsepersonell"
    summary: z.string(),                     // 1–2 sentence lede
    heroPhoto: z.string().optional(),
    galleryPhotos: z.array(z.string()).default([]),
    specs: z.array(z.object({ key: z.string(), value: z.string() })),
    contents: z
      .array(
        z.object({
          number: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      )
      .default([]),
    useCases: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .default([]),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    deliveryTime: z.string().default("Ca. 2–3 uker"),
    priceLabel: z.string().default("Pris på forespørsel"),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: localeSchema,
    altSlug: z.string(),
    summary: z.string(),
    audience: z.string(),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const team = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    locale: localeSchema,
    urlSlug: z.string(),
    role: z.string(),
    portraitPhoto: z.string().optional(),
    bio: z.string(),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    locale: localeSchema,
    title: z.string(),
    description: z.string(),
    duration: z.string(),                    // ISO 8601 e.g. "PT2M14S"
    uploadDate: z.string(),
    sourceMp4: z.string(),
    sourceWebm: z.string().optional(),
    poster: z.string(),
    transcript: z.string(),
    learningResourceType: z.string().default("Video"),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: localeSchema,
    description: z.string(),
    publishDate: z.coerce.date(),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const partners = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    locale: localeSchema,
    role: z.string(),                        // "Tannlege og faglig rådgiver"
    url: z.string().url().optional(),
    order: z.number().int(),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const press = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),                       // headline as published
    locale: localeSchema,
    outlet: z.string(),                      // "Firda", "Helse Førde"
    date: z.coerce.date(),
    url: z.string().url().optional(),
    paywalled: z.boolean().default(false),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  type: "content",
  schema: z.object({
    source: z.string(),                      // person or organisation
    locale: localeSchema,
    role: z.string(),                        // "Administrerende direktør, Helse Førde"
    quote: z.boolean().default(true),        // render body as a quoted letter (false = plain case note)
    translated: z.boolean().default(false),  // EN: body is a translation of a Norwegian original
    date: z.coerce.date().optional(),
    url: z.string().url().optional(),
    order: z.number().int(),
    reviewedByKjersti: z.boolean().default(false),
  }),
});

export const collections = {
  products,
  services,
  team,
  videos,
  posts,
  partners,
  press,
  testimonials,
};
