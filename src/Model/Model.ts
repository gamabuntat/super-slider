import {Options} from '../index';
import ButtonModel from '../Model/ButtonModel';

export default class Model {
  isInterval: boolean
  min: number
  max: number
  step: number
  scaleX: number
  scaleW: number
  buttonS: ButtonModel
  buttonE: ButtonModel
  buttonW: number
  relativeButtonW: number
  displayW: number
  relativeDisplayW: number
  valueOfDivision: number
  constructor(
    scale: HTMLElement,
    buttonS: HTMLElement,
    buttonE: HTMLElement | false,
    display: HTMLElement,
    {
      interval: isInterval = false,
      min = 0,
      max = 10,
      step = 1,
    }: Options
  ) {
    this.isInterval = isInterval;
    this.min = min;
    this.max = max;
    this.step = step;
    this.scaleX = scale.getBoundingClientRect().x;
    this.buttonW = buttonS.getBoundingClientRect().width;
    this.scaleW = scale.getBoundingClientRect().width;
    this.relativeButtonW = this.buttonW / this.scaleW;
    this.displayW = display.getBoundingClientRect().width;
    this.relativeDisplayW = this.displayW / this.scaleW;
    this.valueOfDivision = (max - min) / this.step;
    this.buttonS = new ButtonModel(
      (buttonS.getBoundingClientRect().x - this.scaleX) / this.scaleW,
      1,
      0
    );
    this.buttonE = buttonE 
      ? new ButtonModel(
        (buttonE.getBoundingClientRect().x - this.scaleX) / this.scaleW,
        1,
        0
      ) 
      : this.buttonS;
  }
}

