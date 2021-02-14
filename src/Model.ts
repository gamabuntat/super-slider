import {Options} from './index';
import {EventEmitter} from './EventEmitter';
import ButtonModel from './Model/ButtonModel';

export default class Model extends EventEmitter {
  private isInterval: boolean
  private button: ButtonModel
  private buttonE: ButtonModel
  private scaleW: number
  private scaleX: number
  private btnW: number
  private shiftX: number
  private x: number
  private activeButton: 'button' | 'buttonE'
  constructor(
    private scale: HTMLElement,
    button: HTMLElement,
    buttonE: HTMLElement | false,
    {interval = false}: Options
  ) {
    super();
    this.isInterval = interval;
    this.button = new ButtonModel(button, 0);
    this.buttonE = buttonE ? new ButtonModel(buttonE, 1) : this.button;
    this.scaleW = scale.getBoundingClientRect().width;
    this.scaleX = scale.getBoundingClientRect().x;
    this.btnW = button.getBoundingClientRect().width;
    this.shiftX = this.btnW / 2;
    this.x = 0;
    this.activeButton = 'button';
  }

  defineButton(e: PointerEvent): void {
    this.activeButton = e.target === this.button.btn ? 'button' : 'buttonE';
    this.emit('setActiveButton', this.activeButton, e.pointerId);
  }

  findButton(e: PointerEvent): void {
    const [b, be] = [this.button, this.buttonE].map((b) => (
      Math.abs(e.x - (b.getRect().x + this.btnW / 2))
    ));
    const minDistance = Math.min(b, be);
    this.activeButton = minDistance == b ? 'button' : 'buttonE';
    this.emit('setActiveButton', this.activeButton, e.pointerId);
  }

  setDefaultShiftX(): void {
    this.shiftX = this.btnW / 2;
  }

  setShiftX(e: PointerEvent): void {
    this.shiftX = e.x - this[this.activeButton].getRect().x;
  }

  setX(e: PointerEvent | number): void {
    if (typeof e == 'number') {
      this.x = e;
    } else {
      this.x = e.x;
      this.setRelatively();
    }
    this.emit(
      'changeX',
      this.activeButton,
      this.x,
      this.scaleX,
      this.findMaxExtreme(),
      this.findMinExtreme(),
      this.shiftX,
    );
  }

  findMaxExtreme(): number {
    return this.isInterval && (this.activeButton === 'button')
      ? this.buttonE.getRect().x - this.scaleX - this.btnW 
      : this.scaleW - this.btnW;
  }

  findMinExtreme(): number {
    return this.isInterval && (this.activeButton === 'buttonE')
      ? this.button.getRect().x - this.scaleX + this.btnW 
      : 0;
  }

  setRelatively(): void {
    this[this.activeButton].setRelative(this.x, this.scaleX, this.scaleW);
  }

  updateScaleSizes(entries: ResizeObserverEntry[]): void {
    console.log(entries[0].contentRect.width);
    const buttons: ['button', 'buttonE'] = ['button', 'buttonE'];
    if (this.scaleW > entries[0].contentRect.width) {
      buttons.reverse();
    }
    this.scaleX = this.scale.getBoundingClientRect().x;
    this.scaleW = this.scale.getBoundingClientRect().width;
    buttons.forEach((b) => {
      this.activeButton = b;
      this.setX(this[b].getRelative() * this.scaleW + this.scaleX);
    });
  }
}

