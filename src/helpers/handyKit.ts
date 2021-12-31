export function last<T>(list: T[]): T;
export function last(list: string): string;
export function last(list: any) {
  return list[list.length - 1];
}
