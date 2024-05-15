/* empty css                                         */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent } from '../astro_BEmqTF0a.mjs';
import 'kleur/colors';

const $$Astro = createAstro("https://avneeshchaudhary.com");
const prerender = false;
const $$KeystaticAstroPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$KeystaticAstroPage;
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

export { $$KeystaticAstroPage as default, $$file as file, prerender, $$url as url };
