import {Options} from './index';
import {EventEmitter} from './EventEmitter';

export default class Model extends EventEmitter {
  x: number;
  scaleRect?: DOMRect;
  buttonRect?: DOMRect;
  constructor({ x = 0 }: Options) {
    super();
    this.x = x;
  }

  setX(e: PointerEvent): void {
    this.x = e.clientX;
    console.log(this.x);
  }

  keepElementRect(scale: DOMRect, button: DOMRect): void {
    this.scaleRect = scale;
    this.buttonRect = button;
  }
}
