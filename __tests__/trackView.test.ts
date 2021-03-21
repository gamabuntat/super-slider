import TrackView from '../src/View/TrackView';

test('correctly transform', () => {
  document.body.innerHTML = '<div style="transform: scaleX(1)"></div>';
  const mock = {
    component: document.body.querySelector('div')!,
    orient: {coord: 'x'},
  };
  TrackView.prototype.transform.call(mock, 1);
  expect(mock.component.style.transform.match(/\d/)![0]).toBe('2');
});
