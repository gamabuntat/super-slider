import EventEmitter from '../EventEmitter/EventEmitter';

export default class View extends EventEmitter {
  protected static isTriggerd = false
  constructor(protected component: HTMLElement) {
    super();
  }

  toggleTrigger(): void {
    View.isTriggerd = View.isTriggerd ? false : true;
    console.log(View.isTriggerd);
  }

  getRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }
}

