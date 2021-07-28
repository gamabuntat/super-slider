interface IView {
  a: number
  ping(a: number): void
}

class View implements IView {
  a: number
  name: string
  constructor() {
    this.name = 'hihe';
    this.a = 42;
  }

  log(s: string): void {
    console.log(s);
  }

  ping(a: number): void {
    console.log(`${a}ms`);
  }
}

export default View;

