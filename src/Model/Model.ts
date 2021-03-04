import {Options} from '../index';
import ButtonModel from '../Model/ButtonModel';

export default class Model {
  isInterval: boolean
  min: number
  max: number
  step: number
  trackX: number
  trackW: number
  buttonS: ButtonModel
  buttonE: ButtonModel
  buttonW: number
  relativeButtonW: number
  displayW: number
  relativeDisplayW: number
  valueOfDivision: number
  constructor(
    track: HTMLElement,
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
    this.trackX = track.getBoundingClientRect().x;
    this.buttonW = buttonS.getBoundingClientRect().width;
    this.trackW = track.getBoundingClientRect().width;
    this.relativeButtonW = this.buttonW / this.trackW;
    this.displayW = display.getBoundingClientRect().width;
    this.relativeDisplayW = this.displayW / this.trackW;
    this.valueOfDivision = (max - min) / this.step;
    this.buttonS = new ButtonModel(-Infinity, 1, 0);
    this.buttonE = buttonE ? new ButtonModel(Infinity, 1, 0) : this.buttonS;
  }
}

