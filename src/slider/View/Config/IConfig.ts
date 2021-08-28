type typeExtremums = { min: number, max: number }[]

interface IConfig {
  update(response: IResponse): void
  getPrev(p: number): number
  getNext(p: number): number
  swap(): IConfig
  calcPosition(ap: number): number
  calcAbsolutePosition(p: number): number
  getResponse(): IResponse
  getExtremums(): typeExtremums
  getPositions(): number[]
  setPositions(p: number[]): void
}

export { IConfig, typeExtremums };

