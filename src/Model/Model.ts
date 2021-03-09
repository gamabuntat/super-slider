import {Options} from '../index';
import ButtonModel from '../Model/ButtonModel';

export default class Model {
  isVertical: boolean
  isInterval: boolean
  min: number
  max: number
  step: number
  trackCoord: number
  trackSize: number
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
      vertical: isVertical = false,
      interval: isInterval = false,
      min = 0,
      max = 10,
      step = 1,
    }: Options
  ) {
    this.isVertical = isVertical;
    this.isInterval = isInterval;
    this.min = min;
    this.max = max;
    this.step = step;
    this.trackCoord = (
      track.getBoundingClientRect()[this.isVertical ? 'y' : 'x']
    );
    this.buttonW = buttonS.getBoundingClientRect().width;
    this.trackSize = (
      track.getBoundingClientRect()[this.isVertical ? 'height' : 'width']
    );
    this.relativeButtonW = this.buttonW / this.trackSize;
    this.displayW = display.getBoundingClientRect().width;
    this.relativeDisplayW = this.displayW / this.trackSize;
    this.valueOfDivision = (max - min) / this.step;
    this.buttonS = new ButtonModel(-Infinity, 1, 0);
    this.buttonE = buttonE ? new ButtonModel(Infinity, 1, 0) : this.buttonS;
  }
}

