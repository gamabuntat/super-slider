import ComponentModel from './ComponentModel';
import {Options} from './index';
import EventEmitter from './EventEmitter';

export default class Model extends EventEmitter {
  ComponentModel: ComponentModel
  x: number;
  shiftX: number;
  constructor(
    scale: HTMLElement,
    button: HTMLElement,
    { x = 0 }: Options
  ) {
    super();
    this.ComponentModel = new ComponentModel(scale, button);
    this.x = x;
    this.shiftX = 0;
  }

  setShiftX(e: PointerEvent): void {
    this.shiftX = e.clientX - this.ComponentModel.getButtonRect().x;
  }

  setX(e: PointerEvent): void {
    this.x = e.clientX;
    this.emit(
      'changeX', 
      [
        this.x,
        this.ComponentModel.getScaleRect().x,
        this.ComponentModel.getScaleRect().width,
        this.shiftX,
        this.ComponentModel.getButtonRect().width, 
      ]
    );
  }
}
