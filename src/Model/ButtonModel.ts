export default class ButtonModel {
  shift: number
  constructor(
    public btn: HTMLElement,
    private relative: number,
  ) {
    this.shift = btn.getBoundingClientRect().width / 2;
  }

  setRelative(x: number, sx: number, sw: number): void {
    this.relative = (x - sx) / sw;
  }

  getRelative(): number {
    return this.relative;
  }

  getRect(): DOMRect {
    return this.btn.getBoundingClientRect();
  }

  setShift(e: PointerEvent): void {
    this.shift = e.x - this.getRect().x;
  }

  setDefaultShift(): void {
    this.shift = this.getRect().width / 2;
  }

  getShift(): number {
    return this.shift;
  }
}

