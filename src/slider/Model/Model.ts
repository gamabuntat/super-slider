interface IHandleModel {
  max: number
  min: number
  offlet: number
}

class Model {
  handleModels: IHandleModel[]
  constructor(public id: string, { max = 100 }: Options) {
    this.handleModels = [
      {
        max,
        min: 0,
        offlet: 1
      },
    ];
  }
}

export default Model;

