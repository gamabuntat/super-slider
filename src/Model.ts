import {Options} from './index';
import {EventEmitter} from './EventEmitter';

export default class Model extends EventEmitter {
  x: number;
  scaleX: number;
  scaleW: number;
  btnW: number;
  constructor({ x = 0 }: Options) {
    super();
    this.x = x;
    this.scaleX = 0;
    this.scaleW = 0;
    this.btnW = 0;
  }

  setX(e: PointerEvent): void {
    this.x = e.clientX;
    const {x, scaleX, scaleW, btnW} = this;
    this.emit('changeX', {x, scaleX, scaleW, btnW});
  }

  updateElementsSizes(scale: DOMRect, button?: DOMRect): void {
    this.scaleX = scale.x;
    this.scaleW = scale.width;
    if (button) {
      this.btnW = button.width;
    }
  }   
}
