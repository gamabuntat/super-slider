import { IHandleView, ICalcPositionArgs } from './IHandleView';
import EventBinder from 'slider/EventBinder/EventBinder';

abstract class HandleView extends EventBinder implements IHandleView {
  constructor(component: HTMLElement) {
    super(component);
    this.bind('pointerdown', this.handleComponentPointerdown);
  }

  calcPosition({
    pointerCoord,
    max,
    min,
    containerCoord,
    containerSize,
    shift
  }: ICalcPositionArgs): number {
    return Math.min(max, Math.max(min,
      (pointerCoord - containerCoord - shift + this.getOffset()) 
        / containerSize
    ));
  }

  private handleComponentPointerdown = (ev: PointerEvent): void => {
    this.fixPointer(ev.pointerId);
  }

  private fixPointer(pointerID: number): void {
    this.component.setPointerCapture(pointerID);
  }

  private getOffset(): number {
    const matrix = new DOMMatrix(getComputedStyle(this.component).transform);
    return matrix.e || matrix.f;
  }

  abstract move(position: number): void

  abstract swap(): IHandleView
}

class HorizontalHandleView extends HandleView {
  move(position: number): void {
    this.component.style.left = `${position * 100}%`;
  }

  swap(): IHandleView {
    return new VerticalHandleView(this.component);
  }
}

class VerticalHandleView extends HandleView {
  move(position: number): void {
    this.component.style.top = `${(1 - position) * 100}%`;
  }

  swap(): IHandleView {
    return new HorizontalHandleView(this.component);
  }
}

export { HorizontalHandleView, VerticalHandleView };

