module.exports = function formatMonobankData(data) {
  const format = Intl.NumberFormat("uk-UK").format;

  const collected = data.balance / 100;
  const collectedFormatted = format(collected);
  const goalFormatted = format(data.goal / 100);
  const remains = (data.goal - data.balance) / 100;
  const remainsFormatted = format(remains);
  const percent = Math.ceil((data.balance / data.goal) * 100);
  const total = data.goal / 100;
  const totalFormatted = format(total);

  return {
    collected,
    collectedFormatted,
    goalFormatted,
    remains,
    remainsFormatted,
    percent,
    total,
    totalFormatted,
  };
};
