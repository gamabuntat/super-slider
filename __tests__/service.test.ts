import EventEmitter from '../src/EventEmitter/EventEmitter';
import Service from '../src/Service/Service';

const emit = jest.fn();
EventEmitter.prototype.emit = emit;

afterEach(() => {
  emit.mockClear();
});

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

test('save last position correctly', () => {
  const model = {
    activeButton: ['buttonS', 'buttonE'],
    m: {
      trackSize: 100,
      trackCoord: 10,
      isVertical: true,
      isInterval: true,
      buttonS: {
        relativePos: 0.2,
      },
      buttonE: {
        relativePos: 1,
      }
    },
  };
  const calcCorrectRelCoord = (coord: number) => {
    const relPos = (coord - model.m.trackCoord) / model.m.trackSize;
    return model.m.isVertical ? 1 - relPos : relPos;
  };
  const saveLastPosition = Service.prototype.saveLastPosition;
  Object.setPrototypeOf(model, Service.prototype);
  let coord = 19;
  saveLastPosition.call(model, coord);
  let correctlyCoord = calcCorrectRelCoord(coord);
  expect(model.m.buttonS.relativePos).toBe(correctlyCoord);
  console.log(correctlyCoord);
  expect(emit).toHaveBeenCalledTimes(3);
  coord = Math.trunc((Math.random() * 100) * 100) / 100;
  saveLastPosition.call(model, coord);
  correctlyCoord = calcCorrectRelCoord(coord);
  expect(model.m.buttonS.relativePos).toBe(correctlyCoord);
  console.log(correctlyCoord);
});

test('send display data correctly', () => {
  const model = {
    activeButton: ['buttonS', 'buttonE'],
    m: {
      trackSize: 100,
      isInterval: true,
      min: 0,
      max: 10,
      valueOfDivision: 1,
      step: 1,
      buttonS: {
        relativePos: 0.2,
        maxExtreme: 0.9,
        minExtreme: 0,
      },
      buttonE: {
        relativePos: 0.9,
      }
    },
  };
  const sendDisplayData = Service.prototype.sendDisplayData;
  Object.setPrototypeOf(model, Service.prototype);
  sendDisplayData.call(model);
  expect(emit).toBeCalledTimes(2);
  expect(emit.mock.calls[0]).toEqual([
    'sendDisplayData',
    model.m.buttonS.relativePos,
    model.m.trackSize,
    model.m.buttonS.maxExtreme,
    model.m.buttonS.minExtreme
  ]);
  expect(emit.mock.calls[1]).toEqual([
    'changeValue',
    model.m.buttonS.relativePos,
    model.m.min,
    model.m.max,
    model.m.valueOfDivision,
    model.m.step
  ]);
});
