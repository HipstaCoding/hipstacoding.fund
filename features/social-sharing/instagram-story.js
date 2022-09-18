const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs/promises");
const font2base64 = require('node-font2base64')

const getMonobankClientData = require("../donation-tracker/getMonobankClientInfo");
const formatMonobankData = require("../donation-tracker/formatMonobankData");

const TEMPLATE_HTML = "views/social-sharing/story.hbs";
const COMPONENTS_CSS = "views/social-sharing/components.css";
const STORY_CSS = "views/social-sharing/story.css";
const VARIABLES_CSS = "views/social-sharing/variables.css";
const OVERRIDES_CSS = "views/social-sharing/overrides.css";
const INDEX_CSS = "views/social-sharing/index.css";
const HERO_IMG = "views/images/mavic3.jpg";

const FILES = [TEMPLATE_HTML, VARIABLES_CSS, OVERRIDES_CSS, COMPONENTS_CSS, INDEX_CSS, STORY_CSS];

const imageFromBufferToBase64 = (image) => {
  const base64Image = new Buffer.from(image).toString('base64');
  const dataURI = 'data:image/jpeg;base64,' + base64Image;
  return dataURI;
}

module.exports = async function createInstagramStory() {
  const paths = FILES;
  const font = font2base64.encodeToDataUrlSync("views/fonts/fonts.ttf");

  const [page, ...rest] = await Promise.all(
    paths.map((path) => fs.readFile(path, { encoding: "utf-8" }))
  );

  const imageContent = await fs.readFile(HERO_IMG);
  const css = rest.join("\n");
  const heroImg = imageFromBufferToBase64(imageContent);

  const jar = await getMonobankClientData();
  const data = await formatMonobankData(jar);

  await nodeHtmlToImage({
    output: "public/images/story.jpg",
    html: page,
    puppeteerArgs: {
      args: ["--no-sandbox"],
    },
    content: {
      css,
      heroImg,
      font,
    ...data
    },
  });
}