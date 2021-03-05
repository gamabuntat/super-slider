import EventEmitter from '../EventEmitter/EventEmitter';
import OrientationType from './OrientationType';

export default class View extends EventEmitter {
  protected static isTriggerd = false
  constructor(
    protected component: HTMLElement, protected orient: OrientationType
  ) {
    super();
  }

  toggleTrigger(): void {
    View.isTriggerd = View.isTriggerd ? false : true;
    console.log(View.isTriggerd);
  }

  getRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }

  defineDecimalPlaces(x: number): number {
    const dotPosition = x.toString().indexOf('.') + 1;
    return dotPosition == 0 ? 0 : x.toString().length - dotPosition;
  }
}

