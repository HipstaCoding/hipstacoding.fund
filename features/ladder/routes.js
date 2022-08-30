const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { createLadderFromInvoice } = require('./service');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const invoiceResponse = await fetch('https://api.monobank.ua/personal/statement/S1SeqlvK0QmE_Qb-cPkL6-Xbae2FxPo/1656194400', {
    headers: {
      'X-Token': 'u0WBxsrjl7qlugwczfbJ_LPq1lP_j7Po8FW79j63LjFk',
      'Content-Type': 'application/json'
    }
  })

  if (!invoiceResponse.ok) {
    console.log('invoice', invoiceResponse)
    const body = await invoiceResponse.json();
    console.log('body', body)
    return res.sendStatus(500);
  }

  const invoiceData = await invoiceResponse.json();
  
  const ladder = createLadderFromInvoice(invoiceData);

  res.json(ladder)
});

module.exports = router;
