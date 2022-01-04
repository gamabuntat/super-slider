import { sampling, toRelative, toAbsolute } from 'helpers/calc';
import type { Absolute, Relative } from 'helpers/calc';
import { last } from 'helpers/handyKit';

import Config from './Config';
import type { IConfig, AllPositions, Extremums } from './IConfig';

class HorizontalConfig extends Config implements IConfig {
  getPrev(p: Relative, m = 1): Relative {
    return Math.max(0, sampling(this.relativeStep, p - this.relativeStep * m));
  }

  getNext(p: Relative, m = 1): Relative {
    return Math.min(1, sampling(this.relativeStep, p + this.relativeStep * m));
  }

  getAllPositions(): AllPositions {
    const res: AllPositions = [{ p: this.r.min, idx: 0 }];
    while (last(res).p < this.r.max) {
      res.push({
        p: this.calcAbsolutePosition(
          this.getNext(this.calcPosition(last(res).p), this.multiplier)
        ),
        idx: Math.min(last(res).idx + this.multiplier, this.divisionNumber),
      });
    }
    return res;
  }

  calcPosition(ap: Absolute): Relative {
    return ap === this.r.max
      ? 1
      : sampling(
          this.relativeStep,
          toRelative(this.r.min, this.fakeDiff + this.r.min, ap)
        );
  }

  protected calcAbsolutePosition(p: Relative): Absolute {
    return Math.min(
      Number(
        toAbsolute(this.r.min, this.fakeDiff + this.r.min, p).toFixed(this.n)
      ),
      this.r.max
    );
  }

  protected updateExtremums(): void {
    [this.extremums[1].min, this.extremums[0].max] = this.positions;
  }

  protected getExtremums(): Extremums {
    return [
      { min: 0, max: this.positions[1] },
      { min: this.positions[0], max: 1 },
    ];
  }
}

export default HorizontalConfig;
