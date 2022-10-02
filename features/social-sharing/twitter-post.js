const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs/promises");
const font2base64 = require("node-font2base64");

const formatMonobankData = require("../donation-tracker/formatMonobankData");
const { imageFromBufferToBase64 } = require("../../utils/toBase64");

const INSTA_STORY_TEMPLATE_HTML = "views/social-sharing/twitter.hbs";
const COMPONENTS_CSS = "views/social-sharing/components.css";
const TWITTER_CSS = "views/social-sharing/twitter.css";
const VARIABLES_CSS = "views/social-sharing/variables.css";
const OVERRIDES_CSS = "views/social-sharing/overrides.css";
const HERO_IMG = "views/images/hero.jpg";

const CSS_FILES = [VARIABLES_CSS, OVERRIDES_CSS, COMPONENTS_CSS, TWITTER_CSS];

// TELL ABOUT THIS FUNCTION WHY WE NEED IT
const getPageTemplate = (pagePath) => fs.readFile(pagePath, { encoding: "utf-8" });

const getTwitterPostParams = async () => {
  const font = await font2base64.encodeToDataUrl("views/fonts/fonts.ttf");
  const [imageContent, ...cssPages] = await Promise.all(
    [fs.readFile(HERO_IMG)].concat(
      CSS_FILES.map((path) => fs.readFile(path, { encoding: "utf-8" }))
    )
  );
  const css = cssPages.join("\n");
  const heroImg = imageFromBufferToBase64(imageContent);

  return {
    font,
    css,
    heroImg,
  };
};

async function createTwitterPostImage(jar) {
  const promises = [
    getTwitterPostParams(),
    getPageTemplate(INSTA_STORY_TEMPLATE_HTML),
  ];
  const [{ font, css, heroImg }, page] = await Promise.all(promises);

  const data = formatMonobankData(jar);
  await nodeHtmlToImage({
    output: "public/images/twitter.jpg",
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
  createTwitterPostImage,
  getTwitterPostParams,
};
