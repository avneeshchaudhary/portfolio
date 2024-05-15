import { d as createComponent, g as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BFGcR-ZG.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Developed algorithms for resource optimization and analyzed national trends. Contributed to informed decision-making processes within the organization.</p>";

				const frontmatter = {"company":"Transport Canada","role":"Data Analyst","dateStart":"2022-09-01T00:00:00.000Z","dateEnd":{"discriminant":false,"value":"2023-04-14T00:00:00.000Z"}};
				const file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TC.md";
				const url = undefined;
				function rawContent() {
					return "Developed algorithms for resource optimization and analyzed national trends. Contributed to informed decision-making processes within the organization.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
