export function last<T>(list: T[]): T;
export function last(list: string): string;
export function last(list: any) {
  return list[list.length - 1];
}

export function head<T>(list: T[]): T;
export function head(list: string): string;
export function head(list: any) {
  return list[0];
}

export function tail<T>(list: T[]): T[];
export function tail(list: string): string;
export function tail(list: any) {
  return list.slice(1);
}
