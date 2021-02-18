import View from './View';

export default class ButtonView extends View {
  private shift: number
  public moveButton?: (x: number) => void
  constructor(button: HTMLElement) {
    super(button);
    this.shift = this.getRect().width / 2;
    this.component.addEventListener('pointerdown', (e) => {
      this.setShift(e);
      this.fixPointer(e.pointerId);
      this.emit('pointerDown', e.x);
    });
    this.component.addEventListener('lostpointercapture', () => {
      this.moveButton = void 0;
      this.emit('lostPointer');
    });
    this.component.addEventListener(
      'pointermove',
      (e) => {
        if (typeof this.moveButton == 'function') {
          this.moveButton(e.x);
          this.emit('moveButton', this.getRect().x);
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

  defineMoveButton(
    maxExtreme: number, minExtreme: number, scaleX: number
  ): void {
    this.moveButton = this.prepareToMoveButton(maxExtreme, minExtreme, scaleX);
  }

  prepareToMoveButton = (
    maxExtreme: number, minExtreme: number, scaleX: number
  ) => (x: number): void => {
    const position = Math.min(
      maxExtreme,
      Math.max((x - scaleX - this.shift), minExtreme)
    );
    this.component.style.left = `${position}px`;
  }
}

