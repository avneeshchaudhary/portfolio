/* empty css                                         */
import { A as AstroError, U as UnknownContentCollectionError, c as createComponent, r as renderUniqueStylesheet, a as renderScriptElement, b as createHeadAndContent, d as renderTemplate, e as renderComponent, u as unescapeHTML, f as createAstro, g as addAttribute, m as maybeRenderHead, h as renderSlot, s as spreadAttributes, i as renderHead } from '../astro_BFTLNmQ5.mjs';
import 'kleur/colors';
import { p as prependForwardSlash } from '../astro/assets-service_CkDDNIHh.mjs';
/* empty css                           */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://avneeshchaudhary.com", "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/01-Drone-Build/index.md": () => import('../index_Bq2UtG5A.mjs'),"/src/content/projects/project-1/index.md": () => import('../index_d9E8KkYo.mjs'),"/src/content/work/PSPC.md": () => import('../PSPC_C0-Gxbs7.mjs'),"/src/content/work/TBS.md": () => import('../TBS_BfCoPEZn.mjs'),"/src/content/work/TC.md": () => import('../TC_Ahp0czsu.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/home-page/index.yaml": () => import('../index_BhALiVxh.mjs')});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"home-page":{"type":"data","entries":{"index":"/src/content/home-page/index.yaml"}},"work":{"type":"content","entries":{"pspc":"/src/content/work/PSPC.md","tbs":"/src/content/work/TBS.md","tc":"/src/content/work/TC.md"}},"blog":{"type":"content","entries":{"01-drone-build":"/src/content/blog/01-Drone-Build/index.md"}},"projects":{"type":"content","entries":{"project-1":"/src/content/projects/project-1/index.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/01-Drone-Build/index.md": () => import('../index_mRuYtCVO.mjs'),"/src/content/projects/project-1/index.md": () => import('../index_BXZBV178.mjs'),"/src/content/work/PSPC.md": () => import('../PSPC_N8t76qHl.mjs'),"/src/content/work/TBS.md": () => import('../TBS_zUVPRxIg.mjs'),"/src/content/work/TC.md": () => import('../TC_CmY58fB2.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const inter400 = "/_astro/inter-latin-400-normal.BT1H-PT_.woff2";

const inter600 = "/_astro/inter-latin-600-normal.B2Ssfs8e.woff2";

const lora400 = "/_astro/lora-latin-400-normal.CvHVDnm4.woff2";

const lora600 = "/_astro/lora-latin-600-normal.DUWh3m6k.woff2";

const $$Astro$c = createAstro("https://avneeshchaudhary.com");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$b = createAstro("https://avneeshchaudhary.com");
const $$Head = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Head;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/nano.png" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>\u{1F468}\u{1F3FC}\u200D\u{1F4BB}</text></svg>"><meta name="generator"', '><!-- Font preloads --><link rel="preload"', ' as="font" type="font/woff2" crossorigin><link rel="preload"', ' as="font" type="font/woff2" crossorigin><link rel="preload"', ' as="font" type="font/woff2" crossorigin><link rel="preload"', ' as="font" type="font/woff2" crossorigin><!-- Canonical URL --><link rel="canonical"', "><!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', ">", '<script>\n  function init() {\n    preloadTheme();\n    onScroll();\n    animate();\n\n    const backToTop = document.getElementById("back-to-top");\n    backToTop?.addEventListener("click", (event) => scrollToTop(event));\n\n    const backToPrev = document.getElementById("back-to-prev");\n    backToPrev?.addEventListener("click", () => window.history.back());\n\n    const lightThemeButton = document.getElementById("light-theme-button");\n    lightThemeButton?.addEventListener("click", () => {\n      localStorage.setItem("theme", "light");\n      toggleTheme(false);\n    });\n\n    const darkThemeButton = document.getElementById("dark-theme-button");\n    darkThemeButton?.addEventListener("click", () => {\n      localStorage.setItem("theme", "dark");\n      toggleTheme(true);\n    });\n\n    const systemThemeButton = document.getElementById("system-theme-button");\n    systemThemeButton?.addEventListener("click", () => {\n      localStorage.setItem("theme", "system");\n      toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);\n    });\n\n    window.matchMedia("(prefers-color-scheme: dark)")\n      .addEventListener("change", event => {\n        if (localStorage.theme === "system") {\n          toggleTheme(event.matches);\n        }\n      }\n    );\n\n    document.addEventListener("scroll", onScroll);\n  }\n\n  function animate() {\n    const animateElements = document.querySelectorAll(".animate");\n\n    animateElements.forEach((element, index) => {\n      setTimeout(() => {\n        element.classList.add("show");\n      }, index * 150);\n    });\n  }\n\n  function onScroll() {\n    if (window.scrollY > 0) {\n      document.documentElement.classList.add("scrolled");\n    } else {\n      document.documentElement.classList.remove("scrolled");\n    }\n  }\n\n  function scrollToTop(event) {\n    event.preventDefault();\n    window.scrollTo({\n      top: 0,\n      behavior: "smooth"\n    });\n  }\n\nfunction toggleTheme(dark) {\n    const css = document.createElement("style");\n\n    css.appendChild(\n      document.createTextNode(\n        `* {\n             -webkit-transition: none !important;\n             -moz-transition: none !important;\n             -o-transition: none !important;\n             -ms-transition: none !important;\n             transition: none !important;\n          }\n        `,\n      )\n    );\n\n    document.head.appendChild(css);\n\n    if (dark) {\n      document.documentElement.classList.add("dark");\n    } else {\n      document.documentElement.classList.remove("dark");\n    }\n\n  window.getComputedStyle(css).opacity;\n    document.head.removeChild(css);\n  }\n\n  function preloadTheme() {\n    const userTheme = localStorage.theme;\n\n    if (userTheme === "light" || userTheme === "dark") {\n      toggleTheme(userTheme === "dark");\n    } else {\n      toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);\n    }\n  }\n\n  document.addEventListener("DOMContentLoaded", () => init());\n  document.addEventListener("astro:after-swap", () => init());\n  preloadTheme();\n<\/script>'], ['<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>\u{1F468}\u{1F3FC}\u200D\u{1F4BB}</text></svg>"><meta name="generator"', '><!-- Font preloads --><link rel="preload"', ' as="font" type="font/woff2" crossorigin><link rel="preload"', ' as="font" type="font/woff2" crossorigin><link rel="preload"', ' as="font" type="font/woff2" crossorigin><link rel="preload"', ' as="font" type="font/woff2" crossorigin><!-- Canonical URL --><link rel="canonical"', "><!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', ">", '<script>\n  function init() {\n    preloadTheme();\n    onScroll();\n    animate();\n\n    const backToTop = document.getElementById("back-to-top");\n    backToTop?.addEventListener("click", (event) => scrollToTop(event));\n\n    const backToPrev = document.getElementById("back-to-prev");\n    backToPrev?.addEventListener("click", () => window.history.back());\n\n    const lightThemeButton = document.getElementById("light-theme-button");\n    lightThemeButton?.addEventListener("click", () => {\n      localStorage.setItem("theme", "light");\n      toggleTheme(false);\n    });\n\n    const darkThemeButton = document.getElementById("dark-theme-button");\n    darkThemeButton?.addEventListener("click", () => {\n      localStorage.setItem("theme", "dark");\n      toggleTheme(true);\n    });\n\n    const systemThemeButton = document.getElementById("system-theme-button");\n    systemThemeButton?.addEventListener("click", () => {\n      localStorage.setItem("theme", "system");\n      toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);\n    });\n\n    window.matchMedia("(prefers-color-scheme: dark)")\n      .addEventListener("change", event => {\n        if (localStorage.theme === "system") {\n          toggleTheme(event.matches);\n        }\n      }\n    );\n\n    document.addEventListener("scroll", onScroll);\n  }\n\n  function animate() {\n    const animateElements = document.querySelectorAll(".animate");\n\n    animateElements.forEach((element, index) => {\n      setTimeout(() => {\n        element.classList.add("show");\n      }, index * 150);\n    });\n  }\n\n  function onScroll() {\n    if (window.scrollY > 0) {\n      document.documentElement.classList.add("scrolled");\n    } else {\n      document.documentElement.classList.remove("scrolled");\n    }\n  }\n\n  function scrollToTop(event) {\n    event.preventDefault();\n    window.scrollTo({\n      top: 0,\n      behavior: "smooth"\n    });\n  }\n\nfunction toggleTheme(dark) {\n    const css = document.createElement("style");\n\n    css.appendChild(\n      document.createTextNode(\n        \\`* {\n             -webkit-transition: none !important;\n             -moz-transition: none !important;\n             -o-transition: none !important;\n             -ms-transition: none !important;\n             transition: none !important;\n          }\n        \\`,\n      )\n    );\n\n    document.head.appendChild(css);\n\n    if (dark) {\n      document.documentElement.classList.add("dark");\n    } else {\n      document.documentElement.classList.remove("dark");\n    }\n\n  window.getComputedStyle(css).opacity;\n    document.head.removeChild(css);\n  }\n\n  function preloadTheme() {\n    const userTheme = localStorage.theme;\n\n    if (userTheme === "light" || userTheme === "dark") {\n      toggleTheme(userTheme === "dark");\n    } else {\n      toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);\n    }\n  }\n\n  document.addEventListener("DOMContentLoaded", () => init());\n  document.addEventListener("astro:after-swap", () => init());\n  preloadTheme();\n<\/script>'])), addAttribute(Astro2.generator, "content"), addAttribute(inter400, "href"), addAttribute(inter600, "href"), addAttribute(lora400, "href"), addAttribute(lora600, "href"), addAttribute(canonicalURL, "href"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}));
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/Head.astro", void 0);

const $$Astro$a = createAstro("https://avneeshchaudhary.com");
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Container;
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto max-w-screen-sm px-5"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/Container.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function readingTime(html) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}
function dateRange(startDate, endDate) {
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear().toString();
  let endMonth;
  let endYear;
  if (endDate) {
    if (typeof endDate === "string") {
      endMonth = "";
      endYear = endDate;
    } else {
      endMonth = endDate.toLocaleString("default", { month: "short" });
      endYear = endDate.getFullYear().toString();
    }
  }
  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
}

const $$Astro$9 = createAstro("https://avneeshchaudhary.com");
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Link;
  const { href, external, underline = true, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(external ? "_blank" : "_self", "target")}${addAttribute(cn("inline-block decoration-black/15 dark:decoration-white/30 hover:decoration-black/25 hover:dark:decoration-white/50 text-current hover:text-black hover:dark:text-white transition-colors duration-300 ease-in-out", underline && "underline underline-offset-2"), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/Link.astro", void 0);

const SITE = {
  NAME: "Avneesh Chaudhary",
  EMAIL: "hey@avneeshchaudhary.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3
};
const HOME = {
  TITLE: "Home",
  DESCRIPTION: "Avneesh Chaudhary (he/him) is a Computer Engineer living in Kitchener-Waterloo. He's previously built things at TBS, PSPC, and Transport Canada."
};
const BLOG = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about."
};
const WORK = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done."
};
const PROJECTS = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects."
};
const SOCIALS = [
  {
    NAME: "github",
    HREF: "https://github.com/avneeshchaudhary"
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/avneeshchaudhary"
  }
];

const $$Astro$8 = createAstro("https://avneeshchaudhary.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <div class="flex flex-wrap gap-y-2 justify-between"> ${renderComponent($$result2, "Link", $$Link, { "href": "/", "underline": false }, { "default": ($$result3) => renderTemplate` <div class="font-semibold"> ${SITE.NAME} </div> ` })} <nav class="flex gap-1"> ${renderComponent($$result2, "Link", $$Link, { "href": "/blog" }, { "default": ($$result3) => renderTemplate`
blog
` })} <span> ${`/`} </span> ${renderComponent($$result2, "Link", $$Link, { "href": "/work" }, { "default": ($$result3) => renderTemplate`
work
` })} <span> ${`/`} </span> ${renderComponent($$result2, "Link", $$Link, { "href": "/projects" }, { "default": ($$result3) => renderTemplate`
projects
` })} </nav> </div> ` })} </header>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/Header.astro", void 0);

const $$Astro$7 = createAstro("https://avneeshchaudhary.com");
const $$BackToTop = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$BackToTop;
  return renderTemplate`${maybeRenderHead()}<button id="back-to-top" class="relative group w-fit flex pl-8 pr-3 py-1.5 flex-nowrap rounded border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 left-2 -translate-y-1/2 size-4 stroke-2 fill-none stroke-current rotate-90"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-2 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 5 12 12 19" class="translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> <div class="text-sm">
Back to top
</div> </button>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/BackToTop.astro", void 0);

const $$Astro$6 = createAstro("https://avneeshchaudhary.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="animate"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <div class="relative"> <div class="absolute right-0 -top-20"> ${renderComponent($$result2, "BackToTop", $$BackToTop, {})} </div> </div> <div class="flex justify-between items-center"> <div>
&copy; 2024 ${`|`} ${SITE.NAME} </div> <div class="flex flex-wrap gap-1 items-center"> <button id="light-theme-button" aria-label="Light theme" class="group size-8 flex items-center justify-center rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-black group-hover:dark:stroke-white transition-colors duration-300 ease-in-out"> <circle cx="12" cy="12" r="5"></circle> <line x1="12" y1="1" x2="12" y2="3"></line> <line x1="12" y1="21" x2="12" y2="23"></line> <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line> <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line> <line x1="1" y1="12" x2="3" y2="12"></line> <line x1="21" y1="12" x2="23" y2="12"></line> <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line> </svg> </button> <button id="dark-theme-button" aria-label="Dark theme" class="group size-8 flex items-center justify-center rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-black group-hover:dark:stroke-white transition-colors duration-300 ease-in-out"> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path> </svg> </button> <button id="system-theme-button" aria-label="System theme" class="group size-8 flex items-center justify-center rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-black group-hover:dark:stroke-white transition-colors duration-300 ease-in-out"> <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect> <line x1="8" y1="21" x2="16" y2="21"></line> <line x1="12" y1="17" x2="12" y2="21"></line> </svg> </button> </div> </div> ` })} </footer>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/Footer.astro", void 0);

const $$Astro$5 = createAstro("https://avneeshchaudhary.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} `;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

const $$Astro$4 = createAstro("https://avneeshchaudhary.com");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "Head", $$Head, { "title": `${title} | ${SITE.NAME}`, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderComponent($$result, "SpeedInsights", $$Index, {})} ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/layouts/PageLayout.astro", void 0);

const $$Astro$3 = createAstro("https://avneeshchaudhary.com");
const $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })} </time>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/FormattedDate.astro", void 0);

const $$Astro$2 = createAstro("https://avneeshchaudhary.com");
const $$BackToPrev = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BackToPrev;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="relative group w-fit flex pl-7 pr-3 py-1.5 flex-nowrap rounded border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 left-2 -translate-y-1/2 size-4 stroke-2 fill-none stroke-current"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-2 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 5 12 12 19" class="translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> <div class="text-sm"> ${renderSlot($$result, $$slots["default"])} </div> </a>`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/components/BackToPrev.astro", void 0);

const $$Astro$1 = createAstro("https://avneeshchaudhary.com");
async function getStaticPaths$1() {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$$1;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": post.data.title, "description": post.data.description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> ${renderComponent($$result3, "BackToPrev", $$BackToPrev, { "href": "/blog" }, { "default": ($$result4) => renderTemplate`
Back to blog
` })} </div> <div class="space-y-1 my-10"> <div class="animate flex items-center gap-1.5"> <div class="font-base text-sm"> ${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": post.data.date })} </div>
&bull;
<div class="font-base text-sm"> ${readingTime(post.body)} </div> </div> <div class="animate text-2xl font-semibold text-black dark:text-white"> ${post.data.title} </div> </div> <article class="animate"> ${renderComponent($$result3, "Content", Content, {})} </article> ` })} ` })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/blog/[...slug].astro", void 0);

const $$file$1 = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/blog/[...slug].astro";
const $$url$1 = "/blog/[...slug]";

const ____slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$1,
  file: $$file$1,
  getStaticPaths: getStaticPaths$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://avneeshchaudhary.com");
async function getStaticPaths() {
  const projects = (await getCollection("projects")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: project
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const project = Astro2.props;
  const { Content } = await project.render();
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": project.data.title, "description": project.data.description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> ${renderComponent($$result3, "BackToPrev", $$BackToPrev, { "href": "/projects" }, { "default": ($$result4) => renderTemplate`
Back to projects
` })} </div> <div class="space-y-1 my-10"> <div class="animate flex items-center gap-1.5"> <div class="font-base text-sm"> ${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": project.data.date })} </div>
&bull;
<div class="font-base text-sm"> ${readingTime(project.body)} </div> </div> <div class="animate text-2xl font-semibold text-black dark:text-white"> ${project.data.title} </div> ${(project.data.demoURL || project.data.repoURL) && renderTemplate`<nav class="animate flex gap-1"> ${project.data.demoURL && renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": project.data.demoURL, "external": true }, { "default": ($$result4) => renderTemplate`
demo
` })}`} ${project.data.demoURL && project.data.repoURL && renderTemplate`<span>/</span>`} ${project.data.repoURL && renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": project.data.repoURL, "external": true }, { "default": ($$result4) => renderTemplate`
repo
` })}`} </nav>`} </div> <article class="animate"> ${renderComponent($$result3, "Content", Content, {})} </article> ` })} ` })}`;
}, "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/projects/[...slug].astro", void 0);

const $$file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/projects/[...slug].astro";
const $$url = "/projects/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Container as $, BLOG as B, HOME as H, PROJECTS as P, SITE as S, WORK as W, ____slug_$1 as _, $$PageLayout as a, $$Link as b, SOCIALS as c, dateRange as d, ____slug_ as e, getCollection as g };
