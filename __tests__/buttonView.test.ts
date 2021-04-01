import View from '../src/View/View';
import ButtonView from '../src/View/ButtonView';

jest.mock('../src/View/View');

const mockView = View as jest.MockedClass<typeof View>;
const rectObj = {
  x: 42,
  y: 2,
};
mockView.prototype.getRect.mockImplementation(() => rectObj as DOMRect);

test('correctly set shift', () => {
  const component = document.createElement('button');
  const mock = {
    component, 
    shift: 0,
    orient: {
      isVertical: false,
      coord: 'x',
    }
  };
  Object.setPrototypeOf(mock, ButtonView.prototype);
  const x = -3.23123;
  ButtonView.prototype.setShift.call(mock, x);
  expect(mock.shift).toBe(x - rectObj.x);
});

test('correctly calc position', () => {
  const mock = {
    moveButton: jest.fn(),
    shift: 1,
    transformOffset: -2,
    offset: 2,
    orient: {
      isVertical: false,
      coord: 'x',
    }
  };
  Object.setPrototypeOf(mock, ButtonView.prototype);
  ButtonView.prototype.calcPosition.call(mock, -Infinity, 1, 0.2, 1, 44);
  expect(mock.moveButton).toHaveBeenCalledWith(0.2);
  ButtonView.prototype.calcPosition.call(mock, Infinity, 1, 0.2, 1, 44);
  expect(mock.moveButton).toHaveBeenCalledWith(1);
});
