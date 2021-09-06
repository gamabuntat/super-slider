import View from '../../slider/View/View';

type TypeMap = { [k: string]: string }
type TypeComponents = { [k in keyof TypeMap ]: HTMLElement | null  }

const scaleToggleHiddenMod = jest.fn();
const scaleSwap = jest.fn();
let scaleLastPosition = 0;
const scaleGetLastPositon = () => scaleLastPosition;


jest.mock( '../../slider/View/UI/ScaleView/ScaleView', () => {
  return {
    HorizontalScaleView: jest.fn().mockImplementation(() => {
      return hsv;
    })
  };
});

const hsv = {
  update: () => { return; }, 
  bind: () => { return; },
  unbind: () => { return; },
  toggleHiddenMode: scaleToggleHiddenMod,
  swap: function () {
    scaleSwap();
    return this;
  },
  getLastPosition: scaleGetLastPositon,
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

const root = document.createElement('div');

describe('check rendered components', () => {
  const view = new View(response, root);

  const bemBlock = 'ui-slider';

  const intervalMod = '--interval';

  const getComponent = (bemElement: string): HTMLElement | null => {
    return root.querySelector(`.${bemBlock}${bemElement}`);
  };

  const map: TypeMap = {
    slider: '',
    container: '__container',
    handleStart: '__handle--start',
    handleEnd: '__handle--end',
    scale: '__scale',
    labelStart: '__label--start',
    labelEnd: '__label--end',
  };

  const components: TypeComponents = Object.entries(map).reduce((acc, entr) => {
    acc[entr[0]] = getComponent(entr[1]);
    return acc;
  }, {} as TypeComponents);

  test('check for slider presence', () => {
    expect(components.slider).not.toBeNull();
  });

  test('check for handles presence', () => {
    expect(components.handleStart).not.toBeNull();
    expect(components.handleEnd).not.toBeNull();
  });

  test('check for scale presence', () => {
    expect(components.scale).not.toBeNull();
  });

  test('check for labels presence', () => {
    expect(components.labelStart).not.toBeNull();
    expect(components.labelEnd).not.toBeNull();
  });

  describe('parse response tests', () => {
    beforeEach(() => {
      view.parseResponse(response);
    });

    test('toggle vertical mod', () => {
      expect(scaleSwap.mock.calls.length).toBe(0);
      view.parseResponse({ ...response, ...{ isVertical: true } });
      expect(scaleSwap.mock.calls.length).toBe(1);
    });

    test('toggle interval mod', () => {
      const sliderIntervalClass = `${bemBlock}${intervalMod}`;
      if (components.slider) {
        expect(components.slider.classList.contains(sliderIntervalClass))
          .toBeFalsy();
        view.parseResponse({ ...response, ...{ isInterval: true } });
        expect(
          components.slider.classList.contains(sliderIntervalClass))
          .toBeTruthy();
      }
    });

    test('toggle scale visibility', () => {
      expect(scaleToggleHiddenMod.mock.calls.length).toBe(0);
      view.parseResponse({ ...response, ...{ isScale: false } });
      expect(scaleToggleHiddenMod.mock.calls.length).toBe(1);
    });

    test('toggle labels visibility', () => {
      const labelHiddenMod = `${bemBlock}__label--hidden`;
      if (components.labelStart) {
        expect(components.labelStart.classList.contains(labelHiddenMod))
          .toBeFalsy();
        view.parseResponse({ ...response, ...{ isLabel: false } });
        expect(components.labelStart.classList.contains(labelHiddenMod))
          .toBeTruthy();
      }
    });
  });

  describe('handles', () => {
    const rect = document.createElement('div').getBoundingClientRect();
    const getRect = (
      o: { [k in keyof DOMRect]+?: DOMRect[k] } = {}
    ) => ({ ...rect, ...o });
    const getHandlePosition = (
      handle: HTMLElement | null = components.handleStart
    ) => {
      return (<HTMLElement>handle).style.left;
    };

    afterEach(() => {
      if (components.handleStart) {
        components.handleStart.style.left = '0%';
      }
    });

    test('handle pointer move', () => {
      let rect = getRect({ x: -20 });
      if (components.container && components.handleStart) {
        components.handleStart.setPointerCapture = () => { return; };
        components.container.getBoundingClientRect = () => rect;
        components.handleStart.dispatchEvent(new Event('pointermove'));
        expect(getHandlePosition()).toBe('0%');
        components.handleStart.dispatchEvent(new Event('pointerdown'));
        components.handleStart.dispatchEvent(new Event('pointermove'));
        expect(getHandlePosition()).toBe('100%');
        rect = getRect();
        components.handleStart.dispatchEvent(new Event('pointerdown'));
        components.handleStart.dispatchEvent(new Event('pointermove'));
        expect(getHandlePosition()).toBe('0%');
      }
    });

    test('handle keydown', () => {
      if (components.handleStart) {
        let prevPosition = getHandlePosition();
        components.handleStart
          .dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        expect(getHandlePosition()).toBe(prevPosition);
        components.handleStart.dispatchEvent(new Event('focusin'));
        components.handleStart
          .dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        let newPosition = getHandlePosition();
        expect(parseFloat(newPosition))
          .toBeGreaterThan(parseFloat(prevPosition));
        prevPosition = newPosition;
        components.handleStart
          .dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        newPosition = getHandlePosition();
        expect(parseFloat(newPosition))
          .toBeLessThan(parseFloat(prevPosition));
      }
    });

    test('handle scale click', () => {
      if (components.handleStart && components.scale) {
        const scaleBind = ( evName: string, cb: () => void) => (
          (<HTMLElement>components.scale).addEventListener('click', cb)
        );
        hsv.bind = scaleBind as () => void;
        const root = document.createElement('div');
        new View(response, root);
        const handle = <HTMLElement>root
          .querySelector('.ui-slider__handle--start');
        const evt = new Event('click');
        scaleLastPosition = response.min;
        components.scale.dispatchEvent(evt);
        expect(getHandlePosition(handle)).toBe('0%');
        scaleLastPosition = response.max;
        components.scale.dispatchEvent(evt);
        expect(getHandlePosition(handle)).toBe('100%');
      }
    });
  });
});

