const express = require("express");
const router = express.Router();
const { getInstaStoryParams } = require('./instagram-story');

const getMonobankClientData = require("../donation-tracker/getMonobankClientInfo");
const formatMonobankData = require("../donation-tracker/formatMonobankData");

router.get("/images/instagram/story", async function (_req, res) {
  const [{ font, css, heroImg }, jar] = await Promise.all([
    getInstaStoryParams(),
    getMonobankClientData(),
  ]);

  const data = formatMonobankData(jar);
  
  return res.render("social-sharing/story", {
    css,
    heroImg,
    font,
    ...data,
  });
});

router.get("/instagram", async function (req, res) {
  cache.get()
  res.render("index", {  });
});

module.exports = router;
