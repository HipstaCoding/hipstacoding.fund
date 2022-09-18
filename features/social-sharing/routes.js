const express = require("express");
const router = express.Router();
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

const imageFromBufferToBase64 = (image) => {
  const base64Image = new Buffer.from(image).toString('base64');
  const dataURI = 'data:image/jpeg;base64,' + base64Image;
  return dataURI;
}

const FILES = [TEMPLATE_HTML, VARIABLES_CSS, OVERRIDES_CSS, COMPONENTS_CSS, INDEX_CSS, STORY_CSS];

router.get("/images/facebook", async function (_req, res) {
  // const image = await createImage();
  // res.writeHead(200, { "Content-Type": "image/png" });
  // const createImage = async () => {
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

    // return image;
  // };
  res.render("social-sharing/story",  {
    css,
    heroImg,
    font,
    ...data
  });
});

router.get("/instagram", async function (req, res) {
  res.render("index");
});

module.exports = router;
