interface IHandlePosition {
  max: number
  min: number
}

interface IResponse {
  id: string
  isVertical: boolean
  isInterval: boolean
  positions: IHandlePosition[]
}

export { IResponse, IHandlePosition };

