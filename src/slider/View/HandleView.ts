import IHandle from '../interfaces/IHandle';

class HandleView {
  private styles: CSSStyleDeclaration
  private width: number
  private offset: number
  constructor(
    private handle: HTMLElement,
  ) {
    this.styles = getComputedStyle(this.handle);
    this.width = parseInt(this.styles.width);
    this.offset = this.getOffset();
  }

  getOffset(): number {
    const matrix = new DOMMatrix(this.styles.transform);
    return matrix.e || matrix.f;
  }

  calcPosition(): number {
    return Math.random();
  }

  moveHandle(position: number): void {
    this.handle.style.left = String(position);
  }
}

export default HandleView;

