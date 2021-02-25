import {Options} from '../index';
import ButtonModel from '../Model/ButtonModel';

export default class Model {
  isInterval: boolean
  min: number
  scaleX: number
  scaleW: number
  buttonS: ButtonModel
  buttonE: ButtonModel
  buttonW: number
  relativeButtonW: number
  constructor(
    scale: HTMLElement,
    buttonS: HTMLElement,
    buttonE: HTMLElement | false,
    {
      interval: isInterval = false,
      min = 0,
      max = 0,
    }: Options
  ) {
    this.isInterval = isInterval;
    this.min = min;
    this.scaleX = scale.getBoundingClientRect().x;
    this.scaleW = scale.getBoundingClientRect().width;
    this.buttonW = buttonS.getBoundingClientRect().width;
    this.relativeButtonW = this.buttonW / this.scaleW;
    this.buttonS = new ButtonModel(
      (buttonS.getBoundingClientRect().x - this.scaleX) / this.scaleW,
      1 - (this.relativeButtonW * (buttonE ? 2 : 1)),
      0
    );
    this.buttonE = buttonE 
      ? new ButtonModel(
        (
          buttonE.getBoundingClientRect().x - this.buttonW - this.scaleX
        ) / this.scaleW,
        1 - (this.relativeButtonW * 2),
        0
      ) 
      : this.buttonS;
  }
}

