import IResponse from 'slider/interfaces/IResponse';

type typeExtremums = { min: number, max: number }[]

interface IConfig {
  swap(): IConfig
  update(response: IResponse): void
  calcAbsolutePosition(p: number): number
  getResponse(): IResponse
  getOrientation(): boolean
  getExtremums(): typeExtremums
  getPositions(): number[]
  setPositions(p: number[]): void
}

export { IConfig, typeExtremums };

