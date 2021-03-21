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
  displaySize: number
  relativeDisplaySize: number
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
    this.displaySize = (
      display.getBoundingClientRect()[this.isVertical ? 'height' : 'width']
    );
    this.relativeDisplaySize = this.displaySize / this.trackSize;
    this.buttonS = new ButtonModel(-Infinity, 1, 0);
    this.buttonE = buttonE ? new ButtonModel(Infinity, 1, 0) : this.buttonS;
  }
}

