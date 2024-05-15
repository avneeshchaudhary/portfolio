import { c as createComponent, d as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BFTLNmQ5.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Contributed to developing LLM methods and led causal literature reviews, fostering teamwork through strategy discussions with colleagues.</p>";

				const frontmatter = {"company":"Treasury Board of Canada Secretariat","role":"Data Analyst","dateStart":"2023-05-08T00:00:00.000Z","dateEnd":{"discriminant":false,"value":"2023-09-01T00:00:00.000Z"}};
				const file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/work/TBS.md";
				const url = undefined;
				function rawContent() {
					return "\nContributed to developing LLM methods and led causal literature reviews, fostering teamwork through strategy discussions with colleagues.";
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
