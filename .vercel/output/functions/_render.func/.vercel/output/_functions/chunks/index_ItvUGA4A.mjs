import { c as createComponent, d as renderTemplate, m as maybeRenderHead, u as unescapeHTML, s as spreadAttributes } from './astro_BFTLNmQ5.mjs';
import { g as getImage } from './pages/generic_B9eQL_em.mjs';
import 'clsx';

const Astro__ZvtNw8 = new Proxy({"src":"/_astro/pixhawk.BehZV_pm.jpg","width":1468,"height":1252,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/blog/01-Drone-Build/pixhawk.jpg";
							}
							
							return target[name];
						}
					});

const Astro__Z9jbvC = new Proxy({"src":"/_astro/Teamwork.D_mvPFTK.webp","width":938,"height":1252,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/blog/01-Drone-Build/Teamwork.webp";
							}
							
							return target[name];
						}
					});

const images = async function(html) {
					const imageSources = {};
					{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "pixhawk\\.jpg" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "pixhawk.jpg" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: Astro__ZvtNw8, ...props});
													occurrenceCounter++;
											}
									}
{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "Teamwork\\.webp" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "Teamwork.webp" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: Astro__Z9jbvC, ...props});
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
			const html = await updateImageReferences("<p>Have you ever wondered about building a drone that could potentially save lives? I’ve been fortunate to be part of an incredible project aimed at developing a semi-autonomous drone to assist emergency responders. This blog post will explore the technical challenges and innovations involved in building an emergency response drone.</p>\n<p><img src=\"/Quadcoptor.webp\" alt=\"image\"></p>\n<h2 id=\"conceptualization\">Conceptualization</h2>\n<p>The project began with a clear objective: to create a drone that enhances the efficiency of emergency services. My role as a Technical Member involved choosing and integrating the drone’s core hardware components.</p>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;pixhawk.jpg&#x22;,&#x22;alt&#x22;:&#x22;image&#x22;,&#x22;index&#x22;:0}\"></p>\n<p>Here’s a table of the key components we utilized:</p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th><strong>Component</strong></th><th><strong>Description</strong></th><th><strong>Function</strong></th></tr></thead><tbody><tr><td><strong>Frame</strong></td><td>Carbon fiber, 50 cm x 50 cm x 20 cm</td><td>Supports and mounts components</td></tr><tr><td><strong>Flight Controller</strong></td><td>Pixhawk 4 Mini</td><td>Manages flight, navigation, and stability</td></tr><tr><td><strong>Motors &#x26; Propellers</strong></td><td>Brushless DC motors, 12-inch carbon fiber propellers</td><td>Provides lift and maneuverability</td></tr><tr><td><strong>Battery</strong></td><td>LiPo 5000 mAh, 14.8V</td><td>Powers the drone</td></tr><tr><td><strong>Sensors</strong></td><td>GPS, LiDAR, Ultrasonic, Thermal Camera</td><td>Enables navigation, obstacle avoidance, and search operations</td></tr><tr><td><strong>Communication</strong></td><td>2.4 GHz telemetry, 5.8 GHz video</td><td>Facilitates real-time data and video transmission</td></tr><tr><td><strong>Computational Unit</strong></td><td>NVIDIA Jetson Nano</td><td>Processes data for autonomous operations</td></tr><tr><td><strong>Software</strong></td><td>Custom on DroneKit, OpenCV</td><td>Manages flight and obstacle avoidance, provides control and monitoring interfaces</td></tr></tbody></table>\n<blockquote>\n<p><strong>Key Takeaway:</strong> Identify your drone’s requirements early on—its load capacity, flight range, and data collection capabilities.</p>\n</blockquote>\n<h2 id=\"system-design-and-integration\">System Design and Integration</h2>\n<p>We used the Pixhawk 4 Mini flight controller as the central hub for communication with GPS and sensors like LiDAR and ultrasonic for real-time obstacle detection. Each motor is connected to a 30A electronic speed controller (ESC), linked back to the power distribution board for effective power management across all systems.</p>\n<blockquote>\n<p><strong>Key Takeaway:</strong> Precise placement and connectivity of components are crucial and often require several iterations to perfect.</p>\n</blockquote>\n<h2 id=\"testing-and-optimization\">Testing and Optimization</h2>\n<p>Our initial tests, aimed to be straightforward, presented unexpected challenges. Here’s an overview of our testing activities and the issues we faced:</p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Testing Activity</th><th>Details</th></tr></thead><tbody><tr><td>Motor Performance Testing</td><td>Extensive testing at various thrust levels, with performance analytics.</td></tr><tr><td>Motion Orientation Configuration</td><td>Setup verified in flight software for stability.</td></tr><tr><td>ESC Recalibration</td><td>Adjusted ESCs for optimal communication with the flight controller.</td></tr><tr><td>Weight Monitoring</td><td>Ensured optimal drone weight for performance efficiency.</td></tr><tr><td>Propeller Matching</td><td>Confirmed proper configurations for balanced dynamics.</td></tr></tbody></table>\n<p>Challenges Encountered:</p>\n<ul>\n<li><strong>Battery Issues</strong>: Multiple “bad battery” warnings led to a review of our battery management systems.</li>\n</ul>\n<blockquote>\n<p><strong>Key Takeaway:</strong> Continuous testing and adjustments are vital. Real-world conditions teach resilience and adaptability.</p>\n</blockquote>\n<h2 id=\"team-collaboration\">Team Collaboration</h2>\n<p>Collaborating with a diverse team of experts was a key highlight of this project. Everyone’s unique skills contributed significantly, making the drone more than just a machine.</p>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;Teamwork.webp&#x22;,&#x22;alt&#x22;:&#x22;image&#x22;,&#x22;index&#x22;:0}\"></p>\n<blockquote>\n<p><strong>Secret to Success:</strong> Effective communication and occasional team meals were essential for team morale.</p>\n</blockquote>\n<h2 id=\"the-first-flight\">The First Flight</h2>\n<p>Despite legal constraints, our first 10-second test flight was a breakthrough, demonstrating our adherence to safety protocols and our commitment to the project.</p>\n<p>We are excited about future possibilities and enhancements for our drone project.</p>\n<p>This journey has been both challenging and rewarding, emphasizing the importance of innovation, teamwork, and perseverance in the field of drone technology.</p>");
	

				const frontmatter = {"title":"Building a Drone: Practical Integration","description":"Key lessons from my experience building a semi-autonomous drone.","date":"Apr 22 2024"};
				const file = "/Users/avneeshchaudhary/Documents/Projects/astro/demo/portfolio/src/content/blog/01-Drone-Build/index.md";
				const url = undefined;
				function rawContent() {
					return "Have you ever wondered about building a drone that could potentially save lives? I've been fortunate to be part of an incredible project aimed at developing a semi-autonomous drone to assist emergency responders. This blog post will explore the technical challenges and innovations involved in building an emergency response drone.\n\n![image](/Quadcoptor.webp)\n\n## Conceptualization\n\nThe project began with a clear objective: to create a drone that enhances the efficiency of emergency services. My role as a Technical Member involved choosing and integrating the drone's core hardware components.\n\n![image](pixhawk.jpg)\n\nHere’s a table of the key components we utilized:\n\n| **Component**              | **Description**                                      | **Function**                                                                                   |\n|----------------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------|\n| **Frame**                  | Carbon fiber, 50 cm x 50 cm x 20 cm                  | Supports and mounts components                                                                 |\n| **Flight Controller**      | Pixhawk 4 Mini                                       | Manages flight, navigation, and stability                                                     |\n| **Motors & Propellers**    | Brushless DC motors, 12-inch carbon fiber propellers | Provides lift and maneuverability                                                              |\n| **Battery**                | LiPo 5000 mAh, 14.8V                                 | Powers the drone                                                                               |\n| **Sensors**                | GPS, LiDAR, Ultrasonic, Thermal Camera               | Enables navigation, obstacle avoidance, and search operations                                  |\n| **Communication**          | 2.4 GHz telemetry, 5.8 GHz video                     | Facilitates real-time data and video transmission                                              |\n| **Computational Unit**     | NVIDIA Jetson Nano                                   | Processes data for autonomous operations                                                       |\n| **Software**               | Custom on DroneKit, OpenCV                           | Manages flight and obstacle avoidance, provides control and monitoring interfaces              |\n\n> **Key Takeaway:** Identify your drone's requirements early on—its load capacity, flight range, and data collection capabilities.\n\n## System Design and Integration\n\nWe used the Pixhawk 4 Mini flight controller as the central hub for communication with GPS and sensors like LiDAR and ultrasonic for real-time obstacle detection. Each motor is connected to a 30A electronic speed controller (ESC), linked back to the power distribution board for effective power management across all systems.\n\n> **Key Takeaway:** Precise placement and connectivity of components are crucial and often require several iterations to perfect.\n\n## Testing and Optimization\n\nOur initial tests, aimed to be straightforward, presented unexpected challenges. Here’s an overview of our testing activities and the issues we faced:\n\n| Testing Activity                 | Details                                                                 |\n|----------------------------------|-------------------------------------------------------------------------|\n| Motor Performance Testing        | Extensive testing at various thrust levels, with performance analytics. |\n| Motion Orientation Configuration | Setup verified in flight software for stability.                        |\n| ESC Recalibration                | Adjusted ESCs for optimal communication with the flight controller.     |\n| Weight Monitoring                | Ensured optimal drone weight for performance efficiency.                |\n| Propeller Matching               | Confirmed proper configurations for balanced dynamics.                  |\n\nChallenges Encountered:\n- **Battery Issues**: Multiple \"bad battery\" warnings led to a review of our battery management systems.\n\n>**Key Takeaway:** Continuous testing and adjustments are vital. Real-world conditions teach resilience and adaptability.\n\n## Team Collaboration\n\nCollaborating with a diverse team of experts was a key highlight of this project. Everyone’s unique skills contributed significantly, making the drone more than just a machine.\n\n![image](Teamwork.webp)\n\n>**Secret to Success:** Effective communication and occasional team meals were essential for team morale.\n\n## The First Flight\n\nDespite legal constraints, our first 10-second test flight was a breakthrough, demonstrating our adherence to safety protocols and our commitment to the project.\n\n\n\nWe are excited about future possibilities and enhancements for our drone project.\n\nThis journey has been both challenging and rewarding, emphasizing the importance of innovation, teamwork, and perseverance in the field of drone technology.";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"conceptualization","text":"Conceptualization"},{"depth":2,"slug":"system-design-and-integration","text":"System Design and Integration"},{"depth":2,"slug":"testing-and-optimization","text":"Testing and Optimization"},{"depth":2,"slug":"team-collaboration","text":"Team Collaboration"},{"depth":2,"slug":"the-first-flight","text":"The First Flight"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
