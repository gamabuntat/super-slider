interface JQuery {
  slider(): JQuery<HTMLElement>
}

interface JQuery<HTMLElement> {
  hi(): JQuery<HTMLElement>
}

interface IOptions {
  min?: number
  max?: number
  from?: number
  to?: number
  step?: number
  interval?: boolean
  vertical?: boolean
  isLabel?: boolean
  isScale?: boolean
}

type TypeRequiredOptions = {
  [K in keyof IOptions]-?: IOptions[K]
}

