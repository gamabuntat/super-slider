import EventEmitter from 'slider/EventEmitter/EventEmitter';
import IResponse from 'slider/helpers/IResponse';
import clamp from 'slider/helpers/clamp';
import numberDecimalPlaces from 'slider/helpers/numberDecimalPlaces';

interface IValidatedOptions {
  min?: number
  max?: number
  from?: number
  to?: number
  step?: number
}

type TypeValidateOptionsKeys = keyof {
  [K in keyof IValidatedOptions]-?: IValidatedOptions[K] 
};

class Service extends EventEmitter {
  private static instance: Service
  private readonly defaultOptions: TypeRequiredOptions = {
    min: 0,
    max: 10,
    from: -Infinity,
    to: Infinity,
    step: 1,
    isInterval: false,
    isVertical: false,
    isLabel: true,
    isScale: true,
  }
  private selectedModel: IResponse = { ...this.defaultOptions, id: '' }
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
        this.models[this.findModelIndex(id)] || { ...this.defaultOptions, id }
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
    const keys: (TypeValidateOptionsKeys)[] = [
      'step', 'min', 'max', 'from', 'to'
    ];
    keys.forEach((k) => copy[k] = this.validateConcreteOption(k, copy));
    const isInterval = o.isInterval ?? this.selectedModel.isInterval;
    if (isInterval === false) { copy.to = copy.max || this.selectedModel.max; }
    return copy;
  }

  private validateConcreteOption<K extends keyof IValidatedOptions> (
    key: K, o: IOptions
  ): number {
    const max = o.max ?? this.selectedModel.max;
    const min = o.min ?? this.selectedModel.min;
    const step = o.step || this.selectedModel.step;
    const from = o.from ?? this.selectedModel.from;
    const to = Math.min(o.to ?? this.selectedModel.to, max);
    const n = numberDecimalPlaces(step);
    return {
      step: () => Math.abs(step),
      min: () => +min.toFixed(n),
      max: () => +Math.max(max, min + step).toFixed(n),
      from: () => (Math.min(
        max, +(Math.ceil((Math.max(min, from) - min) / step) 
          * step + min).toFixed(n)
      )),
      to: () => (Math.min(
        max, +(Math.ceil((clamp(from, to, max) - min) / step)
          * step + min).toFixed(n)
      )),
    }[key]();
  }
}

export default Service;

