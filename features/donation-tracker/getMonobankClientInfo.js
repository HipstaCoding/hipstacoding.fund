const fetch = require('node-fetch');
const cache = require('../../utils/cache');

function getJar(data, bankaID) {
  if (!data && !data.jars) return null;

  return data.jars.find(jar => jar.sendId === bankaID);
}

async function getMonobankClientData() {
  const bankaID = process.env.BANKA_ID;
  const cachedJar = cache.get('jar');
  
  if (cachedJar) return cachedJar;

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
  
  const jar = getJar(clientData, bankaID);

  if (!jar) throw Error();
  
  cache.set('jar', jar);
  
  return jar;
}


module.exports = getMonobankClientData;