import {IHandleView, ICalcPositionArgs} from './IHandleView';
import EventBinder from '../../../EventBinder/EventBinder';

class HandleView extends EventBinder implements IHandleView {
  private offset: number
  constructor(component: HTMLElement) {
    super(component);
    this.offset = this.getOffset();
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
    return Math.min(
      max, 
      Math.max(
        min,
        (pointerCoord - containerCoord - shift + this.offset) 
          / containerSize
      )
    );
  }

  moveX(position: number): void {
    this.component.style.left = `${position * 100}%`;
  }

  moveY(position: number): void {
    this.component.style.top = `${position * 100}%`;
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
}

export default HandleView;

