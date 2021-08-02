class Model {
  max: number
  constructor(public id: string, { max = 100 }: Options) {
    this.max = max;
  }
}

export default Model;

