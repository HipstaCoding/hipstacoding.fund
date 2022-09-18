const express = require('express');
const router = express.Router();
const getMonobankClientData = require("./getMonobankClientInfo");
const formatMonobankData = require("./formatMonobankData");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const jar = await getMonobankClientData();
    console.log('jar', jar)
    res.send(jar);
  } catch (err) {
    console.log('error', error);
    next(err);
  }
});

module.exports = router;
