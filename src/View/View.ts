import EventEmitter from '../EventEmitter/EventEmitter';
import OrientationType from './OrientationType';

export default class View extends EventEmitter {
  protected static isTriggerd = false
  constructor(
    protected component: HTMLElement, protected orient: OrientationType
  ) {
    super();
  }

  getRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }

  toggleVisibility(): void {
    const defaultClass = (
      [...this.component.classList].find((c) => (
        !(c.match(/(?<!_)_(?!_)/) || [])[0]
      ))
    );
    defaultClass && this.component.classList.toggle(`${defaultClass}_hide`);
  }

  static toggleTrigger(): void {
    View.isTriggerd = !View.isTriggerd;
    console.log(View.isTriggerd);
  }

  static defineDecimalPlaces(n: number): number {
    if (Math.abs(n) - Math.abs(Math.trunc(n)) == 0) { 
      return 0;
    }
    const ns = n.toString();
    const lastDigits = (ns.match(/\d+$/) || [])[0];
    return ns.includes('e') ? +lastDigits : +lastDigits.length;
  }
}

