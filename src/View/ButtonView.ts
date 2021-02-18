import View from './View';

export default class ButtonView extends View {
  private shift: number
  public finallyMoveButton?: (x: number) => void
  constructor(button: HTMLElement) {
    super(button);
    this.shift = this.getRect().width / 2;
    this.component.addEventListener('pointerdown', (e) => {
      this.setShift(e);
      this.fixPointer(e.pointerId);
      this.emit('pointerDown', e.x);
      this.emit('defineMoveButton');
    });
    this.component.addEventListener('lostpointercapture', () => {
      this.finallyMoveButton = void 0;
    });
    this.component.addEventListener(
      'pointermove',
      (e) => {
        if (typeof this.finallyMoveButton == 'function') {
          this.finallyMoveButton(e.x);
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

  difineFinnalyMoveButton(
    maxExtreme: number, minExtreme: number, scaleX: number
  ): void {
    this.finallyMoveButton = this.moveButton(maxExtreme, minExtreme, scaleX);
  }

  moveButton = (
    maxExtreme: number, minExtreme: number, scaleX: number
  ) => (x: number): void => {
    const position = Math.min(
      maxExtreme,
      Math.max((x - scaleX - this.shift), minExtreme)
    );
    this.component.style.left = `${position}px`;
  }
}

