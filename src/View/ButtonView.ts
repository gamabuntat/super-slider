import View from './View';

export default class ButtonView extends View {
  private shift: number
  constructor(button: HTMLElement) {
    super(button);
    this.shift = this.getRect().width / 2;
    this.component.addEventListener('pointerdown', (e) => {
      this.toggleTrigger();
      this.setShift(e);
      this.fixPointer(e.pointerId);
      this.emit('pointerDown', e.x);
    });
    this.component.addEventListener('lostpointercapture', () => {
      this.toggleTrigger();
      this.emit('lostPointer');
      this.setDefaultShift();
    });
    this.component.addEventListener(
      'pointermove',
      (e) => {
        if (View.isTriggerd) {
          this.emit('moveButton', e.x);
          this.emit('updatePosition', this.getRect().x);
        }
      }
    );
  }

  setShift(e: PointerEvent): void {
    this.shift = e.x - this.getRect().x;
  }

  setDefaultShift(): void {
    this.shift = this.getRect().width / 2;
  }

  fixPointer(pointerId: number): void {
    this.component.setPointerCapture(pointerId);
  }

  moveButton(
    x: number, maxExtreme: number, minExtreme: number, scaleX: number
  ): void {
    const position = Math.min(
      maxExtreme,
      Math.max((x - scaleX - this.shift), minExtreme)
    );
    this.component.style.left = `${position}px`;
  }
}

