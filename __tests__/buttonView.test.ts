import View from '../src/View/View';
import ButtonView from '../src/View/ButtonView';

jest.mock('../src/View/View');

const mockView = View as jest.MockedClass<typeof View>;

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
  const x = -3.23123;
  ButtonView.prototype.setShift.call(mock, x);
  expect(mock.shift).toBe(x - rectObj.x);
});

test.only('correctly move button', () => {
  document.body.innerHTML = (
    '<button id="button" style="display: none; width: 0px">click me</button>'
  );
  const button = document.getElementById('button')!;
  button.style.width = '10px';
  expect(button).toHaveStyle('width: 10px');
});
