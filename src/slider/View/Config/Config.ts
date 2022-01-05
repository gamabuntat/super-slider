import { clamp, sampling, decimalPlaces } from 'helpers/calc';

import type { Absolute, Relative, Extremums, AllPositions } from './IConfig';

abstract class Config {
  private static max = 100;
  protected n!: number;
  protected divisionNumber!: number;
  protected multiplier!: number;
  protected relativeStep!: Relative;
  protected fakeDiff!: Absolute;
  protected positions!: Relative[];
  protected extremums!: Extremums;

  constructor(protected r: Model) {
    this.update(r);
  }

  update(r: Model = this.r): void {
    this.r = r;
    this.n = Math.max(...[this.r.min, this.r.step].map(decimalPlaces));
    this.divisionNumber = this.getDivisionNumber();
    const maxSize = Math.min(this.divisionNumber + 1, Config.max);
    this.multiplier = Math.ceil((this.divisionNumber + 1) / maxSize);
    this.relativeStep = 1 / this.divisionNumber;
    this.fakeDiff = this.divisionNumber * this.r.step;
    this.positions = [
      this.r.from,
      this.r.isInterval ? this.r.to : this.r.max,
    ].map(this.calcPosition, this);
    this.extremums = this.getExtremums();
  }

  getResponse(): Model {
    return { ...this.r };
  }

  getPositions(): number[] {
    return [...this.positions];
  }

  setPositions(positions: number[]): void {
    this.positions = positions.map(this.validate, this);
    this.updateExtremums();
    this.updateResponse();
  }

  private getDivisionNumber(): number {
    return Math.ceil(
      Number(
        (this.r.max - this.r.min).toFixed(
          Math.max(...[this.r.min, this.r.max].map(decimalPlaces))
        )
      ) / this.r.step
    );
  }

  private validate(p: number, idx: number): number {
    return clamp(
      this.extremums[idx].min,
      p === 1 || this.positions.includes(p)
        ? p
        : sampling(this.relativeStep, p),
      this.extremums[idx].max
    );
  }

  private updateResponse(): void {
    [this.r.from, this.r.to] = this.positions.map(
      this.calcAbsolutePosition,
      this
    );
  }

  abstract getPrev(p: Relative): Relative;

  abstract getNext(p: Relative): Relative;

  abstract getAllPositions(): AllPositions;

  abstract calcPosition(ap: Absolute): Relative;

  protected abstract calcAbsolutePosition(p: number): number;

  protected abstract updateExtremums(): void;

  protected abstract getExtremums(): Extremums;
}

export default Config;
