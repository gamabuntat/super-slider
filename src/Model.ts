import {EventEmitter} from './EventEmitter';

export default class Model extends EventEmitter {
  private scaleW: number
  private scaleX: number
  private btnW: number
  private shiftX: number
  private x: number
  private xe: number
  private relativelyX: number
  private activeButton: string
  constructor(
    private scale: HTMLElement,
    private button: HTMLElement,
    private buttonE: HTMLElement | false,
  ) {
    super();
    this.scaleW = scale.getBoundingClientRect().width;
    this.scaleX = scale.getBoundingClientRect().x;
    this.btnW = button.getBoundingClientRect().width;
    this.shiftX = this.btnW / 2;
    this.x = 0;
    this.xe = this.scaleW;
    this.relativelyX = (this.x - this.scaleX) / this.scaleW;
    this.activeButton = 'button';
  }

  determineButton(e: PointerEvent): void {
    this.activeButton = e.target === this.button ? 'button' : 'buttonE';
    this.emit('setActiveButton', this.activeButton, e.pointerId);
  }

  setDefaultShiftX(): void {
    this.shiftX = this.btnW / 2;
  }

  setShiftX(e: PointerEvent, btnRect: DOMRect): void {
    this.shiftX = e.x - btnRect.x;
  }

  setX(e: PointerEvent | number): void {
    if (typeof e == 'number') {
      this.x = e;
    } else {
      this.x = e.x;
      this.setRelativelyX();
    }
    console.log(this.x);
    this.emit(
      'changeX', 
      this.x,
      this.scaleX,
      this.scaleW,
      this.shiftX,
      this.btnW,
    );
  }

  setRelativelyX(): void {
    this.relativelyX = (this.x - this.scaleX) / this.scaleW;
  }

  updateScaleSizes(scaleRect: DOMRect): void {
    this.scaleW = scaleRect.width;
    this.scaleX = scaleRect.x;
    this.setX(this.relativelyX * this.scaleW + this.scaleX);
  }
}

