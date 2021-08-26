import IHandleView from './IHandleView';
import EventBinder from 'slider/EventBinder/EventBinder';

abstract class HandleView extends EventBinder {
  protected shiftX = 0
  protected shiftY = 0
  protected pointerCoordX = 0
  protected pointerCoordY = 0
  private frontMod: string

  constructor(component: HTMLElement) {
    super(component);
    this.frontMod = this.getFrontMod();
    this.bindListeners();
  }

  calcPosition(
    min: number,
    max: number,
    containerCoord: number,
    containerSize: number,
  ): number {
    return Math.min(max, Math.max(min, (
      this.getPointerCoord() 
      - containerCoord - this.getShift() - this.getOffset()
    ) / containerSize));
  }

  protected resetPositions(): void {
    this.component.style.left = '';
    this.component.style.top = '';
  }

  private getFrontMod(): string {
    return `${this.component.classList[0].replace(/--.*/, '')}--front`;
  }

  private bindListeners(): void {
    this
      .bind('pointerdown', this.handleComponentPointerdown)
      .bind('pointermove', this.handleComponentPointermove)
      .bind('lostpointercapture', this.handleComponentLostpointercapture)
    ;
  }

  protected unbindListeners(): void {
    this
      .unbind('pointerdown', this.handleComponentPointerdown)
      .unbind('pointermove', this.handleComponentPointermove)
      .unbind('lostpointercapture', this.handleComponentLostpointercapture)
    ;
  }

  private handleComponentPointerdown = (ev: PointerEvent): void => {
    this.setShifts(ev);
    this.fixPointer(ev.pointerId);
    this.component.classList.toggle(this.frontMod);
  }

  private handleComponentPointermove = (ev: PointerEvent): void => {
    this.setPointerCoords(ev);
  }

  private handleComponentLostpointercapture = (): void => {
    this.component.classList.toggle(this.frontMod);
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

