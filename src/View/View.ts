import {EventEmitter} from '../EventEmitter';

export default class View extends EventEmitter {
  protected static isTriggerd = false
  resizeObserver: ResizeObserver
  constructor(protected component: HTMLElement) {
    super();
    this.resizeObserver = new ResizeObserver((entries) => {
      this.emit('resizeElem', entries);
    });
    this.resizeObserver.observe(this.component);
  }

  toggleTrigger(): void {
    View.isTriggerd = View.isTriggerd ? false : true;
    console.log(View.isTriggerd);
  }

  moveComponent(position: number): void {
    this.component.style.left = `${position}px`;
  }

  getRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }
}

