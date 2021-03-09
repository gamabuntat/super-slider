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
    this.displayDeflexion = (this.getRect()[this.orient.size] - buttonW) / 2;
    this.component.style.transform = (
      `translate${this.orient.coord.toUpperCase()}(
        ${(this.offset - this.displayDeflexion) 
        * (this.orient.isVertical ? -1 : 1)}px
      )`
    );
  }

  moveDisplay(
    relativeBtnPos: number,
    trackSize: number,
    maxExtreme: number,
    minExtreme: number
  ): void {
    const relDisplayDeflexion = this.displayDeflexion * 2 / trackSize;
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
    this.component.style[this.orient.styleCoord] = `${position * 100}%`;
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
}

