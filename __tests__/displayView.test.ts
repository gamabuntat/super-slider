import DisplayView from '../src/View/DisplayView';

test('correctly change value', () => {
  const mock = {component: document.createElement('div')};
  Object.setPrototypeOf(mock, DisplayView.prototype);
  DisplayView.prototype.changeValue.call(mock, 0.4, 0, 10, 0.1);
  expect(parseFloat(mock.component.innerHTML)).toBe(4);
});
