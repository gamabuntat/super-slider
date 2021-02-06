import EventEmitter from './EventEmitter';

class View extends EventEmitter {
  component: HTMLElement
  constructor(component: HTMLElement) {
    super();
    this.component = component;
  }
}

export class ScaleView extends View {
  constructor(component: HTMLElement) {
    super(component);
    this.component.addEventListener(
      'click', 
      (e) => this.emit('clickOnScale', e)
    )
  }
}

class ButtonView extends View {}

