// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.emendakit.com",
  trailingSlash: "never",
  integrations: [
    mdx(),
    sitemap({
      // Norwegian lives on emendakit.no, English on emendakit.com — list each
      // page under its real domain so the sitemap matches the canonical tags.
      serialize(item) {
        const u = new URL(item.url);
        u.hostname = u.pathname.startsWith("/en") ? "emendakit.com" : "emendakit.no";
        item.url = u.href;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "no",
    locales: ["no", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
