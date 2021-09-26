import { 
  EventEmitter, TypeResponseHandler 
} from 'slider/EventEmitter/EventEmitter';
import clamp from 'helpers/clamp';
import numberDecimalPlaces from 'helpers/numberDecimalPlaces';
import { 
  IService, IValidatedOptions, TypeValidateOptionsKeys 
} from './IService';

import defaultOptions from './defaultOptions';

class Service extends EventEmitter implements IService {
  private static instance: Service
  private readonly defaultOptions: TypeRequiredOptions = defaultOptions 
  private selectedModel: IResponse = { ...this.defaultOptions, id: '' }
  private models: IResponse[] = []
  private selectedIndex = -1
  private validatedKeys:(TypeValidateOptionsKeys)[] = [
    'step', 'min', 'max', 'from', 'to'
  ]

  static getInstance(): Service {
    if (!Service.instance) { Service.instance = new Service(); }
    return Service.instance; 
  }

  subscribe(preID: string, cb: TypeResponseHandler): string {
    const id = preID || this.generateID();
    this.on('sub' + id, cb);
    return id;
  }

  removeModel(id: string): void {
    this.events[id] = [];
    this.events['sub' + id] = [];
    this.models.splice(this.findModelIndex(id), +(this.selectedIndex !== -1));
  }

  updateModel(response: IResponse): void {
    this.addModel({ ...response });
    this.emit({ ...response }, 'sub' + response.id);
  }

  add(preID: string, o: IOptions): { model: IResponse, isNew: boolean } {
    const id = preID || this.generateID();
    const prevLength = this.models.length;
    this.selectedModel = { 
      ...this.selectedModel = (
        this.models[this.findModelIndex(id)] || { ...this.defaultOptions, id }
      ),
      ...this.getValidatedOptions(o),
    };
    this.addModel(this.selectedModel);
    this.emit({ ...this.selectedModel });
    this.emit({ ...this.selectedModel }, 'sub' + this.selectedModel.id);
    return {
      model: { ...this.selectedModel },
      isNew: prevLength !== this.models.length
    };
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

  private getValidatedOptions(o: IOptions): IOptions {
    const copy = { ...o };
    this.validatedKeys.forEach((k) => (
      copy[k] = this.validateConcreteOption(k, copy))
    );
    const isInterval = o.isInterval ?? this.selectedModel.isInterval;
    if (isInterval === false) { copy.to = copy.max; }
    return copy;
  }

  private validateConcreteOption<K extends keyof IValidatedOptions> (
    key: K, o: IOptions
  ): number {
    const [step, min, max, from, to] = [
      o.step || this.selectedModel.step, o.min, o.max, o.from, o.to
    ].map(this.preValidate, this);
    const n = numberDecimalPlaces(step);
    return {
      step: () => Math.abs(step),
      min: () => Number(min.toFixed(n)),
      max: () => Math.max(max, min + step),
      from: () => (
        Math.min(
          max,
          +(Math.ceil((Math.max(min, from) - min) / step) 
            * step + min).toFixed(n)
        )
      ),
      to: () => (
        Math.min(
          max,
          +(Math.ceil((clamp(from, to, max) - min) / step)
            * step + min).toFixed(n)
        )
      ),
    }[key]();
  }

  // eslint-disable-next-line
  private preValidate(v: any, idx: number): number {
    if (typeof v == 'number' && isFinite(v)) { return v; }
    return this.selectedModel[this.validatedKeys[idx]];
  }
}

export default Service;

