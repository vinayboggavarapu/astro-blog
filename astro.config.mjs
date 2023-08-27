import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://stargazers.club",
  experimental: {
    viewTransitions: true,
  },
  integrations: [tailwind(), mdx(), sitemap()],
});
