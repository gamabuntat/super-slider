import IModel from 'slider/Model/IModel';

class Service {
  private static instance: Service
  private models: IModel[] = []
  private lastIndex = -1

  static getInstance(): Service {
    if (!Service.instance) { Service.instance = new Service(); }
    return Service.instance; 
  }

  updateModel<K extends keyof IModel>(
    id: string,
    field: K,
    value: IModel[K]
  ): void {
    this.models[this.findModelIndex(id)][field] = value;
  }

  addModel(model: IModel): void {
    this.models.splice(
      this.findModelIndex(model.id),
      +(this.lastIndex !== -1),
      model
    );
  }

  findModelIndex(id: string): number {
    return this.lastIndex = this.models.findIndex((m) => m.id === id);
  }

  private createModel(id: string, options: TypeRequiredOptions): IModel {
    return { id, ...options };
  }
}

export default Service;

