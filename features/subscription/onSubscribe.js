const getMonobankClientData = require("../donation-tracker/getMonobankClientInfo");
const { createInstagramStoryImage } = require("../sharing/instagram-story");
const { createTwitterPostImage } = require("../sharing/twitter-post");
const io = require("../../io");
const cache = require('../../utils/cache');

module.exports = async function onSubscribe(data) {
  const jar = await getMonobankClientData();
  
  if (jar.id !== data.account) {
    console.warn('WARN: data.account is not from jar', data.account);
    return;
  }

  console.log('data.statementItem.balance', data.statementItem.balance);

  jar.balance = data.statementItem.balance;

  io.emit("donate", jar.balance);

  cache.set('jar', jar);

  await createInstagramStoryImage(jar);
  await createTwitterPostImage(jar);
}