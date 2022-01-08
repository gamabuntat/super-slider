import { sampling, toRelative, toAbsolute, decimalPlaces } from './calc';

test('big number exponential notation', () => {
  expect(decimalPlaces(1e-23)).toBe(23);
});

test('sampling', () => {
  expect(sampling(2, 9)).toBe(10);
});

test('absolute v to relative to absolute', () => {
  const min = 1.111;
  const max = 2.22;
  const v = 1.4;
  expect(toAbsolute(min, max, toRelative(min, max, v))).toBe(v);
});
