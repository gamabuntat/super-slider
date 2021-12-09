import { HorizontalConfig } from '../../../slider/View/Config/Config';

const response: IResponse = {
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

const truthfulAbsolutePositions = Array.from({ length: 11 }).map(
  (i, idx) => idx
);
const reverseTruthful = truthfulAbsolutePositions.slice().reverse();

const getUpdatedResponse = (o: IOptions): IResponse => ({ ...response, ...o });

const config = new HorizontalConfig(response);
const verticalConfig = config.swap();

test('get same response', () => {
  expect(config.getResponse()).toEqual(response);
});

test('calc correctly position', () => {
  expect(config.calcPosition(response.from)).toBe(config.getPositions()[0]);
  expect(config.calcPosition(response.to)).toBe(config.getPositions()[1]);
});

test('get next position correctly', () => {
  truthfulAbsolutePositions.forEach((p, idx) => {
    expect(
      config.calcPosition(truthfulAbsolutePositions[idx + 1] ?? p)
    ).toBeCloseTo(config.getNext(config.calcPosition(p)));
  });
});

test('get next vertical positions correctly', () => {
  truthfulAbsolutePositions.forEach((p, idx) => {
    expect(
      verticalConfig.calcPosition(truthfulAbsolutePositions[idx + 1] ?? p)
    ).toBeCloseTo(verticalConfig.getNext(verticalConfig.calcPosition(p)));
  });
});

test('get prev position correctly', () => {
  reverseTruthful.forEach((p, idx) => {
    expect(config.calcPosition(reverseTruthful[idx + 1] ?? p)).toBeCloseTo(
      config.getPrev(config.calcPosition(p))
    );
  });
});

test('get prev vertical position correctly', () => {
  reverseTruthful.forEach((p, idx) => {
    expect(
      verticalConfig.calcPosition(reverseTruthful[idx + 1] ?? p)
    ).toBeCloseTo(verticalConfig.getPrev(verticalConfig.calcPosition(p)));
  });
});

test('get all positions correctly', () => {
  const { positions, absolutePositions } = config.getAllPositions();
  truthfulAbsolutePositions.forEach((p, idx) => {
    expect(p).toBe(absolutePositions[idx]);
    expect(config.calcPosition(p)).toBeCloseTo(positions[idx]);
  });
});

test('get all vertical positions correctly', () => {
  const { positions, absolutePositions } = verticalConfig.getAllPositions();
  reverseTruthful.forEach((p, idx) => {
    expect(p).toBe(absolutePositions[idx]);
    expect(verticalConfig.calcPosition(p)).toBeCloseTo(positions[idx]);
  });
});

test('set positions correctly', () => {
  config.setPositions([1.2, 1]);
  expect(config.getPositions()).toEqual([1, 1]);
  verticalConfig.setPositions([0, -12]);
  expect(verticalConfig.getPositions()).toEqual([0, 0]);
});

test('update correctly', () => {
  const newOptions = { max: 20, min: 19, step: 0.1 };
  config.update(getUpdatedResponse(newOptions));
  expect(config.getResponse().max).toBe(newOptions.max);
});
