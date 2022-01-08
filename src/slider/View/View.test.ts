import View from './View';

const root = document.createElement('div');
const scaleToggleHiddenMod = jest.fn();
const scaleSwap = jest.fn();
let scaleLastPosition = 0;
const scaleGetLastPosition = () => scaleLastPosition;
const trackSwap = jest.fn();
let trackLastPosition = 0;
const trackGetLastPosition = () => trackLastPosition;

jest.mock('./UI/Scale/Scale', () => ({
  HorizontalScale: jest.fn().mockImplementation(() => hsv),
}));

jest.mock('./UI/Track/Track', () => ({
  HorizontalTrack: jest.fn().mockImplementation(() => htv),
}));

const hsv = {
  update() {},
  bind(_: any, cb: () => void) {
    root.querySelector('.Scale')?.addEventListener('click', cb);
  },
  unbind() {},
  toggleHiddenMode: scaleToggleHiddenMod,
  swap() {
    scaleSwap();
    return this;
  },
  getLastPosition: scaleGetLastPosition,
};

const htv = {
  getLastPosition: trackGetLastPosition,
  unbind() {},
  bind(_: any, cb: (e: PointerEvent) => void) {
    (root.querySelector('.Track') as HTMLElement).addEventListener(
      'pointerdown',
      cb
    );
  },
  getPointerID() {
    return 1;
  },
  swap() {
    trackSwap();
    return this;
  },
};

const response = {
  id: 'test',
  min: 0,
  max: 10,
  from: 0,
  to: 10,
  step: 1,
  isInterval: false,
  isVertical: false,
  isLabel: true,
  isScale: true,
} as const;

describe('check rendered components', () => {
  const view = new View(response, root);

  test('check for slider presence', () => {
    expect(root.querySelector('.Slider')).not.toBeNull();
  });

  test('check for handles presence', () => {
    expect(root.querySelector('.HandleStateStart')).not.toBeNull();
    expect(root.querySelector('.HandleStateEnd')).not.toBeNull();
  });

  test('check for scale presence', () => {
    expect(root.querySelector('.Scale')).not.toBeNull();
  });

  test('check for labels presence', () => {
    expect(root.querySelector('.LabelStateStart')).not.toBeNull();
    expect(root.querySelector('.LabelStateEnd')).not.toBeNull();
  });

  describe('parse response tests', () => {
    beforeEach(() => {
      view.parseResponse(response);
    });

    test('toggle vertical mod', () => {
      view.parseResponse({ ...response, isVertical: true });
      expect(root.querySelector('.SliderVertical')).toBeTruthy();
    });

    test('toggle interval mod', () => {
      view.parseResponse({ ...response, isInterval: true });
      expect(root.querySelector('.SliderInterval')).toBeTruthy();
    });

    test('toggle scale visibility', () => {
      view.parseResponse({ ...response, isScale: false });
      expect(scaleToggleHiddenMod.mock.calls.length).toBe(1);
    });

    test('toggle labels visibility', () => {
      view.parseResponse({ ...response, isLabel: false });
      expect(root.querySelectorAll('.LabelHidden').length).toBe(2);
    });
  });

  describe('handles', () => {
    const rect = document.createElement('div').getBoundingClientRect();
    const handle = root.querySelector('.HandleStateStart') as HTMLButtonElement;
    handle.setPointerCapture = () => {};
    handle.getBoundingClientRect = () => rect;
    (root.querySelector('.Container') as HTMLDivElement).getBoundingClientRect =
      () => rect;

    afterEach(() => {
      handle.style.left = '0%';
    });

    test('handle pointer move', () => {
      rect.x = -20;
      handle.dispatchEvent(new Event('pointermove'));
      expect(handle.style.left).toBe('0%');
      handle.dispatchEvent(new Event('pointerdown'));
      handle.dispatchEvent(new Event('pointermove'));
      expect(handle.style.left).toBe('100%');
      rect.x = 0;
      handle.dispatchEvent(new Event('pointerdown'));
      handle.dispatchEvent(new Event('pointermove'));
      expect(handle.style.left).toBe('0%');
    });

    test('handle keydown', () => {
      handle.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      expect(handle.style.left).toBe('0%');
      handle.dispatchEvent(new Event('focusin'));
      handle.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      expect(parseFloat(handle.style.left)).toBeGreaterThan(0);
      const oldPosition = parseFloat(handle.style.left);
      handle.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      expect(parseFloat(handle.style.left)).toBeLessThan(oldPosition);
    });

    test('handle scale click', () => {
      scaleLastPosition = response.max;
      root.querySelector('.Scale')?.dispatchEvent(new Event('click'));
      expect(handle.style.left).toBe('100%');
    });

    test('handle track click', () => {
      trackLastPosition = 0.9;
      root.querySelector('.Track')?.dispatchEvent(new Event('pointerdown'));
      expect(handle.style.left).toBe('90%');
    });
  });
});
