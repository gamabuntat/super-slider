class HandleView {
  private offset: number
  constructor(private handle: HTMLElement) {
    this.offset = this.getOffset();
  }

  calcPosition(
    pointerCoord: number,
    max: number,
    min: number,
    containerCoord: number,
    containerWidth: number,
    shift: number
  ): number {
    return Math.min(
      max, 
      Math.max(
        min,
        (pointerCoord - containerCoord - shift + this.offset) 
          / containerWidth
      )
    );
  }

  moveHandle(position: number): void {
    this.handle.style.left = `${position * 100}%`;
  }

  handleHandlePointerdown = (e: PointerEvent): void => {
    this.fixPointer(e.pointerId);
  }

  private bindEventListeners(): void {
    this.handle
      .addEventListener('pointerdown', this.handleHandlePointerdown);
  }

  private fixPointer(pointerID: number): void {
    this.handle.setPointerCapture(pointerID);
  }

  private getOffset(): number {
    const matrix = new DOMMatrix(getComputedStyle(this.handle).transform);
    return matrix.e || matrix.f;
  }
}

export default HandleView;

