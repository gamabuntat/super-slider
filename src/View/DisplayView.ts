import View from './View';

export default class DisplayView extends View {
  constructor (display: HTMLElement) {
    super(display);
  }

  moveDisplay(
    btnX: number,
    c: number,
    scaleX: number,
    maxExtreme: number,
    minExtreme: number
  ): void {
    const position = Math.min(
      maxExtreme,
      Math.max((btnX + c - scaleX - this.getRect().width / 2), minExtreme)
    );
    this.component.style.left = `${position}px`;
  }

  changeValue(value: number): void {
    this.component.innerHTML = value.toString();
  }
}
