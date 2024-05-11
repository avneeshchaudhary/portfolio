import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : { kind: "cloud" },
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
      },
    }),
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
              publicPath: "../../../assets/images/blog/",
            }
          }
        }),
      },
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
              publicPath: "../../../assets/images/projects/",
            }
          }
        }),
      },
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
        }),
      },
    }),
  },
});
