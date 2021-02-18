import {EventEmitter} from '../EventEmitter/EventEmitter';
import Model from '../Model/Model';

type tActiveButton = 'buttonS' | 'buttonE'

export default class Service extends EventEmitter {
  private activeButton: tActiveButton[]
  constructor(private m: Model) {
    super();
    this.activeButton = ['buttonS', 'buttonE'];
  }

  defineButton(x: number): void {
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(x - (this.m[b].buttonX + this.m.buttonW)) - diff
    ), 0);
    diff < 0 && this.activeButton.reverse();
    console.log(this.activeButton[0]);
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

  sendArguments(): void {
    this.emit(
      'sendArguments',
      this.activeButton[0],
      this.m[this.activeButton[0]].maxExtreme, 
      this.m[this.activeButton[0]].minExtreme,
      this.m.scaleX,
    );
  }

  saveLastPosition(x: number): void {
    this.m[this.activeButton[0]].buttonX = x;
  }
}

