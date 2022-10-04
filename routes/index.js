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
      console.log("formattedJar", formattedJar);
      res.render("index", { ...data, jar: formattedJar });
    })
    .catch(next);
});

module.exports = router;
