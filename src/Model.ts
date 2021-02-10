import {Options} from './index';
import {EventEmitter} from './EventEmitter';

export default class Model extends EventEmitter {
  private scaleW: number
  private scaleX: number
  private btnW: number
  private x: number
  private shiftX: number
  private relativelyX: number
  constructor(
    scale: HTMLElement,
    button: HTMLElement,
    { x = 0 }: Options
  ) {
    super();
    this.scaleW = scale.getBoundingClientRect().width;
    this.scaleX = scale.getBoundingClientRect().x;
    this.btnW = button.getBoundingClientRect().width;
    this.x = x;
    this.shiftX = this.btnW / 2;
    this.relativelyX = (this.x - this.scaleX) / this.scaleW;
  }

  setDefaultShiftX(): void {
    this.shiftX = this.btnW / 2;
  }

  setShiftX(e: PointerEvent, btnRect: DOMRect): void {
    this.shiftX = e.x - btnRect.x;
  }

  setX(e: PointerEvent | number): void {
    if (typeof e == 'number') {
      this.x = e;
    } else {
      this.x = e.x;
      this.setRelativelyX();
    }
    this.emit(
      'changeX', 
      this.x,
      this.scaleX,
      this.scaleW,
      this.shiftX,
      this.btnW,
    );
  }

  setRelativelyX(): void {
    this.relativelyX = (this.x - this.scaleX) / this.scaleW;
  }

  updateScaleSizes(scaleRect: DOMRect): void {
    this.scaleW = scaleRect.width;
    this.scaleX = scaleRect.x;
    this.setX(this.relativelyX * this.scaleW + this.scaleX);
  }
}

