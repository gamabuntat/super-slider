export default class ButtonModel {
  constructor(public btn: HTMLElement, private relative: number) {}

  setRelative(x: number, sx: number, sw: number): void {
    this.relative = (x - sx) / sw;
  }

  getRelative(): number {
    return this.relative;
  }

  getRect(): DOMRect {
    return this.btn.getBoundingClientRect();
  }
}

