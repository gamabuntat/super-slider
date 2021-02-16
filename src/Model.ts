import {Options} from './index';
import {EventEmitter} from './EventEmitter';
import ButtonModel from './Model/ButtonModel';

export default class Model extends EventEmitter {
  private isInterval: boolean
  private min: number
  private scaleW: number
  private valueOfDivision: number
  private scaleX: number
  private btnW: number
  private deflexion: number
  private x: number
  private activeButton: 'button' | 'buttonE'
  private button: ButtonModel
  private buttonE: ButtonModel
  constructor(
    private scale: HTMLElement,
    button: HTMLElement,
    buttonE: HTMLElement | false,
    {interval = false, min = 0, max = 0}: Options
  ) {
    super();
    this.isInterval = interval;
    this.min = min;
    this.scaleW = scale.getBoundingClientRect().width;
    this.scaleX = scale.getBoundingClientRect().x;
    this.btnW = button.getBoundingClientRect().width;
    this.deflexion = this.isInterval ? this.btnW * 2 : this.btnW;
    this.valueOfDivision = (max - min) / (this.scaleW - this.deflexion);
    this.button = new ButtonModel(button, 0);
    this.buttonE = buttonE 
      ? new ButtonModel(buttonE, 1) 
      : this.button;
    this.x = 0;
    this.activeButton = 'button';
  }

  calcValueForDisplayElem(): void {
    console.log(
      Math.round(
        (this[this.activeButton].getRect().x - this.scaleX
          - (this.activeButton == 'button' ? 0 : this.btnW)) 
        * this.valueOfDivision + this.min
      )
    );
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
    this[this.activeButton].setDefaultShift();
  }

  setShiftX(e: PointerEvent): void {
    this[this.activeButton].setShift(e);
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
      this[this.activeButton].getShift(),
    );
    this.emit(
      'changeXDisplay',
      this.activeButton,
      this[this.activeButton].getRect().x,
      this.btnW / 2,
      this.scaleX,
    );
    this.calcValueForDisplayElem();
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
    const buttons: ['button', 'buttonE'] = ['button', 'buttonE'];
    if (this.scaleW < entries[0].contentRect.width) {
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

