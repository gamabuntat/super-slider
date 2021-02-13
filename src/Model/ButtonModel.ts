export default class ButtonModel {
  private relative: number
  constructor(public btn: HTMLElement) {
    this.relative = 0;
  }

  setRelative(sx: number, sw: number): void {
    this.relative = (this.getRect().x - sx) / sw;
  }

  getRelative(): number {
    return this.relative;
  }

  getRect(): DOMRect {
    return this.btn.getBoundingClientRect();
  }
}

