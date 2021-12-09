import defaultOptions from 'slider/defaultOptions';
import {
  EventEmitter,
  TypeResponseHandler,
} from 'slider/EventEmitter/EventEmitter';
import clamp from 'helpers/clamp';
import numberDecimalPlaces from 'helpers/numberDecimalPlaces';

import IService from './IService';

class Service extends EventEmitter implements IService {
  private static instance: Service;
  private readonly defaultOptions: TypeRequiredOptions = defaultOptions;
  private selectedModel: IResponse = { ...this.defaultOptions, id: '' };
  private models: IResponse[] = [];
  private selectedIndex = -1;
  private decimalPlaces = 0;

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  subscribe(preID: string, cb: TypeResponseHandler): string {
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

  updateModel(response: IResponse): void {
    this.addModel({ ...response });
    this.emit({ ...response }, `sub${response.id}`);
  }

  add(preID: string, o: IOptions): { model: IResponse; isNew: boolean } {
    const id = preID || this.generateID();
    const prevLength = this.models.length;
    this.selectedModel = this.models[this.findModelIndex(id)] || {
      ...this.defaultOptions,
      id,
    };
    this.selectedModel = this.getValidatedOptions(o);
    this.addModel(this.selectedModel);
    this.emit({ ...this.selectedModel });
    this.emit({ ...this.selectedModel }, `sub${this.selectedModel.id}`);
    return {
      model: { ...this.selectedModel },
      isNew: prevLength !== this.models.length,
    };
  }

  private addModel(model: IResponse): void {
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

  private getValidatedOptions(o: IOptions): IResponse {
    const copy = { ...this.selectedModel, ...o };
    this.validateStep(copy);
    this.setDecimalPlaces(copy.step);
    this.validateMin(copy);
    this.validateMax(copy);
    this.validateFrom(copy);
    if (copy.isInterval) {
      this.validateTo(copy);
    } else {
      copy.to = copy.max;
    }
    return copy;
  }

  private setDecimalPlaces(step: number): void {
    this.decimalPlaces = numberDecimalPlaces(step);
  }

  private validateStep(model: IResponse): void {
    model.step = Math.abs(model.step || this.selectedModel.step);
  }

  private validateMin(model: IResponse): void {
    model.min = Number(model.min.toFixed(this.decimalPlaces));
  }

  private validateMax(model: IResponse): void {
    const { min, max, step } = model;
    model.max = max > min ? max : min + step;
  }

  private validateFrom(model: IResponse): void {
    const { from, min, max, step } = model;
    model.from = Math.min(
      max,
      Number(
        (
          Math.ceil((clamp(min, from, this.selectedModel.to) - min) / step) *
            step +
          min
        ).toFixed(this.decimalPlaces)
      )
    );
  }

  private validateTo(model: IResponse): void {
    const { to, from, min, max, step } = model;
    model.to = Math.min(
      max,
      Number(
        (Math.ceil((clamp(from, to, max) - min) / step) * step + min).toFixed(
          this.decimalPlaces
        )
      )
    );
  }
}

export default Service;
