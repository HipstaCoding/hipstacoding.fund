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

  console.log('2')
  const data = formatMonobankData(jar);
  console.log('3')
  
  return res.render("social-sharing/story", {
    css,
    heroImg,
    font,
    ...data,
  });
});

router.get("/instagram", async function (req, res) {
  res.render("index");
});

module.exports = router;
