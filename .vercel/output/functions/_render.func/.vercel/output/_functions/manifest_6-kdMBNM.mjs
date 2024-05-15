import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_BEmqTF0a.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":true,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/index.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/keystatic-astro-page.CHXy253W.css"}],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://avneeshchaudhary.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/pages/work/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro":"chunks/pages/keystatic-astro-page_CncVyP6M.mjs","\u0000@astrojs-manifest":"manifest_6-kdMBNM.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_B13T0Tfo.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"chunks/keystatic-api_DRD53cBF.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"chunks/keystatic-astro-page_kxa_Gb18.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"chunks/index_BjD_D84J.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"chunks/_.._DOEBAnzu.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"chunks/index_wg48Bbik.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"chunks/_.._BBWo6fKA.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"chunks/robots_FLcPwcU0.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_DkcEv6_k.mjs","\u0000@astro-page:src/pages/work/index@_@astro":"chunks/index_DzgC6jYT.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_jAeg-7e0.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/blog/01-Drone-Build/index.md?astroContentCollectionEntry=true":"chunks/index_Bq2UtG5A.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/projects/project-1/index.md?astroContentCollectionEntry=true":"chunks/index_d9E8KkYo.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/PSPC.md?astroContentCollectionEntry=true":"chunks/PSPC_C0-Gxbs7.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TBS.md?astroContentCollectionEntry=true":"chunks/TBS_BfCoPEZn.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TC.md?astroContentCollectionEntry=true":"chunks/TC_Ahp0czsu.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/home-page/index.yaml?astroDataCollectionEntry=true":"chunks/index_BhALiVxh.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/blog/01-Drone-Build/index.md?astroPropagatedAssets":"chunks/index_COBBTcwO.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/projects/project-1/index.md?astroPropagatedAssets":"chunks/index_BTdHeBoK.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/PSPC.md?astroPropagatedAssets":"chunks/PSPC_BR0mswZD.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TBS.md?astroPropagatedAssets":"chunks/TBS_DmfTplO-.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TC.md?astroPropagatedAssets":"chunks/TC_JpC5er17.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/blog/01-Drone-Build/index.md":"chunks/index_BntkainX.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/projects/project-1/index.md":"chunks/index_DHAnZwcx.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/PSPC.md":"chunks/PSPC_Bqwd20jj.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TBS.md":"chunks/TBS_oyaZ44JH.mjs","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TC.md":"chunks/TC_B2_i_TTe.mjs","@astrojs/react/client.js":"_astro/client.Osr89htk.js","/astro/hoisted.js?q=0":"_astro/hoisted.Ceqleg7E.js","/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.2wd8DYo_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/lighthouse.BRaZeYiw.png","/_astro/app.D0lDE7cS.png","/_astro/pixhawk.BehZV_pm.jpg","/_astro/Teamwork.D_mvPFTK.webp","/_astro/lora-latin-400-normal.CvHVDnm4.woff2","/_astro/inter-latin-400-normal.BT1H-PT_.woff2","/_astro/lora-latin-600-normal.DUWh3m6k.woff2","/_astro/inter-latin-600-normal.B2Ssfs8e.woff2","/_astro/lora-vietnamese-400-normal.vaWCr7o2.woff2","/_astro/lora-cyrillic-400-normal.DXyCOuTk.woff2","/_astro/lora-math-400-normal.QoQvadwx.woff2","/_astro/lora-symbols-400-normal.DmcY0X7a.woff2","/_astro/lora-cyrillic-ext-400-normal.CXkJfJTd.woff2","/_astro/lora-latin-ext-400-normal.Zaohh3s8.woff2","/_astro/lora-latin-400-normal.BGMs03OI.woff","/_astro/inter-latin-400-normal.Cdi8t5Mu.woff","/_astro/lora-cyrillic-ext-600-normal.C7TDeNoj.woff2","/_astro/lora-cyrillic-600-normal.GE5bhziV.woff2","/_astro/lora-math-600-normal.CU8J3siK.woff2","/_astro/lora-symbols-600-normal.DaMEG5Dn.woff2","/_astro/lora-latin-600-normal.31JvEFhQ.woff","/_astro/lora-vietnamese-600-normal.BVdSWJ2U.woff2","/_astro/lora-latin-ext-600-normal.D_NIiHfu.woff2","/_astro/inter-latin-600-normal.Dbvh0wvx.woff","/_astro/lora-vietnamese-400-normal.DhDIvpTE.woff","/_astro/lora-symbols-400-normal.BQXsqyo4.woff","/_astro/lora-math-400-normal.Gsx8lQXW.woff","/_astro/lora-latin-ext-400-normal.C_gIiBKz.woff","/_astro/lora-cyrillic-ext-400-normal.CFh4TfQj.woff","/_astro/lora-cyrillic-400-normal.D1XS6rs-.woff","/_astro/lora-cyrillic-600-normal.D9Zbnu3d.woff","/_astro/lora-vietnamese-600-normal.BNxtpOks.woff","/_astro/lora-cyrillic-ext-600-normal.DJ36qKL9.woff","/_astro/lora-math-600-normal.Bpm_vvix.woff","/_astro/lora-latin-ext-600-normal.CIEFHufk.woff","/_astro/lora-symbols-600-normal.BBvEw2tW.woff","/_astro/_slug_.BoP4z-KH.css","/_astro/keystatic-astro-page.CHXy253W.css","/patrick.webp","/_astro/client.Osr89htk.js","/_astro/hoisted.Ceqleg7E.js","/_astro/index.DjvEYLNn.js","/_astro/keystatic-page.2wd8DYo_.js","/fonts/MonaSans-Light.woff2","/fonts/MonaSans-Regular.woff2","/fonts/MonaSans-SemiBold.woff2","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/blog/index.html","/projects/index.html","/robots.txt","/rss.xml","/work/index.html","/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
