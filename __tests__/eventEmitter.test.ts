import EventEmitter from '../src/EventEmitter/EventEmitter';

test('correctly on', () => {
  const ee = new EventEmitter();
  const f = jest.fn((n: number[]) => n[0]);
  ee.on('return number', f);
  ee.emit('return number', 10);
  expect(f.mock.calls.length).toBe(1);
  expect(f.mock.results[0].value).toBe(10);
});
