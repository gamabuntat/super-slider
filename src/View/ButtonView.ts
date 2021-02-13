import View from './View';

export default class ButtonView extends View {
  constructor(button: HTMLElement) {
    super(button);
    this.component.addEventListener(
      'pointerdown',
      (e) => {
        this.toggleTrigger();
        this.emit('pointerPressed', e, this.getRect());
      }
    );
    this.component.addEventListener('lostpointercapture', (e) => {
      console.log(e.pointerId);
      this.toggleTrigger();
    });
    this.component.addEventListener(
      'pointermove',
      (e) => View.isTriggerd && this.emit('pointerMoved', e),
    );
  }

  fixPointer(pointerId: number): void {
    this.component.setPointerCapture(pointerId);
  }

  moveButton(
    x: number,
    scaleX: number,
    maxExtreme: number,
    minExtreme: number,
    shiftX: number,
  ): void {
    const btnPosition = Math.min(
      maxExtreme,
      Math.max((x - scaleX - shiftX), minExtreme)
    );
    this.component.style.left = `${btnPosition}px`;
  }
}

