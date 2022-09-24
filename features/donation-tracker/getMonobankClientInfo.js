const fetch = require('node-fetch');
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60 });

function getJar(data, bankaID) {
  if (!data && !data.jars) return null;

  return data.jars.find(jar => jar.sendId === bankaID);
}

async function getMonobankClientData() {
  const bankaID = process.env.BANKA_ID;
  const cachedResponse = cache.get('client-info');
  console.log('if cachedResponse exists', !!cachedResponse)
  
  if (cachedResponse) {
    const jar = getJar(cachedResponse, bankaID);
    return jar;
  }

  const infoResponse = await fetch('https://api.monobank.ua/personal/client-info', {
    headers: {
      'X-Token':  process.env.TOKEN,
      'Content-Type': 'application/json'
    }
  });

  if (!infoResponse.ok) {
    if (infoResponse.status === 429) {

      // throw new Error(429);
      return console.error(429)
    }
    throw new Error(500);
  }


  const clientData = await infoResponse.json();

  cache.set('client-info', clientData);

  const jar = getJar(clientData, bankaID);
  
  if (!jar) throw Error();

  return jar;
}


module.exports = getMonobankClientData;