import {EventEmitter} from './EventEmitter';

class View extends EventEmitter {
  constructor(protected component: HTMLElement) {
    super();
  }
}

class ScaleView extends View {
  constructor(scale: HTMLElement) {
    super(scale);
    this.component.addEventListener(
      'pointerdown', 
      (e) => this.emit('clickOnScale', e)
    );
  }
}

class ButtonView extends View {
  isTriggerd: boolean
  constructor(button: HTMLElement) {
    super(button);
    this.isTriggerd = false;
    this.component.addEventListener(
      'pointerdown',
      (e) => {
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
      (e) => this.isTriggerd && this.emit('pointerMoved', e),
    );
  }

  toggleTrigger(): void {
    this.isTriggerd = this.isTriggerd ? false : true;
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

export {ScaleView, ButtonView};
