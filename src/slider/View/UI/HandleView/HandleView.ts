import IHandleView from './IHandleView';
import EventBinder from 'slider/EventBinder/EventBinder';

abstract class HandleView extends EventBinder {
  protected shiftX = 0
  protected shiftY = 0
  protected pointerCoordX = 0
  protected pointerCoordY = 0
  private isCapture = false
  private InFocus = false

  constructor(component: HTMLElement) {
    super(component);
    this.bindListeners();
  }

  getCaptureStatus(): boolean {
    return this.isCapture;
  }

  getFocusStatus(): boolean {
    return this.InFocus;
  }

  calcPosition(containerCoord: number, containerSize: number,): number {
    return (this.getPointerCoord() 
      - containerCoord - this.getShift() - this.getOffset()
    ) / containerSize || 0;
  }

  protected resetPositions(): void {
    this.component.style.left = '';
    this.component.style.top = '';
  }

  protected unbindListeners(): void {
    this
      .unbind('pointerdown', this.handleComponentPointerdown)
      .unbind('pointermove', this.handleComponentPointermove)
      .unbind('lostpointercapture', this.handleComponentLostpointercapture)
      .unbind('focusin', this.handleComponentFocusin)
      .unbind('focusout', this.handleComponentFocusout);
  }

  private bindListeners(): void {
    this
      .bind('pointerdown', this.handleComponentPointerdown)
      .bind('pointermove', this.handleComponentPointermove)
      .bind('lostpointercapture', this.handleComponentLostpointercapture)
      .bind('focusin', this.handleComponentFocusin)
      .bind('focusout', this.handleComponentFocusout);
  }

  private handleComponentPointerdown = (ev: PointerEvent): void => {
    this.setShifts(ev);
    this.isCapture = true;
    this.fixPointer(ev.pointerId);
  }

  private handleComponentPointermove = (ev: PointerEvent): void => {
    this.setPointerCoords(ev);
  }

  private handleComponentLostpointercapture = (): void => {
    this.isCapture = false;
  }

  private handleComponentFocusin = (): void => {
    this.InFocus = true;
  }

  private handleComponentFocusout = (): void => {
    this.InFocus = false;
  }

  private setShifts(ev: PointerEvent): void {
    this.shiftX = ev.offsetX;
    this.shiftY = ev.offsetY;
  }

  private setPointerCoords(ev: PointerEvent): void {
    this.pointerCoordX = ev.x;
    this.pointerCoordY = ev.y;
  }

  private fixPointer(pointerID: number): void {
    this.component.setPointerCapture(pointerID);
  }

  abstract move(position: number): void

  abstract swap(): IHandleView

  protected abstract getPointerCoord(): number

  protected abstract getShift(): number

  protected abstract getOffset(): number
}

class HorizontalHandleView extends HandleView implements IHandleView {
  move(position: number): void {
    this.component.style.left = `${position * 100}%`;
  }

  swap(): IHandleView {
    this.unbindListeners();
    this.resetPositions();
    return new VerticalHandleView(this.component);
  }

  protected getPointerCoord(): number {
    return this.pointerCoordX;
  }

  protected getShift(): number {
    return this.shiftX;
  }

  protected getOffset(): number {
    return new DOMMatrix(getComputedStyle(this.component).transform).e;
  }
}

class VerticalHandleView extends HandleView implements IHandleView {
  move(position: number): void {
    this.component.style.top = `${position * 100}%`;
  }

  swap(): IHandleView {
    this.unbindListeners();
    this.resetPositions();
    return new HorizontalHandleView(this.component);
  }

  protected getPointerCoord(): number {
    return this.pointerCoordY;
  }

  protected getShift(): number {
    return this.shiftY;
  }

  protected getOffset(): number {
    return new DOMMatrix(getComputedStyle(this.component).transform).f;
  }
}

export { HorizontalHandleView, VerticalHandleView };

