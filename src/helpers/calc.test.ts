import { sampling, toRelative, toAbsolute } from './calc';

test('sampling', () => {
  expect(sampling(2, 9)).toBe(10);
});

test('correct to relative', () => {
  expect(toRelative(0, 9, 3)).toBe(1 / 3);
});

test('correct to absolute', () => {
  expect(toAbsolute(0, 9, 1 / 3)).toBe(3);
});

test('absolute v to relative to absolute', () => {
  const min = 1.111;
  const max = 2.22;
  const v = 1.4;
  expect(toAbsolute(min, max, toRelative(min, max, v))).toBe(v);
});
