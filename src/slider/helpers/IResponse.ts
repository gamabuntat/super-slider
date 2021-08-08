interface IHandlePosition {
  max: number
  min: number
}

interface IResponse {
  isVertical: boolean
  isInterval: boolean
  positions: IHandlePosition[]
}

export {IResponse, IHandlePosition};

