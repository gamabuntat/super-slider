function clamp(min: number, v: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export default clamp;

