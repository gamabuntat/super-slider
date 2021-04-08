import View from './View';
import OrientationType from './OrientationType';

export default class ButtonView extends View {
  private width: number
  private shift: number
  constructor(
    button: HTMLElement,
    orient: OrientationType,
    private transformOffset: number,
    private offset: number, 
  ) {
    super(button, orient);
    this.width = this.getRect().width;
    this.shift = this.width / 2;
    this.component.style.transform = (
      `translate${this.orient.coord.toUpperCase()}(
        ${transformOffset * (this.orient.isVertical ? -1 : 1)}px
      )`
    );
    this.bindEventListeners();
  }

  bindEventListeners(): void {
    this.component.addEventListener(
      'pointerdown', this.handleButtonPointerDown.bind(this)
    );
    this.component.addEventListener(
      'lostpointercapture', this.handleButtonLostPointer.bind(this)
    );
    this.component.addEventListener(
      'pointermove', this.handleButtonPointerMove.bind(this)
    );
  }

  handleButtonPointerDown(e: PointerEvent): void {
    this.toggleTrigger();
    this.setShift(e[this.orient.coord]);
    this.fixPointer(e.pointerId);
    this.emit(
      'pointerDown',
      e[this.orient.coord] + (
        this.orient.isVertical ? window.pageYOffset : window.pageXOffset
      ),
    );
  }

  handleButtonLostPointer(): void {
    this.toggleTrigger();
    this.setDefaultShift();
  }

  handleButtonPointerMove(e: PointerEvent): void {
    View.isTriggerd && this.emit('moveButton', e[this.orient.coord]);
  }

  setShift(coord: number): void {
    this.shift = coord - this.getRect()[this.orient.coord];
    if (this.orient.isVertical) {
      this.shift = this.width - this.shift;
    }
  }

  setDefaultShift(): void {
    this.shift = this.width / 2;
  }

  fixPointer(pointerId: number): void {
    this.component.setPointerCapture(pointerId);
  }

  calcPosition(
    coord: number, 
    maxExtreme: number,
    minExtreme: number,
    trackCoord: number,
    trackSize: number
  ): void {
    const provisionalPos = (
      (coord + 
        (this.orient.isVertical ? window.pageYOffset : window.pageXOffset)
        - trackCoord + (this.shift + this.transformOffset) 
        * (this.orient.isVertical ? 1 : -1)) / trackSize
    );
    const position = Math.min(
      maxExtreme,
      Math.max(
        this.orient.isVertical ? (1 - provisionalPos) : provisionalPos,
        minExtreme
      )
    );
    this.moveButton(position);
  }

  calcPositionApi(
    pos: number,
    max: number,
    min: number,
    maxExtreme: number,
    minExtreme: number
  ): void {
    const position = (pos - min) / (max - min);
    this.moveButton(Math.min(maxExtreme, Math.max(position, minExtreme)));
  }

  moveButton(position: number): void {
    this.component.style[this.orient.styleCoord] = `${position * 100}%`;
    this.emit(
      'updatePosition', 
      this.getRect()[this.orient.coord] + this.offset + (
        (this.orient.isVertical ? window.pageYOffset : window.pageXOffset)
      )
    );
  }
}

