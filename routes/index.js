const express = require('express');
const router = express.Router();
const wallets = require("../data/wallets.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('wallets', wallets)
  res.render('index', { wallets });
});


module.exports = router;
