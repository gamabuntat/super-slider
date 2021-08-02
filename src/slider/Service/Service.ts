import Model from '../Model/Model';

class Service {
  private static instance: Service
  private models: Model[]
  private lastIndex: number
  constructor() {
    this.models = [];
    this.lastIndex = -1;
  }

  static getInstance(): Service {
    if (!Service.instance) { Service.instance = new Service(); }
    return Service.instance; 
  }

  findModelIndex(id: string): number {
    return this.lastIndex = this.models.findIndex((m) => m.id === id);
  }

  addModel(id: string, options: Options): void {
    this.models.splice(
      this.findModelIndex(id),
      this.lastIndex === -1 ? 0 : 1,
      this.createModel(id, options)
    );
  }

  createModel(id: string, options: Options): Model {
    return new Model(id, options);
  }
}

export default Service;

