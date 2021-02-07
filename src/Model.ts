import {Options} from './index';
import {EventEmitter} from './EventEmitter';

export default class Model extends EventEmitter {
  x: number;
  scaleX: number;
  btnW: number;
  constructor({ x = 0 }: Options) {
    super();
    this.x = x;
    this.scaleX = 0;
    this.btnW = 0;
  }

  setX(e: PointerEvent): void {
    this.x = e.clientX;
    const {x, scaleX, btnW} = this;
    this.emit('changeX', {x, scaleX, btnW});
  }

  keepElementRect(scale: DOMRect, button: DOMRect): void {
    this.scaleX = scale.x;
    this.btnW = button.width;
  }   
}
