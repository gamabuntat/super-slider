import Service from '../src/Service/Service';

test('define button correctly', () => {
  const model = {
    activeButton: ['buttonS', 'buttonE'],
    m: {
      relativeButtonW: 4,
      trackSize: 100,
      trackCoord: 0,
      isVertical: false,
      buttonS: {
        relativePos: 0.2,
      },
      buttonE: {
        relativePos: 1,
      }
    },
  };
  const determineButton = Service.prototype.determineButton;
  determineButton.call(model, 60);
  expect(model.activeButton[0]).toBe('buttonS');
  determineButton.call(model, 61);
  expect(model.activeButton[0]).toBe('buttonE');
  determineButton.call(model, 100);
  expect(model.activeButton[0]).toBe('buttonE');
  determineButton.call(model, 1);
  expect(model.activeButton[0]).toBe('buttonS');
});
