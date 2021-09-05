import {
  HorizontalScaleView 
} from '../../../slider/View/UI/ScaleView/ScaleView';
import IScaleView from '../../../slider/View/UI/ScaleView/IScaleView';

type TypeLs = () => void;
type TypeOptionalRect = { [k in keyof DOMRect]+?: DOMRect[k] };

let resizeListener: TypeLs;
/* eslint-disable-next-line */
(global as any).ResizeObserver = class {
  constructor(private ls: TypeLs) {
    resizeListener = ls;
  }
  observe() { return; }
  unobserve() { return; }
  disconnect() { return; }
};

const scale = document.createElement('div');
const rect = scale.getBoundingClientRect();
const updateRect = (o: TypeOptionalRect = {}) => {
  scale.getBoundingClientRect = (
    function () { return { ...rect, ...o }; }
  );
};
let scaleView: IScaleView = new HorizontalScaleView(scale);

const swap = (o: TypeOptionalRect = { width: 100, height: 100 }) => {
  updateRect(o);
  scaleView = scaleView.swap();
};

beforeEach(() => {
  swap();
});

const getAP = (length: number) => Array.from({ length }).map((i, idx) => idx);

test('update when all buttons are placed in the scale', () => {
  scaleView.update(getAP(11));
  expect(scale.querySelectorAll('.-button').length).toBe(11);
  expect(scale.querySelectorAll('.-button--hidden').length).toBe(0);
});

test('update when no button fits', () => {
  swap({});
  scaleView.update(getAP(3));
  expect(scale.querySelectorAll('.-button').length).toBe(3);
  expect(scale.querySelectorAll('.-button--hidden').length).toBe(3);
});

test('get last position', () => {
  scaleView.update(getAP(2));
  const button = <HTMLButtonElement>scale.querySelectorAll('.-button')[1];
  const evt = new MouseEvent('click', { bubbles: true });
  button.dispatchEvent(evt);
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
});

