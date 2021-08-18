import numberDecimalPlaces from 'slider/helpers/numberDecimalPlaces';
import IResponse from 'slider/interfaces/IResponse';
import IConfig from './IConfig';

class Config implements IConfig {
  private diff!: number
  private divisionNumber!: number
  private fakeMax!: number
  private positions!: number[]
  private extremums!: { min: number, max: number }[]

  constructor(private response: IResponse) {
    this.update(response);
  }

  update({ min, max, step, from, to }: IResponse = this.response): void {
    const n = numberDecimalPlaces(step);
    this.diff = +(max - min).toFixed(n);
    this.divisionNumber = Math.ceil(this.diff / step);
    this.fakeMax = +(this.divisionNumber * step + min).toFixed(n);
    this.positions = [(from - min) / this.diff, (to - min) / this.diff];
    this.extremums = [
      { min: 0, max: this.positions[1] }, { min: this.positions[0], max: 1 }
    ];
  }

  getPositions(): number[] {
    return [...this.positions];
  }

  setPositions(positions: number[]): void {
    this.positions = positions;
    this.updateExtremums();
  }

  private updateExtremums(): void {
    this.extremums[0].max = this.positions[1];
    this.extremums[1].min = this.positions[0];
  }
}

export default Config;

