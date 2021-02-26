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
    maxExtreme = Infinity;
    minExtreme = -Infinity;
    const position = Math.min(
      maxExtreme - extremDeflexion + relativeOffset,
      Math.max(
        (relativeBtnPos - displayDeflexion + relativeOffset),
        minExtreme + (relativeW - displayDeflexion)
      )
    );
    this.component.style.left = `${position * 100}%`;
  }

  changeValue(value: number): void {
    this.component.innerHTML = value.toString();
  }
}

