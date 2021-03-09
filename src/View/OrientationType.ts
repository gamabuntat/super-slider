export default class OrientationType {
  public coord: 'y' | 'x'
  public styleCoord: 'top' | 'left'
  public size: 'height' | 'width'
  constructor(isVertical: boolean) {
    this.coord = isVertical ? 'y' : 'x';
    this.styleCoord = isVertical ? 'top' : 'left';
    this.size = isVertical ? 'height' : 'width';
  }
}
