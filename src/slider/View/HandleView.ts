import EventBinder from '../EventBinder/EventBinder';

class HandleView extends EventBinder {
  private offset: number
  constructor(component: HTMLElement) {
    super(component);
    this.offset = this.getOffset();
    this.bind('pointerdown', this.handleComponentPointerdown);
  }

  calcPosition(
    pointerCoord: number,
    max: number,
    min: number,
    containerCoord: number,
    containerSize: number,
    shift: number
  ): number {
    return Math.min(
      max, 
      Math.max(
        min,
        (pointerCoord - containerCoord - shift + this.offset) 
          / containerSize
      )
    );
  }

  moveHandle(position: number): void {
    this.component.style.left = `${position * 100}%`;
  }

  handleComponentPointerdown = (ev: PointerEvent): void => {
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

