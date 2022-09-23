var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/instagram/', function(req, res, next) {
  console.log('GET INSTAGRAM', __dirname)
  res.sendFile('./view/instagram/index.html', { root: __dirname }, function (err) {
    if (err) {
      console.log('GET error', err, err.message)
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  });
});

module.exports = router;
