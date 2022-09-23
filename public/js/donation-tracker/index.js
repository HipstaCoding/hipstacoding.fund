getDonationData().then(res => {
  render(res);
  const socket = io();

  socket.on("donate", (newBalance) => {
    animateNumber(newBalance / 100, (n) => {
      const format = Intl.NumberFormat("uk-UK").format; 
      const balanceFormatted = format(n);
      document.getElementById('dt-collected').textContent = balanceFormatted;
    }, res.balance / 100)
  });
})