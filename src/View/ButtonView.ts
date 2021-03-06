import View from './View';
import OrientationType from './OrientationType';

export default class ButtonView extends View {
  private width: number
  private shift: number
  constructor(
    button: HTMLElement,
    orient: OrientationType,
    private offset: number, 
  ) {
    super(button, orient);
    this.width = this.getRect().width;
    this.shift = this.width / 2;
    this.component.style.transform = (
      `translate${this.orient.coord.toUpperCase()}(${this.offset}px)`
    );
    this.component.addEventListener('pointerdown', (e) => {
      this.toggleTrigger();
      this.setShift(e[this.orient.coord]);
      this.fixPointer(e.pointerId);
      this.emit('pointerDown', e[this.orient.coord]);
    });
    this.component.addEventListener('lostpointercapture', () => {
      this.toggleTrigger();
      this.setDefaultShift();
    });
    this.component.addEventListener(
      'pointermove',
      (e) => {
        if (View.isTriggerd) {
          this.emit('moveButton', e.x);
        }
      }
    );
  }

  setShift(coord: number): void {
    this.shift = coord - this.getRect()[this.orient.coord];
  }

  setDefaultShift(): void {
    this.shift = this.width / 2;
  }

  fixPointer(pointerId: number): void {
    this.component.setPointerCapture(pointerId);
  }

  moveButton(
    x: number, 
    maxExtreme: number,
    minExtreme: number,
    trackX: number,
    trackW: number
  ): void {
    const position = Math.min(
      maxExtreme,
      Math.max((x - trackX - (this.shift + this.offset)) / trackW, minExtreme)
    );
    this.component.style.left = `${position * 100}%`;
    this.emit('updatePosition', this.getRect().x - this.offset);
  }
}

