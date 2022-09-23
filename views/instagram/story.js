getDonationData().then(res => {
  render(res);
  setTimeout(() => {
    htmlToImage.toJpeg(document.body, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }, 3000)
})
