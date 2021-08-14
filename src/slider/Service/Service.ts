import IModel from 'slider/Model/IModel';
import EventEmitter from 'slider/EventEmitter/EventEmitter';

class Service extends EventEmitter {
  private static instance: Service
  private modelDefaultOptions: TypeRequiredOptions = {
    min: 0,
    max: 10,
    from: 0,
    to: 10,
    step: 1,
    isInterval: false,
    isVertical: false,
    isLabel: true,
    isScale: true,
  }
  private models: IModel[] = []
  private lastIndex = -1

  static getInstance(): Service {
    if (!Service.instance) { Service.instance = new Service(); }
    return Service.instance; 
  }

  sendResponse(id: string): void {
    this.findModelIndex(id);
    if (this.lastIndex == -1) { return; }
    this.emit({ ...this.models[this.lastIndex] });
  }

  updateModel(response: IModel): void {
    this.addModel({ ...response });
  }

  add(id = this.generateID(), o: IOptions): IModel {
    const model: IModel = { ...this.modelDefaultOptions, ...o, id };
    this.addModel(model);
    return { ...model };
  }

  private generateID(): string {
    return String(Math.floor(Math.random() * Date.now()));
  }

  private addModel(model: IModel): void {
    this.models.splice(
      this.findModelIndex(model.id),
      +(this.lastIndex !== -1),
      model
    );
  }

  private findModelIndex(id: string): number {
    return this.lastIndex = this.models.findIndex((m) => m.id === id);
  }
}

export default Service;

