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
    const relativePointerPosition = (x - this.m.scaleX) / this.m.scaleW;
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(
        relativePointerPosition - (
          this.m[b].relativeX 
          + this.m.relativeButtonW * (b == 'buttonS' ? 0.5 : 1.5)
        )
      ) - diff
    ), 0);
    diff < 0 && this.activeButton.reverse();
    console.log(this.activeButton[0]);
  }

  setMaxExtreme(): void {
    this.m.buttonS.maxExtreme = this.m.buttonE.relativeX;
  }

  setMinExtreme(): void {
    this.m.buttonE.minExtreme = this.m.buttonS.relativeX;
  }

  sendButtonData(x: number): void {
    this.emit(
      'sendButtonData',
      x,
      this.m[this.activeButton[0]].maxExtreme, 
      this.m[this.activeButton[0]].minExtreme,
      this.m.scaleX,
      this.m.scaleW
    );
  }

  sendDisplayData(): void {
    this.emit(
      'sendDisplayData',
      this.m[this.activeButton[0]].relativeX,
      this.m.displayDeflexion,
      this.m.scaleW,
      this.m.relativeButtonW,
      this.m[this.activeButton[0]].maxExtreme,
      this.m[this.activeButton[0]].minExtreme,
    );
    this.emit(
      'changeValue',
      this.m[this.activeButton[0]].relativeX,
      this.m.min,
      this.m.valueOfDivision
    );
  }

  getActiveButton(): tActiveButton {
    return this.activeButton[0];
  }

  saveLastPosition(x: number): void {
    this.m[this.activeButton[0]].relativeX = (
      (x - this.m.scaleX) / this.m.scaleW
    );
    this.sendDisplayData();
  }

  updateSizes(w: number): void {
    this.m.scaleW = w;
    this.m.relativeButtonW = this.m.buttonW / w;
    this.m.buttonE.maxExtreme = 1 - (this.m.relativeButtonW * 2);
    this.setMaxExtreme();
    this.setMinExtreme();
  }

  init(): void {
    this.sendButtonData(-Infinity);
    this.sendDisplayData();
    this.activeButton.reverse();
    this.sendButtonData(Infinity);
    this.sendDisplayData();
  }
}

