import { HorizontalScale } from './Scale';
import IScale from './IScale';

type TypeLs = () => void;
type TypeOptionalRect = { [k in keyof DOMRect]+?: DOMRect[k] };

let resizeListener: TypeLs;
/* eslint-disable-next-line */
(global as any).ResizeObserver = class {
  constructor(private ls: TypeLs) {
    resizeListener = ls;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
};

const scale = document.createElement('div');
const rect = scale.getBoundingClientRect();
const updateRect = (o: TypeOptionalRect = {}) => {
  scale.getBoundingClientRect = function () {
    return { ...rect, ...o };
  };
};
let scaleView: IScale = new HorizontalScale(scale);

const swap = (o: TypeOptionalRect = { width: 100, height: 100 }) => {
  updateRect(o);
  scaleView = scaleView.swap();
};

beforeEach(() => {
  swap();
});

const getAP = (length: number) =>
  Array.from({ length }).map((p, idx) => ({ p: idx, idx }));

test('update when all buttons are placed in the scale', () => {
  scaleView.update(getAP(11));
  expect(scale.querySelectorAll('button').length).toBe(11);
});

test('get last position', () => {
  scaleView.update(getAP(2));
  const button = <HTMLButtonElement>scale.querySelectorAll('button')[1];
  const evt = new MouseEvent('click', { bubbles: true });
  button.dispatchEvent(evt);
  expect(scaleView.getLastPosition()).toBe(1);
  scale.dispatchEvent(new Event('click'));
  expect(scaleView.getLastPosition()).toBe(1);
});

test('toggle hidden mod', () => {
  const nClasses = scale.classList.length;
  scaleView.toggleHiddenMode();
  expect(scale.classList.length).toBeGreaterThan(nClasses);
  scaleView.toggleHiddenMode();
  expect(scale.classList.length).toEqual(nClasses);
});

test('handle resize scale', () => {
  jest.useFakeTimers('legacy');
  scaleView.update(getAP(2));
  updateRect();
  resizeListener();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  scale.classList.add('ScaleHidden');
  scaleView.update(getAP(3));
  resizeListener();
  expect(setTimeout).toHaveBeenCalledTimes(1);
});
