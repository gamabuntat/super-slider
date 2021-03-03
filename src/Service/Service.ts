import EventEmitter from '../EventEmitter/EventEmitter';
import Model from '../Model/Model';

type tActiveButton = 'buttonS' | 'buttonE'

export default class Service extends EventEmitter {
  private activeButton: tActiveButton[]
  constructor(private m: Model) {
    super();
    this.activeButton = ['buttonS', 'buttonE'];
  }

  determineButton(x: number): void {
    const relativePointerPosition = (x - this.m.trackX) / this.m.trackW;
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(
        relativePointerPosition - (
          this.m[b].relativeX 
          + this.m.relativeButtonW * (b == 'buttonS' ? -0.5 : 0.5)
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
      this.m.trackX,
      this.m.trackW
    );
  }

  sendDisplayData(): void {
    this.emit(
      'sendDisplayData',
      this.m[this.activeButton[0]].relativeX,
      this.m.trackW,
      this.m.isInterval ? this.m[this.activeButton[0]].maxExtreme : Infinity,
      this.m[this.activeButton[0]].minExtreme,
    );
    this.emit(
      'changeValue',
      this.m[this.activeButton[0]].relativeX,
      this.m.min,
      this.m.max,
      this.m.valueOfDivision,
      this.m.step
    );
  }

  sendProgressBarData(): void {
    this.emit(
      'changeWidth',
      this.m[this.activeButton[0]].relativeX,
      this.m.relativeButtonW
    );
  }

  sendScaleData(): void {
    this.emit('sendScaleData', this.m.max, this.m.min);
  }

  getActiveButton(): tActiveButton {
    return this.activeButton[0];
  }

  saveLastPosition(x: number): void {
    this.m[this.activeButton[0]].relativeX = (
      (x - this.m.trackX) / this.m.trackW
    );
    this.sendDisplayData();
    this.sendProgressBarData();
  }

  updateSizes(w: number): void {
    this.m.trackW = w;
    this.m.relativeButtonW = this.m.buttonW / w;
    this.m.relativeDisplayW = this.m.displayW / w;
  }

  init(): void {
    this.sendButtonData(-Infinity);
    this.sendDisplayData();
    if (this.m.isInterval) {
      this.activeButton.reverse();
      this.sendButtonData(Infinity);
      this.sendDisplayData();
    }
    this.sendScaleData();
  }
}

