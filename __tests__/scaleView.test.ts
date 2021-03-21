import ScaleView from '../src/View/ScaleView';

test('correctly fill values', () => {
  const mock = {
    nValues: 5,
    values: Array(5).fill(null).map(() => document.createElement('span')),
  };
  Object.setPrototypeOf(mock, ScaleView.prototype);
  ScaleView.prototype.fillValues.call(mock, 10, -10, 1);
  const expectValues = ['-10', '-5', '0', '5', '10'];
  expect(mock.values.map((v) => v.innerHTML)).toEqual(expectValues);
})
