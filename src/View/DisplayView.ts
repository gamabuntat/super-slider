import View from './View';
import OrientationType from './OrientationType';

export default class DisplayView extends View {
  private displayDeflexion: number
  constructor (
    display: HTMLElement, 
    orient: OrientationType, 
    private offset: number,
    buttonW: number
  ) {
    super(display, orient);
    this.displayDeflexion = (this.getRect().width - buttonW) / 2;
    this.transform(this.displayDeflexion);
  }

  moveDisplay(
    relativeBtnPos: number,
    trackW: number,
    maxExtreme: number,
    minExtreme: number
  ): void {
    const relDisplayDeflexion = this.displayDeflexion * 2 / trackW;
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
    max: number,
    valueOfDivision: number,
    step: number
  ): void {
    const value = Math.min(
      Math.round(relativeBtnPos * valueOfDivision) * step + min,
      max
    ).toFixed(this.defineDecimalPlaces(step));
    this.component.innerHTML = parseFloat(value).toString();
  }

  transform(displayDeflexion: number): void {
    this.component.style.transform = (
      `translate(${this.offset - displayDeflexion}px, 0px)`
    );
  }
}

