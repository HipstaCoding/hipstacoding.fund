const express = require('express');
const router = express.Router();
const onSubscribe = require('./onSubscribe');

router.get('/', function(req, res, next) {
  console.log("SUBSCRIBED")
  res.sendStatus(200);
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  onSubscribe(req.body.data)
  res.sendStatus(200);
});

module.exports = router;
