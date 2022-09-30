const express = require('express');
const router = express.Router();
const getMonobankClientData = require("./getMonobankClientInfo");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const jar = await getMonobankClientData();
    res.send(jar);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
