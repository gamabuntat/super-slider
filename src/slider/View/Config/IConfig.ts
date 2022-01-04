type Absolute = number;

type Relative = number;

type Extremums = { min: Relative; max: Relative }[];

type AllPositions = {
  p: Absolute;
  idx: number;
}[];

interface IConfig {
  update(response: Model): void;
  getPrev(p: Relative): Relative;
  getNext(p: Relative): Relative;
  getResponse(): Model;
  getPositions(): Relative[];
  getAllPositions(): AllPositions;
  calcPosition(ap: Absolute): Relative;
  setPositions(p: number[]): void;
}

export type { IConfig, Extremums, Absolute, Relative, AllPositions };
