const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs/promises");
const font2base64 = require("node-font2base64");

const formatMonobankData = require("../donation-tracker/formatMonobankData");
const { imageFromBufferToBase64 } = require("../../utils/toBase64");

const INSTA_STORY_TEMPLATE_HTML = "views/social-sharing/story.hbs";
const COMPONENTS_CSS = "views/social-sharing/components.css";
const STORY_CSS = "views/social-sharing/story.css";
const VARIABLES_CSS = "views/social-sharing/variables.css";
const OVERRIDES_CSS = "views/social-sharing/overrides.css";
const HERO_IMG = "views/images/mavic3.jpg";

const CSS_FILES = [VARIABLES_CSS, OVERRIDES_CSS, COMPONENTS_CSS, STORY_CSS];

// TELL ABOUT THIS FUNCTION WHY WE NEED IT
const getPageTemplate = (pagePath) => fs.readFile(pagePath, { encoding: "utf-8" });

const getInstaStoryParams = async () => {
  console.log("getInstaStoryParams 0");
  const font = await font2base64.encodeToDataUrl("views/fonts/fonts.ttf");
  console.log("getInstaStoryParams 1");
  const [imageContent, ...cssPages] = await Promise.all(
    [fs.readFile(HERO_IMG)].concat(
      CSS_FILES.map((path) => fs.readFile(path, { encoding: "utf-8" }))
    )
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

  const promises = [
    getInstaStoryParams(),
    getPageTemplate(INSTA_STORY_TEMPLATE_HTML),
  ];
  const [{ font, css, heroImg }, page] = await Promise.all(promises);
  console.log("createInstagramStoryImage 2");

  const data = formatMonobankData(jar);
  console.log("before image");
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
  console.log("after image");

  return;
}

module.exports = {
  createInstagramStoryImage,
  getInstaStoryParams,
};
