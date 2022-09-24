const socket = io();

let balance = 0;

socket.on("donate", (newBalance) => {
  console.log("DONATE", newBalance)
  animateNumber(newBalance / 100, (n) => {
    const format = Intl.NumberFormat("uk-UK").format; 
    const balanceFormatted = format(n);
    document.getElementById('dt-collected').textContent = balanceFormatted;
  }, window.balance / 100)
});

getDonationData().then(res => {
  window.balance = res.balance;
  render(res);
})