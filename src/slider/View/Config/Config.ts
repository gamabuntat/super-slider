import numberDecimalPlaces from 'slider/helpers/numberDecimalPlaces';
import IResponse from 'slider/interfaces/IResponse';
import { IConfig, typeExtremums } from './IConfig';

abstract class Config {
  protected n!: number
  protected diff!: number
  protected divisionNumber!: number
  protected fakeDiff!: number
  protected positions!: number[]
  protected extremums!: typeExtremums

  constructor(protected response: IResponse) {
    this.update(response);
  }

  update({ min, max, step, from, to }: IResponse = this.response): void {
    this.n = numberDecimalPlaces(step);
    this.diff = +(max - min).toFixed(this.n);
    this.divisionNumber = Math.ceil(this.diff / step);
    this.fakeDiff = +(this.divisionNumber * step).toFixed(this.n);
    this.positions = this.calcPositions();
    console.log(this.positions);
    this.extremums = this.calcExtremums();
    console.log(this.extremums);
  }

  getResponse(): IResponse {
    return { ...this.response };
  }

  getPositions(): number[] {
    return [...this.positions];
  }

  getOrientation(): boolean {
    return this.response.isVertical;
  }

  getExtremums(): typeExtremums {
    return [{ ...this.extremums[0] }, { ...this.extremums[1] }];
  }

  setPositions(positions: number[]): void {
    this.positions = positions.map(this.sampling, this);
    this.updateExtremums();
    console.log(this.extremums);
    this.updateResponse();
  }

  protected sampling(p: number): number {
    return 1 / this.divisionNumber * Math.round(p * this.divisionNumber);
  }

  private updateResponse(): void {
    this.response.from = this.calcAbsolutePosition(this.positions[0]);
    this.response.to = this.calcAbsolutePosition(this.positions[1]);
    console.log(this.response.from);
    console.log(this.response.to);
  }

  abstract swap(): void

  abstract calcAbsolutePosition(p: number): number

  protected abstract updateExtremums(): void

  protected abstract calcPositions(): number[]

  protected abstract calcExtremums(): typeExtremums
}

class HorizontalConfig extends Config implements IConfig {
  swap(): IConfig {
    return new VerticalConfig(this.response);
  }

  calcAbsolutePosition(p: number): number {
    return Math.min(
      +(this.sampling(p) * this.fakeDiff + this.response.min)
        .toFixed(this.n),
      this.response.max
    );
  }

  protected updateExtremums(): void {
    this.extremums[0].max = this.positions[1];
    this.extremums[1].min = this.positions[0];
  }

  protected calcPositions(): number[] {
    return [
      this.sampling((this.response.from - this.response.min) / this.fakeDiff),
      this.sampling((this.response.to - this.response.min) / this.fakeDiff)
    ];
  }

  protected calcExtremums(): typeExtremums {
    return [
      { min: 0, max: this.positions[1] }, { min: this.positions[0], max: 1 }
    ];
  }
}

class VerticalConfig extends Config implements IConfig {
  swap(): IConfig {
    return new HorizontalConfig(this.response);
  }

  calcAbsolutePosition(p: number): number {
    return Math.min(
      +((1 - this.sampling(p)) * this.fakeDiff + this.response.min)
        .toFixed(this.n),
      this.response.max
    );
  }

  protected updateExtremums(): void {
    this.extremums[0].min = this.positions[1];
    this.extremums[1].max = this.positions[0];
  }

  protected calcPositions(): number[] {
    return [
      this.sampling(1 - (this.response.from - this.response.min) 
        / this.diff),
      this.sampling(1 - (this.response.to - this.response.min) 
        / this.diff)
    ];
  }

  protected calcExtremums(): typeExtremums {
    return [
      { min: this.positions[1], max: 1 }, { min: 0, max: this.positions[0] }
    ];
  }
}

export { HorizontalConfig, VerticalConfig };

