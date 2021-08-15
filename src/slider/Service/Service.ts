import EventEmitter from 'slider/EventEmitter/EventEmitter';
import IResponse from 'slider/helpers/IResponse';
import { clamp } from 'slider/helpers/clamp';

interface IValidatedOptions {
  min?: number
  max?: number
  from?: number
  to?: number
}

type TypeValidateOptionsKeys = (
  keyof { [K in keyof IValidatedOptions]-?: IValidatedOptions[K] }
)[];

class Service extends EventEmitter {
  private static instance: Service
  private readonly defaultModel: IResponse = {
    id: '',
    min: 0,
    max: 10,
    from: 8,
    to: 10,
    step: 1,
    isInterval: false,
    isVertical: false,
    isLabel: true,
    isScale: true,
  }
  private selectedModel: IResponse = this.defaultModel
  private models: IResponse[] = []
  private selectedIndex = -1

  static getInstance(): Service {
    if (!Service.instance) { Service.instance = new Service(); }
    return Service.instance; 
  }

  updateModel(response: IResponse): void {
    this.addModel({ ...response });
  }

  add(id = this.generateID(), o: IOptions): IResponse {
    const model: IResponse = { 
      ...this.selectedModel = (
        this.models[this.findModelIndex(id)] || { ...this.defaultModel, id }
      ),
      ...this.getValedatedOptions(o),
    };
    this.addModel(model);
    const copy = { ...model };
    this.emit(copy);
    return copy;
  }

  private addModel(model: IResponse): void {
    this.models.splice(
      this.findModelIndex(model.id),
      +(this.selectedIndex !== -1),
      model
    );
  }

  private findModelIndex(id: string): number {
    return this.selectedIndex = this.models.findIndex((m) => m.id === id);
  }

  private generateID(): string {
    return String(Math.floor(Math.random() * Date.now()));
  }

  private getValedatedOptions(o: IOptions): IOptions {
    const copy = { ...o };
    const extremums: TypeValidateOptionsKeys = ['min', 'max'];
    const positions: TypeValidateOptionsKeys = ['from', 'to'];
    [
      ...(!copy.min && copy.max ? extremums.reverse() : extremums),
      ...(!copy.from && copy.to ? positions.reverse() : positions)
    ].forEach((k) => {
      const v = copy[k] || this.selectedModel[k];
      copy[k] = this.validateConcreteOption(k, v, copy);
    });
    return copy;
  }

  private validateConcreteOption<K extends keyof IValidatedOptions>(
    key: K,
    v: number,
    o: IOptions,
    max = o.max ?? this.selectedModel.max,
    min = o.min ?? this.selectedModel.min
  ): number {
    return {
      min: (v: number) => Math.min(v, max),
      max: (v: number) => Math.max(v, min),
      from: (v: number) => clamp(min, v, Math.min(
        o.to ?? this.selectedModel.to, max
      )),
      to: (v: number) => clamp(Math.max(
        o.from ?? this.selectedModel.from, min
      ), v, max)
    }[key](v);
  }
}

export default Service;

