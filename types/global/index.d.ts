declare module '*.sass' {
  const content: Record<string, string>;
  export = content;
}

type Options = {
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  step?: number;
  isInterval?: boolean;
  isVertical?: boolean;
  isLabel?: boolean;
  isScale?: boolean;
};

type RequiredOptions = Required<Options>;

type Model = RequiredOptions & {
  id: string;
  cancel?: boolean;
};

type SelectKeysByType<T> = {
  [K in keyof RequiredOptions]: RequiredOptions[K] extends T ? K : never;
}[keyof RequiredOptions];

type NumericalKeys = SelectKeysByType<number>;

type BooleanKeys = SelectKeysByType<boolean>;

interface JQuery {
  slider(o?: Options): JQuery;
  destroy(): JQuery;
  subscribe(cb: (r: Model) => void): JQuery;
}
