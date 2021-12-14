import clamp from 'helpers/clamp';
import numberDecimalPlaces from 'helpers/numberDecimalPlaces';
import getLastItem from 'helpers/getLastItem';

import type {
  IConfig,
  TypeExtremums,
  AllPositions,
  Absolute,
  Relative,
} from './IConfig';

abstract class Config {
  private static max = 100;
  protected n!: number;
  protected divisionNumber!: number;
  protected multiplier!: number;
  protected relativeStep!: Relative;
  protected fakeDiff!: Absolute;
  protected positions!: Relative[];
  protected extremums!: TypeExtremums;

  constructor(protected response: ModelResponse) {
    this.update(response);
  }

  update(response: ModelResponse = this.response): void {
    this.response = response;
    const { step, from, to } = response;
    this.n = numberDecimalPlaces(step);
    this.divisionNumber = this.getDivisionNumber();
    const maxSize = Math.min(this.divisionNumber + 1, Config.max);
    this.multiplier = Math.ceil((this.divisionNumber + 1) / maxSize);
    this.relativeStep = 1 / this.divisionNumber;
    this.fakeDiff = Number((this.divisionNumber * step).toFixed(this.n));
    this.positions = [from, to].map(this.calcPosition, this);
    this.extremums = this.getExtremums();
  }

  getResponse(): ModelResponse {
    return { ...this.response };
  }

  getPositions(): number[] {
    return [...this.positions];
  }

  setPositions(positions: number[]): void {
    this.positions = positions.map(this.validate, this);
    this.updateExtremums();
    this.updateResponse();
  }

  protected sampling(p: Relative): Relative {
    return (1 / this.divisionNumber) * Math.round(p * this.divisionNumber);
  }

  private getDivisionNumber(): number {
    const { min, max } = this.response;
    return Math.ceil(
      Number(
        (max - min).toFixed(Math.max(...[min, max].map(numberDecimalPlaces)))
      ) / this.response.step
    );
  }

  private validate(p: number, idx: number): number {
    return clamp(
      this.extremums[idx].min,
      this.sampling(p),
      this.extremums[idx].max
    );
  }

  private updateResponse(): void {
    [this.response.from, this.response.to] = this.positions.map(
      this.calcAbsolutePosition,
      this
    );
  }

  abstract swap(): void;

  abstract getPrev(p: Relative): Relative;

  abstract getNext(p: Relative): Relative;

  abstract getAllPositions(): AllPositions;

  abstract calcPosition(ap: Absolute): Relative;

  protected abstract calcAbsolutePosition(p: number): number;

  protected abstract updateExtremums(): void;

  protected abstract getExtremums(): TypeExtremums;
}

class HorizontalConfig extends Config implements IConfig {
  swap(): IConfig {
    return new VerticalConfig(this.response);
  }

  getPrev(p: Relative, m = 1): Relative {
    return Math.max(0, this.sampling(p) - this.relativeStep * m);
  }

  getNext(p: Relative, m = 1): Relative {
    return Math.min(1, this.sampling(p) + this.relativeStep * m);
  }

  getAllPositions(
    prev = 0,
    res: AllPositions = [{ p: this.response.min, idx: 0 }]
  ): AllPositions {
    if (getLastItem(res).p === this.response.max) {
      return res;
    }
    const next = this.getNext(prev, this.multiplier);
    return this.getAllPositions(next, [
      ...res,
      {
        p: this.calcAbsolutePosition(next),
        idx: Math.min(
          getLastItem(res).idx + this.multiplier,
          this.divisionNumber
        ),
      },
    ]);
  }

  calcPosition(ap: Absolute): Relative {
    return clamp(
      0,
      this.sampling(
        (Math.round(
          (ap === this.response.max ? this.fakeDiff : ap - this.response.min) /
            this.response.step
        ) *
          this.response.step) /
          this.fakeDiff
      ),
      1
    );
  }

  protected calcAbsolutePosition(p: Relative): Absolute {
    return Math.min(
      Number(
        (this.sampling(p) * this.fakeDiff + this.response.min).toFixed(this.n)
      ),
      this.response.max
    );
  }

  protected updateExtremums(): void {
    this.extremums[0].max = this.positions[1] - this.relativeStep;
    this.extremums[1].min = this.positions[0] + this.relativeStep;
  }

  protected getExtremums(): TypeExtremums {
    return [
      { min: 0, max: this.positions[1] - this.relativeStep },
      { min: this.positions[0] + this.relativeStep, max: 1 },
    ];
  }
}

class VerticalConfig extends Config implements IConfig {
  swap(): IConfig {
    return new HorizontalConfig(this.response);
  }

  getPrev(p: Relative, m = 1): Relative {
    return Math.min(1, this.sampling(p) + this.relativeStep * m);
  }

  getNext(p: Relative, m = 1): Relative {
    return Math.max(0, this.sampling(p) - this.relativeStep * m);
  }

  getAllPositions(
    prev = 1,
    res: AllPositions = [{ p: this.response.min, idx: 0 }]
  ): AllPositions {
    if (getLastItem(res).p === this.response.max) {
      return res;
    }
    const next = this.getNext(prev, this.multiplier);
    return this.getAllPositions(next, [
      ...res,
      {
        p: this.calcAbsolutePosition(next),
        idx: Math.min(
          getLastItem(res).idx + this.multiplier,
          this.divisionNumber
        ),
      },
    ]);
  }

  calcPosition(ap: Absolute): Relative {
    return clamp(
      0,
      this.sampling(
        1 -
          (Math.round(
            (ap === this.response.max
              ? this.fakeDiff
              : ap - this.response.min) / this.response.step
          ) *
            this.response.step) /
            this.fakeDiff
      ),
      1
    );
  }

  protected calcAbsolutePosition(p: Relative): Absolute {
    return Math.min(
      Number(
        ((1 - this.sampling(p)) * this.fakeDiff + this.response.min).toFixed(
          this.n
        )
      ),
      this.response.max
    );
  }

  protected updateExtremums(): void {
    this.extremums[0].min = this.positions[1] + this.relativeStep;
    this.extremums[1].max = this.positions[0] - this.relativeStep;
  }

  protected getExtremums(): TypeExtremums {
    return [
      { min: this.positions[1] + this.relativeStep, max: 1 },
      { min: 0, max: this.positions[0] - this.relativeStep },
    ];
  }
}

export { HorizontalConfig, VerticalConfig };
