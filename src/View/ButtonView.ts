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
    scaleW: number,
    shiftX: number,
    btnW: number,
  ): void {
    const btnPosition = Math.min(
      scaleW - btnW,
      Math.max((x - scaleX - shiftX), 0)
    );
    this.component.style.left = `${btnPosition}px`;
  }
}

