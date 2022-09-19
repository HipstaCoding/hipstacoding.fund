function imageFromBufferToBase64(image) {
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;
  return dataURI;
};

module.exports = {
  imageFromBufferToBase64,
}