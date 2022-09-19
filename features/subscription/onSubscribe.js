const getMonobankClientData = require("../donation-tracker/getMonobankClientInfo");
const { createInstagramStoryImage } = require("../social-sharing/instagram-story");
const io = require("../../io");

module.exports = async function onSubscribe(data) {
  const jar = await getMonobankClientData();
  
  if (jar.id !== data.account) {
    console.warn('WARN: data.account is not from jar', data.account);
    return;
  }

  console.log('data.statementItem.balance', data.statementItem.balance)
  jar.balance = data.statementItem.balance;
  io.emit("donate", jar.balance)
  await createInstagramStoryImage(jar);
}