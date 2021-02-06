import {Options} from './index';
import EventEmitter from './EventEmitter';

export default class Model extends EventEmitter {
  x: number;
  constructor({ x = 0 }: Options) {
    super();
    this.x = x;
  }

  setX(e: MouseEvent): void {
    this.x = e.clientX;
    console.log(this.x);
  }
}
