import { IHandleView, ICalcPositionArgs } from './IHandleView';
import EventBinder from 'slider/EventBinder/EventBinder';

abstract class HandleView extends EventBinder {
  protected shift = 0
  protected pointerCoord = 0

  constructor(component: HTMLElement) {
    super(component);
  }

  calcPosition({
    max,
    min,
    containerCoord,
    containerSize,
  }: ICalcPositionArgs): number {
    return Math.min(max, Math.max(min,
      (this.pointerCoord - containerCoord - this.shift + this.getOffset()) 
      / containerSize
    ));
  }

  bindListeners(): IHandleView {
    return this
      .bind('pointerdown', this.handleComponentPointerdown)
      .bind('pointermove', this.handleComponentPointermove);
  }

  private handleComponentPointerdown = (ev: PointerEvent): void => {
    this.setShift(ev);
    this.fixPointer(ev.pointerId);
  }

  private handleComponentPointermove = (ev: PointerEvent): void => {
    this.setPointerCoord(ev);
  }

  private fixPointer(pointerID: number): void {
    this.component.setPointerCapture(pointerID);
  }

  abstract move(position: number): void

  abstract swap(): IHandleView

  protected abstract setPointerCoord(ev: PointerEvent): void

  protected abstract setShift(ev: PointerEvent): void

  protected abstract getOffset(): number
}

class HorizontalHandleView extends HandleView implements IHandleView {
  move(position: number): void {
    this.component.style.left = `${position * 100}%`;
  }

  swap(): IHandleView {
    return new VerticalHandleView(this.component);
  }

  protected setPointerCoord(ev: PointerEvent): void {
    this.pointerCoord = ev.x;
  }

  protected setShift(ev: PointerEvent): void {
    this.shift = ev.offsetX;
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

  protected setPointerCoord(ev: PointerEvent): void {
    this.pointerCoord =  ev.y;
  }

  protected setShift(ev: PointerEvent): void {
    this.shift = ev.offsetY;
  }

  protected getOffset(): number {
    return new DOMMatrix(getComputedStyle(this.component).transform).f;
  }
}

export { HorizontalHandleView, VerticalHandleView };

