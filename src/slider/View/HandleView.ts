class HandleView {
  private styles: CSSStyleDeclaration
  private offset: number
  constructor(
    private handle: HTMLElement,
  ) {
    this.styles = getComputedStyle(this.handle);
    this.offset = this.getOffset();
  }

  static calcShift(
    pointerCoord: number,
    containerCoord: number,
    containerWidth: number,
    handlePosition: number,
  ): number {
    return (pointerCoord - containerCoord) / containerWidth - handlePosition;
  }

  getOffset(): number {
    const matrix = new DOMMatrix(this.styles.transform);
    return matrix.e || matrix.f;
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
}

export default HandleView;

