const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs/promises");
const font2base64 = require("node-font2base64");

const formatMonobankData = require("../donation-tracker/formatMonobankData");
const { imageFromBufferToBase64 } = require("../../utils/toBase64");

const FONTS_CSS = "public/styles/fonts.css";
const INSTA_STORY_TEMPLATE_HTML = "views/sharing/story.hbs";
const STORY_CSS = "public/styles/sharing/story.css";
const COMPONENTS_CSS = "public/styles/components.css";
const VARIABLES_CSS = "public/styles/variables.css";
const OVERRIDES_CSS = "public/styles/overrides.css";
const HERO_IMG = "public/images/hero.jpg";

const CSS_FILES = [FONTS_CSS, VARIABLES_CSS, OVERRIDES_CSS, COMPONENTS_CSS, STORY_CSS];

// TELL ABOUT THIS FUNCTION WHY WE NEED IT
const getPageTemplate = (pagePath) => fs.readFile(pagePath, { encoding: "utf-8" });

const getInstaStoryParams = async () => {
  console.log("getInstaStoryParams 0");
  const font = await font2base64.encodeToDataUrl("public/fonts/fonts.ttf");
  console.log("getInstaStoryParams 1");
  const cssFilesContent = CSS_FILES.map((path) => fs.readFile(path, { encoding: "utf-8" }));
  const [imageContent, ...cssPages] = await Promise.all(
    [fs.readFile(HERO_IMG)].concat(cssFilesContent)
  );
  console.log("getInstaStoryParams 2");
  const css = cssPages.join("\n");
  const heroImg = imageFromBufferToBase64(imageContent);

  return {
    font,
    css,
    heroImg,
  };
};

async function createInstagramStoryImage(jar) {
  const promises = [getInstaStoryParams(), getPageTemplate(INSTA_STORY_TEMPLATE_HTML)];
  const [{ font, css, heroImg }, page] = await Promise.all(promises);

  const data = formatMonobankData(jar);
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
      ...data,
    },
  });

  return jar;
}

module.exports = {
  createInstagramStoryImage,
  getInstaStoryParams,
};
