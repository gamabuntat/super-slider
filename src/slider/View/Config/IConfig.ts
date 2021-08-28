type typeExtremums = { min: number, max: number }[]

interface IConfig {
  update(response: IResponse): void
  getPrev(p: number): number
  getNext(p: number): number
  swap(): IConfig
  getResponse(): IResponse
  getPositions(): number[]
  getAllPositions(): number[]
  setPositions(p: number[]): void
}

export { IConfig, typeExtremums };

