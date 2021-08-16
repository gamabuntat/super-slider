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

type TypeValidateOptionsKeys = (
  keyof { [K in keyof IValidatedOptions]-?: IValidatedOptions[K] }
);

class Service extends EventEmitter {
  private static instance: Service
  private readonly defaultModel: IResponse = {
    id: '',
    min: 0,
    max: 10,
    from: 1,
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
      ...this.getValedatedOptions(this.getCorrectKeyOrder(o), o),
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

  private getCorrectKeyOrder(
    { min, max, from, to }: IOptions
  ): (TypeValidateOptionsKeys)[] {
    const extremumsKeys: (TypeValidateOptionsKeys)[] = ['min', 'max'];
    const positionsKeys: (TypeValidateOptionsKeys)[] = ['from', 'to'];
    const step: TypeValidateOptionsKeys = 'step';
    return [
      ...(
        typeof min != 'number' && typeof max == 'number' 
          ? extremumsKeys.reverse() : extremumsKeys
      ),
      step,
      ...(
        typeof from != 'number' && typeof to == 'number'
          ? positionsKeys.reverse() : positionsKeys
      )
    ];
  }

  private getValedatedOptions(
    keys: (TypeValidateOptionsKeys)[],
    o: IOptions
  ): IOptions {
    const copy = { ...o };
    const isInterval = copy.isInterval ?? this.selectedModel.isInterval;
    if (isInterval === false) { copy.to = copy.max || this.selectedModel.max; }
    keys.forEach((k) => copy[k] = this.validateConcreteOption(k, copy));
    return copy;
  }

  private validateConcreteOption<K extends keyof IValidatedOptions>(
    key: K, o: IOptions,
  ): number {
    const max = o.max ?? this.selectedModel.max;
    const min = o.min ?? this.selectedModel.min;
    const step = o.step || this.selectedModel.step;
    const from = o.from ?? this.selectedModel.from;
    const to = Math.min(o.to ?? this.selectedModel.to, max);
    const n = numberDecimalPlaces(step);
    return {
      min: () => +min.toFixed(n),
      max: () => +Math.max(max, min).toFixed(n),
      step: () => Math.min(
        Math.abs(step), +(max - min).toFixed(n)
      ),
      from: () => (Math.min(
        max, +(Math.ceil((Math.max(min, from) - min) / step) 
          * step + min).toFixed(n)
      )),
      to: () => (Math.min(
        max, +(Math.ceil((clamp(Math.max(from, min), to, max) - min) / step)
          * step + min).toFixed(n)
      ))
    }[key]();
  }
}

export default Service;

