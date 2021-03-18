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

  defineDecimalPlaces(n: number): number {
    if (Math.abs(n) - Math.abs(Math.trunc(n)) == 0) { 
      return 0;
    }
    const ns = n.toString();
    if (ns.includes('e')) {
      return +ns.match(/\d+$/)![0]; 
    }
    return ns.match(/\d+$/)![0].length;
  }
}

