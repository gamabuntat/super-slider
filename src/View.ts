import EventEmitter from './EventEmitter';

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

export class ScaleView extends View {
  constructor(scale: HTMLElement) {
    super(scale);
    this.component.addEventListener(
      'pointerdown', 
      (e) => this.emit('clickOnScale', e)
    );
  }
}

export class ButtonView extends View {
  constructor(button: HTMLElement) {
    super(button);
  }

  moveButton(x: number, scaleX: number, btnWidth: number): void {
    this.component.style.left = x - scaleX - btnWidth / 2 + 'px';
  }
}

