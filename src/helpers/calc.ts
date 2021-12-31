export const decimalPlaces = (n: number) => {
  if (Math.abs(n) - Math.abs(Math.trunc(n)) === 0) {
    return 0;
  }
  const ns = String(n);
  const lastDigits = (ns.match(/\d+$/) || [])[0];
  return ns.includes('e') ? Number(lastDigits) : lastDigits.length;
};

export const clamp = (min: number, v: number, max: number) =>
  Math.max(min, Math.min(max, v));

export const sampling = (step: number, v: number) =>
  Math.round(v / step) * step;

export type Relative = number;

export type Absolute = number;

export const toRelative = (
  min: Absolute,
  max: Absolute,
  v: Absolute
): Relative => clamp(0, (v - min) / (max - min), 1);

export const toAbsolute = (
  min: Absolute,
  max: Absolute,
  v: Relative
): Absolute => clamp(min, v * (max - min) + min, max);
