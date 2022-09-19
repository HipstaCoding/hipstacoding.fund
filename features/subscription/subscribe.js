const fetch = require('node-fetch');

module.exports = async function subscribe() {
  const webHookUrl = `${process.env.API_URL}/webhook`;
  console.log('webHookUrl', webHookUrl)
  const response = await fetch('https://api.monobank.ua/personal/webhook', {
    method: 'POST',
    body: JSON.stringify({ 
      webHookUrl,
    }),
    headers: {
      'X-Token':  process.env.TOKEN
    }
  });

  console.log('response', await response.text())
  if (!response.ok) throw new Error(`Subscription failed with a status ${response.status}`);

  return response;
}