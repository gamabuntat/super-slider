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

  subscribe(preID: string, cb: ResponseHandler): string {
    const id = preID || this.generateID();
    this.on(`sub${id}`, cb);
    return id;
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

  add(preID: string, o: Options): { model: Model; isNew: boolean } {
    const id = preID || this.generateID();
    const prevLength = this.models.length;
    this.selectedModel = this.models[this.findModelIndex(id)] || {
      ...defaultOptions,
      id,
    };
    this.selectedModel.cancel = false;
    this.selectedModel = this.getValidatedOptions(o);
    this.addModel(this.selectedModel);
    this.emit({ ...this.selectedModel });
    this.emit({ ...this.selectedModel }, `sub${this.selectedModel.id}`);
    return {
      model: { ...this.selectedModel },
      isNew: prevLength !== this.models.length,
    };
  }

  private addModel(model: Model): void {
    this.models.splice(
      this.findModelIndex(model.id),
      Number(this.selectedIndex !== -1),
      model
    );
  }

  private findModelIndex(id: string): number {
    this.selectedIndex = this.models.findIndex((m) => m.id === id);
    return this.selectedIndex;
  }

  private generateID(): string {
    return String(Math.floor(Math.random() * Date.now()));
  }

  private getValidatedOptions(o: Options): Model {
    const copy = { ...this.selectedModel, ...o };
    if (copy.min >= copy.max || copy.step <= 0) {
      return { ...this.selectedModel, cancel: true };
    }
    copy.step = this.validetaStep(copy);
    this.setDecimalPlaces(copy);
    copy.from = this.validateFrom(copy);
    copy.to = this.validateTo(copy);
    return copy;
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
