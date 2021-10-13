import numberDecimalPlaces from '../../helpers/numberDecimalPlaces';

test('big number exponential notation', () => {
  expect(numberDecimalPlaces(1e-23)).toBe(23);
});
