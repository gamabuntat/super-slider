import View from './View';

export default class DisplayView extends View {
  private displayDeflexion: number
  constructor (display: HTMLElement, private offset: number, buttonW: number) {
    super(display);
    this.displayDeflexion = (this.getRect().width - buttonW) / 2;
    this.transform(this.displayDeflexion);
  }

  moveDisplay(
    relativeBtnPos: number,
    scaleW: number,
    maxExtreme: number,
    minExtreme: number
  ): void {
    const relDisplayDeflexion = this.displayDeflexion * 2 / scaleW;
    if (this.offset == 0) {
      maxExtreme = Infinity;
    } else {
      minExtreme = -Infinity;
    }
    const position = Math.min(
      maxExtreme - relDisplayDeflexion,
      Math.max(
        relativeBtnPos,
        minExtreme + relDisplayDeflexion
      )
    );
    this.component.style.left = `${position * 100}%`;
  }

  changeValue(
    relativeBtnPos: number,
    min: number,
    valueOfDivision: number,
  ): void {
    const calcValue = (x: number): number => (
      Math.round(x * valueOfDivision + min)
    );
    const value = calcValue(relativeBtnPos);
    this.component.innerHTML = value.toString();
  }

  transform(displayDeflexion: number): void {
    this.component.style.transform = (
      `translate(${this.offset - displayDeflexion}px, 0px)`
    );
  }
}

