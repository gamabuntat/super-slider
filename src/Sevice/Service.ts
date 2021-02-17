import {EventEmitter} from '../EventEmitter/EventEmitter';
import Model from '../Model/Model';

type tActiveButton = 'buttonS' | 'buttonE'

export default class Service extends EventEmitter {
  private activeButton: tActiveButton
  constructor(private m: Model) {
    super();
    this.activeButton = 'buttonS';
  }

  setX(x: number): void {
    this.m[this.activeButton].buttonX = x;
  }

  getX(): number {
    return this.m[this.activeButton].buttonX;
  }
}
