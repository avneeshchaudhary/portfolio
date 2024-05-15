import { d as createComponent, g as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BFGcR-ZG.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Created visualizations for data insights and streamlined processes through comprehensive documentation, enhancing organizational efficiency.</p>";

				const frontmatter = {"company":"Public Service Procurement Canada","role":"Data Analyst","dateStart":"2022-01-01T00:00:00.000Z","dateEnd":{"discriminant":false,"value":"2022-09-01T00:00:00.000Z"}};
				const file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/PSPC.md";
				const url = undefined;
				function rawContent() {
					return "\nCreated visualizations for data insights and streamlined processes through comprehensive documentation, enhancing organizational efficiency.\n\n";
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
