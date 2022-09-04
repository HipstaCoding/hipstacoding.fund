const express = require('express');
const router = express.Router();
const nodeHtmlToImage = require('node-html-to-image');

router.get('/images/facebook', async function(req, res) {
  const image = await nodeHtmlToImage({
    html: `<html>
    <head>
    <style>
      body {
        width: 1200px;
        height: 627px;
      }
    </style>
  </head>
    <body style="background-color:red;"><div>Check out what I just did! #cool</div></body></html>
    `,
    puppeteerArgs: {
      args: ['--no-sandbox']
    }
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
});

router.get('/instagram', async function(req, res) {
  res.render('index')
});

module.exports = router;