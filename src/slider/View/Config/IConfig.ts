import IResponse from 'slider/interfaces/IResponse';

type typeExtremums = { min: number, max: number }[]

interface IConfig {
  swap(): IConfig
  update(response: IResponse): void
  calcPosition(ap: number): number
  calcAbsolutePosition(p: number): number
  getResponse(): IResponse
  getExtremums(): typeExtremums
  getPositions(): number[]
  setPositions(p: number[]): void
}

export { IConfig, typeExtremums };

