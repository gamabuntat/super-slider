type Options = {
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  step?: number;
  gap?: number;
  isInterval?: boolean;
  isVertical?: boolean;
  isLabel?: boolean;
  isScale?: boolean;
}

type RequiredOptions = Required<Options>;

type Model = RequiredOptions & {
  id: string;
}

interface JQuery {
  slider(o?: Options): JQuery;
  destroy(): JQuery;
  subscribe(cb: (r: Model) => void): JQuery;
}
