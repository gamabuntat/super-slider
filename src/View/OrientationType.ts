export default class OrientationType {
  public coord: 'y' | 'x'
  public styleCoord: 'bottom' | 'left'
  public size: 'height' | 'width'
  constructor(public isVertical: boolean) {
    this.coord = isVertical ? 'y' : 'x';
    this.styleCoord = isVertical ? 'bottom' : 'left';
    this.size = isVertical ? 'height' : 'width';
  }
}
