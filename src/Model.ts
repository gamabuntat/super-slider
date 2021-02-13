import {EventEmitter} from './EventEmitter';

type relativeX = 'buttonRelativelyX' | 'buttonERelativelyX';

export default class Model extends EventEmitter {
  private scaleW: number
  private scaleX: number
  private btnW: number
  private shiftX: number
  private x: number
  private buttonRelativelyX: number
  private buttonERelativelyX: number
  private activeButton: 'button' | 'buttonE'
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
    this.buttonRelativelyX = 0;
    this.buttonERelativelyX = 1;
    this.activeButton = 'button';
  }

  determineButton(e: PointerEvent): void {
    this.activeButton = e.target === this.button ? 'button' : 'buttonE';
    this.emit('setActiveButton', this.activeButton, e.pointerId);
  }

  setDefaultShiftX(): void {
    this.shiftX = this.btnW / 2;
  }

  setShiftX(e: PointerEvent): void {
    const activeButton = this[this.activeButton];
    if (activeButton) {
      this.shiftX = e.x - activeButton.getBoundingClientRect().x;
    }
  }

  setX(e: PointerEvent | number): void {
    if (typeof e == 'number') {
      this.x = e;
    } else {
      this.x = e.x;
      this.setRelativelyX();
    }
    this.emit(
      'changeX',
      this.activeButton,
      this.x,
      this.scaleX,
      this.scaleW,
      this.shiftX,
      this.btnW,
    );
  }

  setRelativelyX(): void {
    const relativeX = `${this.activeButton}RelativelyX` as relativeX;
    this[relativeX] = (this.x - this.scaleX) / this.scaleW;
  }

  updateScaleSizes(): void {
    this.scaleW = this.scale.getBoundingClientRect().width;
    this.scaleX = this.scale.getBoundingClientRect().x;
    // this.setX(this.relativelyX * this.scaleW + this.scaleX);
  }
}
