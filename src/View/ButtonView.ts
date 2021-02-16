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
    });
    this.component.addEventListener('lostpointercapture', () => {
      this.toggleTrigger();
    });
    this.component.addEventListener(
      'pointermove',
      (e) => View.isTriggerd && this.emit('pointerMoved', e),
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
    x: number, scaleX: number, maxExtreme: number, minExtreme: number
  ): void {
    const position = Math.min(
      maxExtreme,
      Math.max((x - scaleX - this.shift), minExtreme)
    );
    this.component.style.left = `${position}px`;
  }
}

