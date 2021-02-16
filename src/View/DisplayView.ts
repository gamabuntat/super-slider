import View from './View';

export default class DisplayView extends View {
  constructor (display: HTMLElement) {
    super(display);
  }

  moveDisplay(x: number, c: number, scaleX: number): void {
    const position = x + c - scaleX - this.getRect().width / 2;
    this.component.style.left = `${position}px`;
  }
}
