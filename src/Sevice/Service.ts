import {EventEmitter} from '../EventEmitter/EventEmitter';
import Model from '../Model/Model';

type tActiveButton = 'buttonS' | 'buttonE'

export default class Service extends EventEmitter {
  private m: Model
  private activeButton: tActiveButton[]
  constructor(m: Model) {
    super();
    this.m = new Proxy(m, {
      set(target, prop, val) {
        if (prop == 'scaleW') {
          target.scaleW = val;
          if (target.isInterval) {
            target.buttonE.maxExtreme = target.scaleW - target.buttonW;
          }
          return true;
        }
        return false;
      }
    });
    this.activeButton = ['buttonS', 'buttonE'];
  }

  defineButton(x: number): void {
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(x - (this.m[b].buttonX + this.m.buttonW / 2)) - diff
    ), 0);
    diff < 0 && this.activeButton.reverse();
    console.log(this.activeButton[0]);
  }

  setRelative(): void {
    const ab = this.m[this.activeButton[0]];
    ab.relativePosition = (ab.buttonX + this.m.buttonW / 2) / this.m.scaleW;
  }

  setMaxExtreme(): void {
    this.m.buttonS.maxExtreme = (
      this.m.buttonE.buttonX - this.m.scaleX - this.m.buttonW
    );
  }

  setMinExtreme(): void {
    this.m.buttonE.minExtreme = (
      this.m.buttonS.buttonX - this.m.scaleX + this.m.buttonW
    );
  }

  sendData(x: number): void {
    this.emit(
      'sendData',
      x,
      this.m[this.activeButton[0]].maxExtreme, 
      this.m[this.activeButton[0]].minExtreme,
      this.m.scaleX,
    );
  }

  getActiveButton(): tActiveButton {
    return this.activeButton[0];
  }

  saveLastPosition(x: number): void {
    this.m[this.activeButton[0]].buttonX = x;
    this.setRelative();
  }

  updateScaleSizes(w: number): void {
    this.m.scaleW = w;
    this.activeButton.reverse();
    this.sendData(
      this.m[this.activeButton[0]].relativePosition * w
    );
    this.setMaxExtreme();
  }
}

