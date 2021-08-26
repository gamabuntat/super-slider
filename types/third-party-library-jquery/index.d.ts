interface IOptions {
  min?: number
  max?: number
  from?: number
  to?: number
  step?: number
  isInterval?: boolean
  isVertical?: boolean
  isLabel?: boolean
  isScale?: boolean
}

type TypeRequiredOptions = {
  [K in keyof IOptions]-?: IOptions[K]
}

interface IResponse extends TypeRequiredOptions {
  id: string
}

interface JQuery {
  slider(o?: IOptions): JQuery
  destroy(): JQuery
  subscribe(cb: (r: IResponse) => void): void
}

