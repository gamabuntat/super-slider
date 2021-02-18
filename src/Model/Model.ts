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
    this.buttonS = new ButtonModel(
      buttonS.getBoundingClientRect().x,
      0,
      this.scaleW - (this.buttonW * (buttonE ? 2 : 1)),
      0,
    );
    this.buttonE = buttonE 
      ? new ButtonModel(
        buttonE.getBoundingClientRect().x,
        1,
        this.scaleW - this.buttonW,
        this.buttonW,
      ) 
      : this.buttonS;
  }
}

