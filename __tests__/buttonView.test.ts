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

test.only('correctly move button', () => {
  document.body.innerHTML = (
    '<button id="button"width: 2px; style="left: 10px">click me</button>'
  );
  const mock = {
    component: document.getElementById('button')!,
    shift: 1,
    transformOffset: -2,
    offset: 2,
    orient: {
      isVertical: false,
      coord: 'x',
      styleCoord: 'left',
    }
  };
  Object.setPrototypeOf(mock, ButtonView.prototype);
  ButtonView.prototype.moveButton.call(mock, 0, 1, 0.2, 1, 44);
  expect(mock.component.style.left).toBe('20%');
  ButtonView.prototype.moveButton.call(mock, 100, 1, 0.2, 1, 44);
  expect(mock.component.style.left).toBe('100%');
  ButtonView.prototype.moveButton.call(mock, 14, 1, 0.2, 1, 44);
  expect(parseFloat(mock.component.style.left)).toBeGreaterThan(30);
  ButtonView.prototype.moveButton.call(mock, 21.123, 0.3, 0.2, 1, 44);
  expect(mock.component.style.left).toBe('30%');
});
