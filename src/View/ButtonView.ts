import View from './View';

export default class ButtonView extends View {
  isTriggerd: boolean
  constructor(button: HTMLElement) {
    super(button);
    this.isTriggerd = false;
    this.component.addEventListener(
      'pointerdown',
      (e) => {
        console.log(e.pointerId);
        this.toggleTrigger();
        this.component.setPointerCapture(e.pointerId);
        this.emit('pointerPressed', e);
      }
    );
    this.component.addEventListener(
      'pointerup',
      () => this.toggleTrigger(),
    );
    this.component.addEventListener(
      'pointermove',
      (e) => View.isTriggerd && this.emit('pointerMoved', e),
    );
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

