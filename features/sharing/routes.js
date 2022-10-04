const express = require("express");
const router = express.Router();
const { getInstaStoryParams } = require('./instagram-story');
const { getTwitterPostParams } = require('./twitter-post');

const getMonobankClientData = require("../donation-tracker/getMonobankClientInfo");
const formatMonobankData = require("../donation-tracker/formatMonobankData");

router.get("/images/instagram/story", async function (_req, res) {
  const [{ font, css, heroImg }, jar] = await Promise.all([
    getInstaStoryParams(),
    getMonobankClientData(),
  ]);

  const data = formatMonobankData(jar);
  
  return res.render("sharing/story", {
    css,
    heroImg,
    font,
    ...data,
  });
});

router.get("/images/twitter", async function (_req, res) {
  const [{ font, css, heroImg }, jar] = await Promise.all([
    getTwitterPostParams(),
    getMonobankClientData(),
  ]);

  const data = formatMonobankData(jar);
  
  return res.render("sharing/twitter", {
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
