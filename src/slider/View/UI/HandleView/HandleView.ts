import { IHandleView, ICalcPositionArgs } from './IHandleView';
import EventBinder from 'slider/EventBinder/EventBinder';

abstract class HandleView extends EventBinder {
  protected shiftX = 0
  protected shiftY = 0
  protected pointerCoordX = 0
  protected pointerCoordY = 0

  constructor(component: HTMLElement) {
    super(component);
  }

  logShift(): void {
    this.getShift();
  }

  calcPosition({
    max,
    min,
    containerCoord,
    containerSize,
  }: ICalcPositionArgs): number {
    return Math.min(max, Math.max(min,
      (
        this.getPointerCoord() 
        - containerCoord - this.getShift() + this.getOffset()
      ) 
      / containerSize
    ));
  }

  bindListeners(): IHandleView {
    return this
      .bind('pointerdown', this.handleComponentPointerdown)
      .bind('pointermove', this.handleComponentPointermove);
  }

  private handleComponentPointerdown = (ev: PointerEvent): void => {
    this.setShifts(ev);
    this.fixPointer(ev.pointerId);
  }

  private handleComponentPointermove = (ev: PointerEvent): void => {
    this.setPointerCoords(ev);
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
    return new VerticalHandleView(this.component);
  }

  protected getPointerCoord(): number {
    return this.pointerCoordX;
  }

  protected getShift(): number {
    console.log('horizontal shift');
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
    return new HorizontalHandleView(this.component);
  }

  protected getPointerCoord(): number {
    return this.pointerCoordY;
  }

  protected getShift(): number {
    console.log('vertical shift');
    return this.shiftY;
  }

  protected getOffset(): number {
    return new DOMMatrix(getComputedStyle(this.component).transform).f;
  }
}

export { HorizontalHandleView, VerticalHandleView };

