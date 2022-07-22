var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.sendStatus(200);
  console.log('req.body', req.body)
});

module.exports = router;
