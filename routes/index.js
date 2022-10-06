const express = require("express");
const router = express.Router();
const data = require("../data");
const getMonobankClientData = require("../features/donation-tracker/getMonobankClientInfo");
const formatMonobankData = require("../features/donation-tracker/formatMonobankData");

/* GET home page. */
router.get("/", function (req, res, next) {
  return getMonobankClientData()
    .then(formatMonobankData)
    .then((formattedJar) => {
      const message = encodeURIComponent(formattedJar.description + '\n' + data.url); 
      res.render("index", { ...data, jar: formattedJar, social: { message } });
    })
    .catch((err) => {
      console.log('err', err)
      next(err)
    });
});

module.exports = router;
