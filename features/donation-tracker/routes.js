const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const log = require('loglevel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const bankaID = req.headers["banka-id"];

  if (!bankaID) {
    res.status(400).send({
      code: 100,
      message: "There are header `banka-id`"
    })
  }

  const infoResponse = await fetch('https://api.monobank.ua/personal/client-info', {
    headers: {
      'X-Token':  process.env.TOKEN,
      'Content-Type': 'application/json'
    }
  })

  if (!infoResponse.ok) {
    if (infoResponse.status === 403) {
      const text =await infoResponse.text();
      log.error(text);
    }
    log.error('Response error status: ' + infoResponse.status)
    return res.sendStatus(500);
  }

  const infoData = await infoResponse.json();
  
  if (!infoData && infoData.jars) {
    res.status(400).send({
      code: 101,
      message: `There are no jars or client info`
    })
  }

  const jar = infoData.jars.find(jar => jar.sendId === bankaID);

  if (!jar) {
    res.status(400).send({
      code: 102,
      message: `There are no jars with Banka-ID ${bankaID}`
    })
  }
  
  return res.send(jar);

});

module.exports = router;
