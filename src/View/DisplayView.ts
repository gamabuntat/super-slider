import View from './View';

export default class DisplayView extends View {
  constructor (display: HTMLElement, private offset: number) {
    super(display);
  }

  moveDisplay(
    relativeBtnPos: number,
    displayDeflexion: number,
    scaleW: number,
    relativeButtonW: number,
    maxExtreme: number,
    minExtreme: number
  ): void {
    const relativeOffset = this.offset / scaleW;
    const relativeW = this.getRect().width / scaleW;
    const extremDeflexion = relativeW - (relativeButtonW - displayDeflexion);
    if (this.offset == 0) {
      minExtreme = -Infinity;
    } else {
      maxExtreme = Infinity;
    }
    if (maxExtreme >= (1 - relativeButtonW)) {
      maxExtreme = Infinity;
    }
    const position = Math.min(
      maxExtreme - extremDeflexion + relativeOffset,
      Math.max(
        (relativeBtnPos - displayDeflexion + relativeOffset),
        minExtreme + (relativeW - displayDeflexion)
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
}

