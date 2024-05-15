import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://avneeshchaudhary.com",
  integrations: [mdx(), react(), sitemap(), tailwind()].concat(process.env.DISABLE_KEYSTATIC ? [] : keystatic()),
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});