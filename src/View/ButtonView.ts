import View from './View';
import OrientationType from './OrientationType';

export default class ButtonView extends View {
  private width: number
  private shift: number
  constructor(
    button: HTMLElement,
    orient: OrientationType,
    private transformOffset: number,
    private offset: number, 
  ) {
    super(button, orient);
    this.width = this.getRect().width;
    this.shift = this.width / 2;
    this.component.style.transform = (
      `translate${this.orient.coord.toUpperCase()}(
        ${transformOffset * (this.orient.isVertical ? -1 : 1)}px
      )`
    );
    this.component.addEventListener('pointerdown', (e) => {
      this.toggleTrigger();
      this.setShift(e[this.orient.coord]);
      this.fixPointer(e.pointerId);
      this.emit(
        'pointerDown',
        e[this.orient.coord] + (
          this.orient.isVertical ? window.pageYOffset : window.pageXOffset
        ),
      );
    });
    this.component.addEventListener('lostpointercapture', () => {
      this.toggleTrigger();
      this.setDefaultShift();
    });
    this.component.addEventListener(
      'pointermove', (e) => {
        if (View.isTriggerd) {
          this.emit('moveButton', e[this.orient.coord]);
        }
      }
    );
  }

  setShift(coord: number): void {
    this.shift = coord - this.getRect()[this.orient.coord];
    if (this.orient.isVertical) {
      this.shift = this.width - this.shift;
    }
  }

  setDefaultShift(): void {
    this.shift = this.width / 2;
  }

  fixPointer(pointerId: number): void {
    this.component.setPointerCapture(pointerId);
  }

  moveButton(
    coord: number, 
    maxExtreme: number,
    minExtreme: number,
    trackCoord: number,
    trackSize: number
  ): void {
    const provisionalPos = (
      (coord + 
        (this.orient.isVertical ? window.pageYOffset : window.pageXOffset)
        - trackCoord + (this.shift + this.transformOffset) 
        * (this.orient.isVertical ? 1 : -1)) / trackSize
    );
    const position = Math.min(
      maxExtreme,
      Math.max(
        this.orient.isVertical ? (1 - provisionalPos) : provisionalPos,
        minExtreme
      )
    );
    this.component.style[this.orient.styleCoord] = `${position * 100}%`;
    this.emit(
      'updatePosition', 
      this.getRect()[this.orient.coord] + this.offset + (
        (this.orient.isVertical ? window.pageYOffset : window.pageXOffset)
      )
    );
  }
}

