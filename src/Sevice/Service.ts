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
    ), 0)
    diff < 0 && this.activeButton.reverse();
  }
}
