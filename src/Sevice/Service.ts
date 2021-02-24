import {EventEmitter} from '../EventEmitter/EventEmitter';
import Model from '../Model/Model';

type tActiveButton = 'buttonS' | 'buttonE'

export default class Service extends EventEmitter {
  private activeButton: tActiveButton[]
  constructor(private m: Model) {
    super();
    this.activeButton = ['buttonS', 'buttonE'];
  }

  determineButton(x: number): void {
    const relativePointerPosition = (
      (x - this.m.scaleX) / this.m.scaleW - this.m.relativeButtonW / 2
    );
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(relativePointerPosition - this.m[b].relativeX) - diff
    ), 0);
    diff < 0 && this.activeButton.reverse();
    console.log(this.activeButton[0]);
  }

  setMaxExtreme(): void {
    this.m.buttonS.maxExtreme = (
      this.m.buttonE.relativeX - this.m.relativeButtonW
    );
  }

  setMinExtreme(): void {
    this.m.buttonE.minExtreme = (
      this.m.buttonS.relativeX + this.m.relativeButtonW
    );
  }

  sendMainData(x: number): void {
    this.emit(
      'sendMainData',
      x,
      this.m[this.activeButton[0]].maxExtreme, 
      this.m[this.activeButton[0]].minExtreme,
      this.m.scaleX,
      this.m.scaleW
    );
  }

  getActiveButton(): tActiveButton {
    return this.activeButton[0];
  }

  saveLastPosition(x: number): void {
    this.m[this.activeButton[0]].relativeX = (
      (x - this.m.scaleX) / this.m.scaleW
    );
  }

  updateScaleSizes(w: number): void {
    this.m.scaleW = w;
    this.m.relativeButtonW = this.m.buttonW / w;
    this.m.buttonE.maxExtreme = 1 - this.m.relativeButtonW,
    this.setMaxExtreme();
    this.setMinExtreme();
  }
}

