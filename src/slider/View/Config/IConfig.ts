type typeExtremums = { min: number, max: number }[]

interface IAllPositions {
  positions: number[]
  absolutePositions: number[]
}

interface IConfig {
  update(response: IResponse): void
  getPrev(p: number): number
  getNext(p: number): number
  swap(): IConfig
  getResponse(): IResponse
  getPositions(): number[]
  getAllPositions(): IAllPositions
  setPositions(p: number[]): void
}

export { IConfig, typeExtremums, IAllPositions };

