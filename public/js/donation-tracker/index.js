const socket = io();

socket.on("donate", (newBalance) => {
  if (!window.res) return;
  render({ ...window.res, balance: newBalance });
});

getDonationData().then(res => {
  window.res = res;
  render(res);
})