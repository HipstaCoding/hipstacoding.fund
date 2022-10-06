const ANIMATION_TIME = 1 * 1000;

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}

function animateNumber(number, onAnimate, start = 0) {
  let currentNumber = start;
  let started;

  function iterate(timestamp) {
    if (!started) started = timestamp;
    const elapsed = timestamp - started;

    if (elapsed > ANIMATION_TIME) return;

    let delta = easeOutSine(elapsed / ANIMATION_TIME);

    currentNumber = start + Math.ceil((number - start) * delta);

    onAnimate(currentNumber);

    window.requestAnimationFrame(iterate);
  }

  window.requestAnimationFrame(iterate);
}

function getDonationData() {
  return fetch('/donation-tracker').then((res) => {
    if (!res.ok) return alert('error', res.status);
    
    return res.json();
  });
}

window.balance = 0;
window.percent = 0;

function render(data) {
  const format = Intl.NumberFormat("uk-UK").format; 

  const balance = data.balance / 100;
  const goal = data.goal / 100;
  const goalFormatted = format(goal);
  const remains = (data.goal - data.balance) / 100;
  const remainsFormatted = format(remains);
  const percent = Math.ceil(data.balance / data.goal * 100);
  const formattedPercent = percent + '%';
  
  document.getElementById('dt').style.setProperty('--donation-percent', formattedPercent);
  document.getElementById('dt-total').textContent = goalFormatted;
  document.getElementById('dt-remains').textContent = remainsFormatted;

  animateNumber(balance, (n) => {
    const balanceFormatted = format(n);
    document.getElementById('dt-collected').textContent = balanceFormatted;
  }, window.balance);

  animateNumber(percent, (n) => {
    const formattedPercent = n + '%';
    document.getElementById('dt-collected-percent').textContent = formattedPercent;
  }, window.percent);

  window.balance = balance;
  window.percent = percent;
}

