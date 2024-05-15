import { d as createComponent, g as renderTemplate, m as maybeRenderHead, u as unescapeHTML, s as spreadAttributes } from './astro_BFGcR-ZG.mjs';
import { g as getImage } from './pages/generic_CIcGhCkt.mjs';
import 'clsx';

const Astro__1sBVog = new Proxy({"src":"/_astro/lighthouse.BRaZeYiw.png","width":1524,"height":1134,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/projects/project-1/lighthouse.png";
							}
							
							return target[name];
						}
					});

const Astro__UEXut = new Proxy({"src":"/_astro/app.D0lDE7cS.png","width":3358,"height":1912,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/projects/project-1/app.png";
							}
							
							return target[name];
						}
					});

const images = async function(html) {
					const imageSources = {};
					{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "src/content/projects/project-1/lighthouse\\.png" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "src/content/projects/project-1/lighthouse.png" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: Astro__1sBVog, ...props});
													occurrenceCounter++;
											}
									}
{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "src/content/projects/project-1/app\\.png" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "src/content/projects/project-1/app.png" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: Astro__UEXut, ...props});
													occurrenceCounter++;
											}
									}
					return imageSources;
			};

			async function updateImageReferences(html) {
				return images(html).then((imageSources) => {
						return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) => {
								const decodedImagePath = JSON.parse(imagePath.replace(/&#x22;/g, '"'));
		
								// Use the 'index' property for each image occurrence
								const srcKey = decodedImagePath.src + '_' + decodedImagePath.index;
		
								if (imageSources[srcKey].srcSet && imageSources[srcKey].srcSet.values.length > 0) {
										imageSources[srcKey].attributes.srcset = imageSources[srcKey].srcSet.attribute;
								}
		
								const { index, ...attributesWithoutIndex } = imageSources[srcKey].attributes;
		
								return spreadAttributes({
										src: imageSources[srcKey].src,
										...attributesWithoutIndex,
								});
						});
				});
		}
		

		// NOTE: This causes a top-level await to appear in the user's code, which can break very easily due to a Rollup
	  // bug and certain adapters not supporting it correctly. See: https://github.com/rollup/rollup/issues/4708
	  // Tread carefully!
			const html = await updateImageReferences("<p>This project highlights the work towards creating tech solutions that make communication easier for everyone. It’s a web tool that turns spoken words into text, making it accessible for people who may struggle with speech or language barriers.</p>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;src/content/projects/project-1/lighthouse.png&#x22;,&#x22;alt&#x22;:&#x22; Lighthouse Score&#x22;,&#x22;index&#x22;:0}\"></p>\n<h2 id=\"technologies\">Technologies</h2>\n<ul>\n<li><strong>JavaScript</strong>: Used for making the tool work smoothly, like handling what happens when users interact with it.</li>\n<li><strong>React</strong>: Used to build the user interface, making it interactive and responsive.</li>\n<li><strong>Web APIs</strong>: Integrated various web tools to make our tool more useful and interactive.</li>\n</ul>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;src/content/projects/project-1/app.png&#x22;,&#x22;alt&#x22;:&#x22;Screenshot&#x22;,&#x22;index&#x22;:0}\"></p>\n<h2 id=\"how-it-works\">How it works:</h2>\n<ul>\n<li>\n<p><strong>Speech Input:</strong>\nUsers speak into their device’s microphone, providing the audio input for transcription.</p>\n</li>\n<li>\n<p><strong>Real-time Transcription:</strong>\nThe tool utilizes cutting-edge technology, including the Web Speech API, to transcribe the spoken words into text in real time. This process captures the users speech and converts it into written text almost instantly.</p>\n</li>\n<li>\n<p><strong>Language Support:</strong>\nOur tool supports multiple languages, allowing users to communicate in their preferred language with ease. Users can select their desired language from a dropdown menu, and the tool adjusts its transcription capabilities accordingly.</p>\n</li>\n<li>\n<p><strong>Editable Transcripts:</strong>\nThe transcribed text is displayed on the screen in a text area, where users can review and edit it as needed. This feature gives users the flexibility to make corrections or improvements to the transcribed text, ensuring accuracy and clarity.</p>\n</li>\n<li>\n<p><strong>Downloadable Transcripts:</strong>\nOnce satisfied with the transcription, users have the option to download the transcript as a text file. This feature enables users to save and share the transcribed content for future reference or communication purposes.</p>\n</li>\n<li>\n<p><strong>Seamless User Experience:</strong>\nThe tool is designed with a user-friendly interface, making it easy and intuitive to use. Clear instructions and interactive elements guide users through the process, ensuring a seamless experience from start to finish.</p>\n</li>\n</ul>\n<h2 id=\"deployment-on-netlify\">Deployment on Netlify:</h2>\n<p>The tool is deployed on Netlify, a popular platform for hosting and deploying web applications. Netlify offers seamless integration with Git, allowing for automatic deployments whenever changes are pushed to the repository.</p>\n<h2 id=\"license\">License</h2>\n<p>MIT</p>");
	

				const frontmatter = {"title":"Web-based Speech to Text Application","description":"As a web-based platform, it enables seamless transcription of spoken words into text for multilingual users","date":"Mar 18 2024","demoURL":"https://speech2textweb.netlify.app/","repoURL":"https://github.com/avneeshchaudhary/Speech2TextWeb"};
				const file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/projects/project-1/index.md";
				const url = undefined;
				function rawContent() {
					return "This project highlights the work towards creating tech solutions that make communication easier for everyone. It's a web tool that turns spoken words into text, making it accessible for people who may struggle with speech or language barriers.\n\n![ Lighthouse Score](src/content/projects/project-1/lighthouse.png)\n\n\n\n## Technologies\n\n-  **JavaScript**: Used for making the tool work smoothly, like handling what happens when users interact with it.\n-  **React**: Used to build the user interface, making it interactive and responsive.\n-  **Web APIs**: Integrated various web tools to make our tool more useful and interactive.\n\n![Screenshot](src/content/projects/project-1/app.png)\n\n## How it works: \n\n- **Speech Input:**\n   Users speak into their device's microphone, providing the audio input for transcription.\n\n- **Real-time Transcription:**\n   The tool utilizes cutting-edge technology, including the Web Speech API, to transcribe the spoken words into text in real time. This process captures the users speech and converts it into written text almost instantly.\n\n- **Language Support:**\n   Our tool supports multiple languages, allowing users to communicate in their preferred language with ease. Users can select their desired language from a dropdown menu, and the tool adjusts its transcription capabilities accordingly.\n\n-  **Editable Transcripts:**\n   The transcribed text is displayed on the screen in a text area, where users can review and edit it as needed. This feature gives users the flexibility to make corrections or improvements to the transcribed text, ensuring accuracy and clarity.\n\n-  **Downloadable Transcripts:**\n   Once satisfied with the transcription, users have the option to download the transcript as a text file. This feature enables users to save and share the transcribed content for future reference or communication purposes.\n\n-  **Seamless User Experience:**\n   The tool is designed with a user-friendly interface, making it easy and intuitive to use. Clear instructions and interactive elements guide users through the process, ensuring a seamless experience from start to finish.\n\n## Deployment on Netlify:\n\nThe tool is deployed on Netlify, a popular platform for hosting and deploying web applications. Netlify offers seamless integration with Git, allowing for automatic deployments whenever changes are pushed to the repository.\n\n\n## License\n\nMIT";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"technologies","text":"Technologies"},{"depth":2,"slug":"how-it-works","text":"How it works:"},{"depth":2,"slug":"deployment-on-netlify","text":"Deployment on Netlify:"},{"depth":2,"slug":"license","text":"License"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
