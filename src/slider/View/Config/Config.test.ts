import HorizontalConfig from './HorizontalConfig';
import VerticalConfig from './VerticalConfig';

const response: Model = {
  id: 'test',
  min: 0,
  max: 10,
  from: 0,
  to: 10,
  step: 1,
  isInterval: false,
  isVertical: false,
  isLabel: true,
  isScale: true,
};

const horizontal = new HorizontalConfig(response);
const vertical = new VerticalConfig(response);

test('get same response', () => {
  expect(horizontal.getResponse()).toEqual(response);
  expect(vertical.getResponse()).toEqual(response);
});

const truthfulAbsolutePositions = Array.from({ length: 11 }).map(
  (i, idx) => idx
);

test('get next position correctly', () => {
  truthfulAbsolutePositions
    .map(horizontal.calcPosition, horizontal)
    .forEach((p, idx, positions) => {
      expect(horizontal.getNext(p)).toBe(positions[idx + 1] ?? p);
    });
});

test('get next vertical positions correctly', () => {
  truthfulAbsolutePositions
    .map(vertical.calcPosition, vertical)
    .forEach((p, idx, positions) => {
      expect(vertical.getNext(p)).toBe(positions[idx + 1] ?? p);
    });
});

test('get prev position correctly', () => {
  truthfulAbsolutePositions
    .map(horizontal.calcPosition, horizontal)
    .forEach((p, idx, positions) => {
      expect(horizontal.getPrev(p)).toBe(positions[idx - 1] ?? p);
    });
});

test('get prev position vertical correctly', () => {
  truthfulAbsolutePositions
    .map(vertical.calcPosition, vertical)
    .forEach((p, idx, positions) => {
      expect(vertical.getPrev(p)).toBe(positions[idx - 1] ?? p);
    });
});

test('get all positions correctly', () => {
  expect(horizontal.getAllPositions()).toEqual(
    truthfulAbsolutePositions.map((p, idx) => ({ p, idx }))
  );
});

test('get all positions vertical correctly', () => {
  expect(vertical.getAllPositions().map(({ p }) => p)).toEqual(
    truthfulAbsolutePositions
  );
});

test('set positions correctly', () => {
  horizontal.setPositions([1.2, 1]);
  expect(horizontal.getPositions()).toEqual([1, 1]);
  vertical.setPositions([0, -100]);
  expect(vertical.getPositions()).toEqual([0, 0]);
});

test('update correctly', () => {
  const newOptions = { max: 20, min: 19, step: 0.1, isInterval: true };
  horizontal.update({ ...horizontal.getResponse(), ...newOptions });
  expect(horizontal.getResponse()).toContainEntries(Object.entries(newOptions));
});
