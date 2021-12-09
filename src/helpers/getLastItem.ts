interface IL<T> {
  length: number;
  [k: number]: T;
}

const getLastItem = <T extends IL<T[0]>>(l: T): T[0] => l[l.length - 1];

export default getLastItem;
