/* empty css                                         */
import { f as createAstro, c as createComponent, d as renderTemplate, m as maybeRenderHead, g as addAttribute, e as renderComponent } from '../astro_BFTLNmQ5.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Container, B as BLOG, a as $$PageLayout, P as PROJECTS, d as dateRange, W as WORK, S as SITE, b as $$Link, c as SOCIALS, H as HOME } from './__BzlA2ykd.mjs';
import { DocumentRenderer } from '@keystatic/core/renderer';
import 'clsx';
import { createReader } from '@keystatic/core/reader';
import { config as config$1, singleton, fields, collection } from '@keystatic/core';

const config = config$1({
  storage: process.env.NODE_ENV === "development" ? { kind: "local" } : { kind: "cloud" },
  cloud: {
    project: "gingerich/portfolio"
  },
  singletons: {
    homePage: singleton({
      label: "Home Page",
      path: "src/content/home-page/",
      schema: {
        heroIntro: fields.document({
          label: "Hero intro text",
          formatting: true
        })
      }
    })
  },
  collections: {
    posts: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/**/",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        date: fields.date({
          label: "Publish Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true }
        }),
        draft: fields.checkbox({ label: "Draft" }),
        content: fields.mdx({
          label: "Content",
          extension: "md",
          options: {
            divider: true,
            link: true,
            image: {
              directory: "src/assets/images/blog",
              publicPath: "../../../assets/images/blog/"
            }
          }
        })
      }
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/**/",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        date: fields.date({ label: "Publish Date", defaultValue: { kind: "today" } }),
        draft: fields.checkbox({ label: "Draft" }),
        demoURL: fields.url({ label: "Demo URL" }),
        repoURL: fields.url({ label: "Repo URL" }),
        content: fields.mdx({
          label: "Content",
          extension: "md",
          options: {
            divider: true,
            link: true,
            image: {
              directory: "src/assets/images/projects",
              publicPath: "../../../assets/images/projects/"
            }
          }
        })
      }
    }),
    work: collection({
      label: "Work",
      slugField: "company",
      path: "src/content/work/*",
      format: { contentField: "content" },
      schema: {
        company: fields.slug({ name: { label: "Company" } }),
        role: fields.text({ label: "Role" }),
        dateStart: fields.date({ label: "Start Date", validation: { isRequired: true } }),
        dateEnd: fields.conditional(
          fields.checkbox({ label: "Currently employed here", defaultValue: false }),
          {
            true: fields.empty(),
            false: fields.date({ label: "End Date", validation: { isRequired: true } })
          }
        ),
        content: fields.mdx({
          label: "Content",
          extension: "md"
        })
      }
    })
  }
});

const $$Astro$4 = createAstro("https://avneeshchaudhary.com");
const $$ArrowCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ArrowCard;
  const { entry } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/${entry.collection}/${entry.slug}`, "href")} class="relative group flex flex-nowrap py-3 px-4 pr-10 rounded-lg border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"> <div class="flex flex-col flex-1 truncate"> <div class="font-semibold"> ${entry.data.title} </div> <div class="text-sm"> ${entry.data.description} </div> </div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 right-2 -translate-y-1/2 size-5 stroke-2 fill-none stroke-current"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-3 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 19 12 12 19" class="-translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> </a>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/ArrowCard.astro", void 0);

const $$Astro$3 = createAstro("https://avneeshchaudhary.com");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const data = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const posts = data.reduce((acc, post) => {
    const year = post.data.date.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});
  const years = Object.keys(posts).sort((a, b) => parseInt(b) - parseInt(a));
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": BLOG.TITLE, "description": BLOG.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-10"> <h3 class="animate font-semibold text-black dark:text-white">
Blog
</h3> <div class="space-y-4"> ${years.map((year) => renderTemplate`<section class="animate space-y-4"> <div class="font-semibold text-black dark:text-white"> ${year} </div> <div> <ul class="flex flex-col gap-4"> ${posts[year].map((post) => renderTemplate`<li> ${renderComponent($$result3, "ArrowCard", $$ArrowCard, { "entry": post })} </li>`)} </ul> </div> </section>`)} </div> </div> ` })} ` })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/blog/index.astro", void 0);

const $$file$3 = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/blog/index.astro";
const $$url$3 = "/blog";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://avneeshchaudhary.com");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": PROJECTS.TITLE, "description": PROJECTS.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-10"> <h3 class="animate font-semibold text-black dark:text-white">
Projects
</h3> <ul class="animate flex flex-col gap-4"> ${projects.map((project) => renderTemplate`<li> ${renderComponent($$result3, "ArrowCard", $$ArrowCard, { "entry": project })} </li>`)} </ul> </div> ` })} ` })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/projects/index.astro", void 0);

const $$file$2 = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/projects/index.astro";
const $$url$2 = "/projects";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://avneeshchaudhary.com");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const collection = (await getCollection("work")).sort((a, b) => new Date(b.data.dateStart).valueOf() - new Date(a.data.dateStart).valueOf());
  const work = await Promise.all(
    collection.map(async (item) => {
      const { Content } = await item.render();
      return { ...item, Content };
    })
  );
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": WORK.TITLE, "description": WORK.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-10"> <h3 class="animate font-semibold text-black dark:text-white">
Work
</h3> <ul class="flex flex-col space-y-4"> ${work.map((entry) => renderTemplate`<li class="animate border-b border-black/10 dark:border-white/25 mt-4 py-8 first-of-type:mt-0 first-of-type:pt-0 last-of-type:border-none"> <div class="text-sm uppercase mb-4"> ${dateRange(entry.data.dateStart, entry.data.dateEnd?.value ?? "Current")} </div> <div class="font-semibold text-black dark:text-white"> ${entry.data.company} </div> <div class="text-sm"> ${entry.data.role} </div> <article> ${renderComponent($$result3, "entry.Content", entry.Content, {})} </article> </li>`)} </ul> </div> ` })} ` })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/work/index.astro", void 0);

const $$file$1 = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/work/index.astro";
const $$url$1 = "/work";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const reader = createReader(process.cwd(), config);

const $$Astro = createAstro("https://avneeshchaudhary.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const blog = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);
  const allwork = (await getCollection("work")).sort((a, b) => new Date(b.data.dateStart).valueOf() - new Date(a.data.dateStart).valueOf()).slice(0, SITE.NUM_WORKS_ON_HOMEPAGE);
  const work = await Promise.all(
    allwork.map(async (item) => {
      const { Content } = await item.render();
      return { ...item, Content };
    })
  );
  const home = await reader.singletons.homePage.readOrThrow();
  const heroIntro = await home.heroIntro();
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": HOME.TITLE, "description": HOME.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 class="animate font-semibold text-black dark:text-white">
Hi, I'm Avneesh <span class="text-4xl">👋🏻</span> </h1> <div class="space-y-16"> <section> <article class="space-y-4 animate"> ${renderComponent($$result3, "DocumentRenderer", DocumentRenderer, { "document": heroIntro })} </article> </section> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between"> <h5 class="font-semibold text-black dark:text-white">
Latest posts
</h5> ${renderComponent($$result3, "Link", $$Link, { "href": "/blog" }, { "default": ($$result4) => renderTemplate`
See all posts
` })} </div> <ul class="flex flex-col gap-4"> ${blog.map((post) => renderTemplate`<li> ${renderComponent($$result3, "ArrowCard", $$ArrowCard, { "entry": post })} </li>`)} </ul> </section> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between"> <h5 class="font-semibold text-black dark:text-white">
Work Experience
</h5> ${renderComponent($$result3, "Link", $$Link, { "href": "/work" }, { "default": ($$result4) => renderTemplate`
See all work
` })} </div> <ul class="flex flex-col space-y-4"> ${work.map((entry) => renderTemplate`<li> <div class="text-sm opacity-75 uppercase mb-2"> ${dateRange(entry.data.dateStart, entry.data.dateEnd?.value ?? "Current")} </div> <div class="font-semibold text-black dark:text-white"> ${entry.data.company} </div> <div class="text-sm opacity-75"> ${entry.data.role} </div> <article> ${renderComponent($$result3, "entry.Content", entry.Content, {})} </article> </li>`)} </ul> </section> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between"> <h5 class="font-semibold text-black dark:text-white">
Recent projects
</h5> ${renderComponent($$result3, "Link", $$Link, { "href": "/projects" }, { "default": ($$result4) => renderTemplate`
See all projects
` })} </div> <ul class="flex flex-col gap-4"> ${projects.map((project) => renderTemplate`<li> ${renderComponent($$result3, "ArrowCard", $$ArrowCard, { "entry": project })} </li>`)} </ul> </section> <section class="animate space-y-4"> <h5 class="font-semibold text-black dark:text-white">
Let's Connect
</h5> <article> <p>
If you want to get in touch with me about something or just to say hi,
            reach out on social media or send me an email.
</p> </article> <ul class="flex flex-wrap gap-2"> ${SOCIALS.map((SOCIAL) => renderTemplate`<li class="flex gap-x-2 text-nowrap"> ${renderComponent($$result3, "Link", $$Link, { "href": SOCIAL.HREF, "external": true, "aria-label": `${SITE.NAME} on ${SOCIAL.NAME}` }, { "default": ($$result4) => renderTemplate`${SOCIAL.NAME}` })} ${"/"} </li>`)} <li class="line-clamp-1"> ${renderComponent($$result3, "Link", $$Link, { "href": `mailto:${SITE.EMAIL}`, "aria-label": `Email ${SITE.NAME}` }, { "default": ($$result4) => renderTemplate`${SITE.EMAIL}` })} </li> </ul> </section> </div> ` })} ` })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$2 as a, index$1 as b, config as c, index as d, index$3 as i };
