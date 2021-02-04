import {Options} from './index';
import EventEmitter from './EventEmitter';

export default class Model extends EventEmitter {
  options: Options;
  constructor(o: Options) {
    super();
    this.options = o;
  }

  setX(x: number): void {
    this.options.x = x;
  }
}
