import { IHandleView, ICalcPositionArgs } from './IHandleView';
import EventBinder from 'slider/EventBinder/EventBinder';

abstract class HandleView extends EventBinder {
  protected shiftX = 0
  protected shiftY = 0
  protected pointerCoordX = 0
  protected pointerCoordY = 0

  constructor(component: HTMLElement) {
    super(component);
    this.bindListeners();
  }

  calcPosition({
    max,
    min,
    containerCoord,
    containerSize,
    divisionNumber = 3
  }: ICalcPositionArgs): number {
    console.log({max, min, containerCoord, containerSize});
    console.log('pointerCoord = ' + this.getPointerCoord());
    console.log('shift = ' + this.getShift());
    console.log('offset = ' + this.getOffset());
    return Math.min(max, Math.max(min, 1 / divisionNumber * Math.round(
      (this.getPointerCoord() 
        - containerCoord - this.getShift() - this.getOffset()
      ) / containerSize * divisionNumber
    )))
    ;
  }

  private bindListeners(): void {
    this
      .bind('pointerdown', this.handleComponentPointerdown)
      .bind('pointermove', this.handleComponentPointermove);
  }

  protected unbindListeners(): void {
    this
      .unbind('pointerdown', this.handleComponentPointerdown)
      .unbind('pointermove', this.handleComponentPointermove);
  }

  private handleComponentPointerdown = (ev: PointerEvent): void => {
    this.setShifts(ev);
    this.fixPointer(ev.pointerId);
  }

  private handleComponentPointermove = (ev: PointerEvent): void => {
    this.setPointerCoords(ev);
  }

  private setShifts(ev: PointerEvent): void {
    console.log('set shiftX = ' + ev.offsetX);
    console.log('set shiftY = ' + ev.offsetY);
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
    return new VerticalHandleView(this.component);
  }

  protected getPointerCoord(): number {
    return this.pointerCoordX;
  }

  protected getShift(): number {
    console.log('this shift X: ' + this.shiftX);
    return this.shiftX;
  }

  protected getOffset(): number {
    return new DOMMatrix(getComputedStyle(this.component).transform).e;
  }
}

class VerticalHandleView extends HandleView implements IHandleView {
  move(position: number): void {
    this.component.style.top = `${(1 - position) * 100}%`;
  }

  swap(): IHandleView {
    this.unbindListeners();
    return new HorizontalHandleView(this.component);
  }

  protected getPointerCoord(): number {
    return this.pointerCoordY;
  }

  protected getShift(): number {
    console.log('this shift Y: ' + this.shiftY);
    return this.shiftY;
  }

  protected getOffset(): number {
    return new DOMMatrix(getComputedStyle(this.component).transform).f;
  }
}

export { HorizontalHandleView, VerticalHandleView };

