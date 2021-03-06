import { HorizontalHandle } from './Handle';

const handle = document.createElement('button');
/* eslint-disable-next-line */
handle.setPointerCapture = function () {};
const hv = new HorizontalHandle(handle);

test('get correctly capture status', () => {
  handle.dispatchEvent(new Event('pointerdown'));
  expect(hv.getCaptureStatus()).toBe(true);
  handle.dispatchEvent(new Event('lostpointercapture'));
  expect(hv.getCaptureStatus()).toBe(false);
});

test('get correctly focus status', () => {
  handle.dispatchEvent(new Event('focusin'));
  expect(hv.getFocusStatus()).toBe(true);
  handle.dispatchEvent(new Event('focusout'));
  expect(hv.getFocusStatus()).toBe(false);
});

test('swap correctly', () => {
  hv.swap().move(0.25);
  expect(getComputedStyle(handle).top).toBe('25%');
  expect(getComputedStyle(handle).left).toBe('');
  hv.swap().swap().move(0.11);
  expect(getComputedStyle(handle).left).toBe('11%');
});

test('correctly calc position', () => {
  handle.dispatchEvent(new Event('pointermove'));
  expect(hv.calcPosition(-10, 100)).toBe(0.1);
  expect(hv.swap().calcPosition(-20, 100)).toBe(0.2);
});

test('move handle correctly', () => {
  hv.move(0.3);
  expect(getComputedStyle(handle).left).toBe('30%');
  hv.swap().move(10.1);
  expect(getComputedStyle(handle).top).toBe('1010%');
});
