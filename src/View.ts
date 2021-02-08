import {EventEmitter} from './EventEmitter';

class View extends EventEmitter {
  component: HTMLElement
  constructor(component: HTMLElement) {
    super();
    this.component = component;
  }

  init() {
    return this.component.getBoundingClientRect();
  }
}

class ScaleView extends View {
  constructor(scale: HTMLElement) {
    super(scale);
    this.component.addEventListener(
      'pointerdown', 
      (e) => this.emit('clickOnScale', {e})
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
        this.isTriggerd = true;
        this.component.setPointerCapture(e.pointerId);
      }
    );
    this.component.addEventListener(
      'pointerup',
      () => this.isTriggerd = false,
    );
    this.component.addEventListener(
      'pointermove',
      (e) => this.genEvent(e),
    );
  }

  moveButton(
    x: number,
    scaleX: number,
    scaleW: number,
    btnW: number,
  ): void {
    const btnPosition = Math.min(
      scaleW - btnW,
      Math.max((x - scaleX - btnW/ 2), 0)
    );
    this.component.style.left = `${btnPosition}px`;
  }

  genEvent(e: PointerEvent): void {
    this.isTriggerd && this.emit('movePointer', {e});
  }
}

export {ScaleView, ButtonView};
