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
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(x - (this.m[b].x + this.m.buttonW / 2)) - diff
    ), 0);
    diff < 0 && this.activeButton.reverse();
    console.log(this.activeButton[0]);
  }

  setMaxExtreme(): void {
    this.m.buttonS.maxExtreme = (
      this.m.buttonE.x - this.m.scaleX - this.m.buttonW
    );
  }

  setMinExtreme(): void {
    this.m.buttonE.minExtreme = (
      this.m.buttonS.x - this.m.scaleX + this.m.buttonW
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
    this.m[this.activeButton[0]].x = x;
  }

  updateScaleSizes(w: number): void {
    this.m.scaleW = w;
  }
}

