import {EventEmitter} from '../EventEmitter/EventEmitter';

export default class View extends EventEmitter {
  // resizeObserver: ResizeObserver
  constructor(protected component: HTMLElement) {
    super();
    // this.resizeObserver = new ResizeObserver((entries) => {
    //   this.emit('resizeElem', entries);
    // });
    // this.resizeObserver.observe(this.component);
  }

  getRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }
}

