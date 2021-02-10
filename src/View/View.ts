import {EventEmitter} from '../EventEmitter';

export default class View extends EventEmitter {
  protected static isTriggerd = false
  resizeObserver: ResizeObserver
  constructor(protected component: HTMLElement) {
    super();
    this.resizeObserver = new ResizeObserver(() => {
      this.emit('resizeElem', this.getRect());
    });
    this.resizeObserver.observe(this.component);
  }

  toggleTrigger(): void {
    View.isTriggerd = View.isTriggerd ? false : true;
    console.log(View.isTriggerd);
  }

  getRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }
}

