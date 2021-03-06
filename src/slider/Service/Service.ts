import defaultOptions from 'slider/defaultOptions';
import EventEmitter, {
  ResponseHandler,
} from 'slider/EventEmitter/EventEmitter';
import { clamp, decimalPlaces, sampling } from 'helpers/calc';

import IService from './IService';

class Service extends EventEmitter implements IService {
  private static instance: Service;
  private selectedModel: Model = { ...defaultOptions, id: '' };
  private models: Model[] = [];
  private selectedIndex = -1;
  private decimalPlaces = 0;

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  subscribe(id: string, cb: ResponseHandler): void {
    this.on(`sub${id}`, cb);
  }

  removeModel(id: string): void {
    this.events[id] = [];
    this.events[`sub${id}`] = [];
    this.models.splice(
      this.findModelIndex(id),
      Number(this.selectedIndex !== -1)
    );
  }

  updateModel(response: Model): void {
    this.addModel({ ...response });
    this.emit({ ...response }, `sub${response.id}`);
  }

  add(id: string, o: Options): void {
    this.selectedModel = this.models[this.findModelIndex(id)] || {
      ...defaultOptions,
      id,
    };
    this.selectedModel.cancel = false;
    this.selectedModel = this.getValidModel({ ...this.selectedModel, ...o });
    this.addModel(this.selectedModel);
    this.emit({ ...this.selectedModel });
    this.emit({ ...this.selectedModel }, `sub${this.selectedModel.id}`);
  }

  findModelIndex(id: string): number {
    this.selectedIndex = this.models.findIndex((m) => m.id === id);
    return this.selectedIndex;
  }

  private addModel(model: Model): void {
    this.models.splice(
      this.findModelIndex(model.id),
      Number(this.selectedIndex !== -1),
      model
    );
  }

  private getValidModel(model: Model): Model {
    if (model.min >= model.max || model.step <= 0) {
      return { ...this.selectedModel, cancel: true };
    }
    model.step = this.validetaStep(model);
    this.setDecimalPlaces(model);
    model.from = this.validateFrom(model);
    model.to = this.validateTo(model);
    return model;
  }

  private setDecimalPlaces({ min, step }: Model): void {
    this.decimalPlaces = Math.max(...[min, step].map(decimalPlaces));
  }

  private validetaStep({ step, min, max }: Model): number {
    return Math.min(
      step,
      Number((max - min).toFixed(Math.max(...[min, max].map(decimalPlaces))))
    );
  }

  private validateFrom({ from, min, max, step, isInterval }: Model): number {
    return from === max
      ? max
      : clamp(
          min,
          Number(
            (sampling(step, from - min) + min).toFixed(this.decimalPlaces)
          ),
          isInterval ? Math.min(this.selectedModel.to, max) : max
        );
  }

  private validateTo({ to, from, min, max, step }: Model): number {
    return to === max
      ? max
      : clamp(
          from,
          Number((sampling(step, to - min) + min).toFixed(this.decimalPlaces)),
          max
        );
  }
}

export default Service;
