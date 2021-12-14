type Absolute = number;

type Relative = number;

type TypeExtremums = { min: Relative; max: Relative }[];

type AllPositions = {
  p: Absolute;
  idx: number;
}[];

interface IConfig {
  update(response: Model): void;
  getPrev(p: Relative): Relative;
  getNext(p: Relative): Relative;
  swap(): IConfig;
  getResponse(): Model;
  getPositions(): Relative[];
  getAllPositions(): AllPositions;
  calcPosition(ap: Absolute): Relative;
  setPositions(p: number[]): void;
}

export type { IConfig, TypeExtremums, Absolute, Relative, AllPositions };
