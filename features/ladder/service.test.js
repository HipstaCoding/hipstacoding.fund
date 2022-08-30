const { getDonatorName, createLadderFromInvoice } = require('./service');
const { ONE_DONATOR, SECOND_DONATOR } = require('./test-data');

const FIRST_DONATOR_NAME = 'Олексій Смірнов';
const FIRST_AMOUNT = 600;
const SECOND_DONATOR_NAME = 'Євген Москальов';
const SECOND_AMOUNT = 200;

test('function getDonatorName()', () => {
  const result = getDonatorName('Від: Олексій Смірнов');
  expect(result).toBe(FIRST_DONATOR_NAME);
});

describe('function createLadderFromInvoice()', () => {
  test('from one donator', () => {
    const result = createLadderFromInvoice(ONE_DONATOR);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe(FIRST_DONATOR_NAME);
    expect(result[0].amount).toBe(FIRST_AMOUNT);
  });

  test('from two donators', () => {
    const result = createLadderFromInvoice([...ONE_DONATOR, ...SECOND_DONATOR]);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe(FIRST_DONATOR_NAME);
    expect(result[0].amount).toBe(FIRST_AMOUNT);
    expect(result[1].name).toBe(SECOND_DONATOR_NAME);
    expect(result[1].amount).toBe(SECOND_AMOUNT);
  });

  test('empty invoice', () => {
    const result = createLadderFromInvoice([]);
    expect(result).toEqual([]);
  });
});