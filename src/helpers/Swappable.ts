interface ISwappable<T> {
  swap(): ISwappable<T>
  get(): T
}

class Swappable<T> implements ISwappable<T> {
  constructor(private left: T, private right: T) {}

  swap(): ISwappable<T> {
    const temp = this.left;
    this.left = this.right;
    this.right = temp;
    return this;
  }

  get(): T {
    return this.left;
  }
}

export default Swappable;

export type { ISwappable };
