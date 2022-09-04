const express = require('express');
const router = express.Router();
const nodeHtmlToImage = require('node-html-to-image');

router.get('/images/facebook', async function(req, res) {
  const image = await nodeHtmlToImage({
    html: '<html><body><div>Check out what I just did! #cool</div></body></html>'
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
});

router.get('/instagram', async function(req, res) {
  res.render('index')
});

module.exports = router;