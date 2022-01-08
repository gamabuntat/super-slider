export function last<T>(list: T[]): T;
export function last(list: string): string;
export function last(list: any) {
  return list[list.length - 1];
}

export function tail<T>(list: T[]): T[];
export function tail(list: string): string;
export function tail(list: any) {
  return list.slice(1);
}

export function init<T>(list: T[]): T[];
export function init(list: string): string;
export function init(list: any) {
  return list.slice(0, -1);
}
