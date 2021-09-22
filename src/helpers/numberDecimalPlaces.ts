function numberDecimalPlaces(n: number): number {
  if (Math.abs(n) - Math.abs(Math.trunc(n)) == 0) { return 0; }
  const ns = String(n);
  const lastDigits = (ns.match(/\d+$/) || [])[0];
  return ns.includes('e') ? +lastDigits : +lastDigits.length;
}

export default numberDecimalPlaces;

