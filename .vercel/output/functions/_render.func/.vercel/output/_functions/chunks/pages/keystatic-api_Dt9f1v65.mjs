import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, singleton, fields, collection } from '@keystatic/core';

function makeHandler(_config) {
  var _config$clientId, _config$clientSecret, _config$secret;
  const handler = makeGenericAPIRouteHandler({
    ..._config,
    clientId: (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : tryOrUndefined(() => {
      return {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://avneeshchaudhary.com", "ASSETS_PREFIX": undefined}.KEYSTATIC_GITHUB_CLIENT_ID;
    }),
    clientSecret: (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : tryOrUndefined(() => {
      return {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://avneeshchaudhary.com", "ASSETS_PREFIX": undefined}.KEYSTATIC_GITHUB_CLIENT_SECRET;
    }),
    secret: (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : tryOrUndefined(() => {
      return {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://avneeshchaudhary.com", "ASSETS_PREFIX": undefined}.KEYSTATIC_SECRET;
    })
  }, {
    slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
  });
  return async function keystaticAPIRoute(context) {
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

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

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const keystaticApi = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

export { config as c, keystaticApi as k };
