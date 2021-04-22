import View from '../src/View/View';

test('toggle correctly', () => {
  expect(View['isTriggerd']).toBe(false);
  View.toggleTrigger();
  expect(View['isTriggerd']).toBe(true);
  View.toggleTrigger();
  expect(View['isTriggerd']).toBe(false);
});

test('how many digits after the decimal point?', () => {
  const defineDecimalPlaces = View.defineDecimalPlaces;
  const checkedValues = (
    [0.011, 3213213213.1, -1, -0.00000001].map((n) => defineDecimalPlaces(n))
  );
  const expectations = [3, 1, 0, 8];
  expect(checkedValues).toEqual(expectations);
});

