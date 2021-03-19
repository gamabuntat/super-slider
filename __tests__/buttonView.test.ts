import View from '../src/View/View';
import ButtonView from '../src/View/ButtonView';

jest.mock('../src/View/View');

const mockView = View as jest.MockedClass<typeof View>;

beforeEach(() => {
  // View.prototype.getRect.mockClear();
})

test('correctly set shift', () => {
  const rectObj = {
    x: 42,
    y: 2,
  };
  const component = document.createElement('button');
  const mock = {
    component, 
    shift: 0,
    orient: {
      isVertical: false,
      coord: 'x',
    }
  };
  mockView.prototype.getRect.mockImplementation(() => rectObj as DOMRect);
  Object.setPrototypeOf(mock, ButtonView.prototype);
  ButtonView.prototype.setShift.call(mock, 10);
  expect(mock.shift).toBe(-32);
})
