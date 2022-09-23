getDonationData().then(res => {
  render(res);
  // TODO HANDLE
  const socket = io("localhost:3000");

  socket.on("donate", (newBalance) => {
    console.log("DONATION ALERT", newBalance);
    console.log("res.balance", res.balance);
    animateNumber(newBalance / 100, (n) => {
      console.log('ANIMATE', n)
      const format = Intl.NumberFormat("uk-UK").format; 
      const balanceFormatted = format(n);
      document.getElementById('dt-collected').textContent = balanceFormatted;
    }, res.balance / 100)
  });
})