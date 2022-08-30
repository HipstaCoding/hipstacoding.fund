const FROM_PREFIX_UA = 'Від: ';
const DEFAULT_DONATOR = 'Олексій Смірнов';

function getDonatorName(description) {
  if (description.indexOf(FROM_PREFIX_UA) === -1) return DEFAULT_DONATOR;
  return description.replace(FROM_PREFIX_UA, '');
}

function createLadderFromInvoice(invoiceData) {
  const ladderHash = {};
  const invoiceRecordsCount = invoiceData.length;

  for (let index = 0; index < invoiceRecordsCount; index++) {
    const record = invoiceData[index];
    const donatorName = getDonatorName(record.description);
    const donationAmount = record.amount;
    const totalDonationAmount = ladderHash[donatorName] || 0;
    ladderHash[donatorName] = totalDonationAmount + donationAmount;
  }

  return Object.keys(ladderHash).map(name => ({ name, amount: ladderHash[name]}));
}

module.exports = {
  getDonatorName,
  createLadderFromInvoice
}