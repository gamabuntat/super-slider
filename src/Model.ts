import {Options} from './index';
import {EventEmitter} from './EventEmitter';

export default class Model extends EventEmitter {
  x: number;
  scaleX: number;
  scaleW: number;
  btnW: number;
  shiftX: number;
  constructor(
    private scale: HTMLElement,
    private button: HTMLElement,
    { x = 0 }: Options
  ) {
    super();
    this.x = x;
    this.scaleX = this.scale.getBoundingClientRect().x;
    this.scaleW = this.scale.getBoundingClientRect().width;
    this.btnW = this.button.getBoundingClientRect().width;
    this.shiftX = 0;
  }

  setShiftX(e: PointerEvent): void {
    this.shiftX = e.clientX - this.button.getBoundingClientRect().x;
  }

  setX(e: PointerEvent): void {
    this.x = e.clientX;
    this.updateElementsSizes();
    const {x, scaleX, scaleW, shiftX, btnW} = this;
    this.emit('changeX', {x, scaleX, scaleW, shiftX, btnW});
  }

  updateElementsSizes(): void {
    this.scaleX = this.scale.getBoundingClientRect().x;
    this.scaleW = this.scale.getBoundingClientRect().width;
    this.btnW === 0 
      && (this.btnW = this.button.getBoundingClientRect().width);
  }   
}
