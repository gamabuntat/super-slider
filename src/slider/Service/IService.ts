import { IEventEmitter } from 'slider/EventEmitter/EventEmitter';
import IResponse from 'slider/interfaces/IResponse';

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

interface IService extends IEventEmitter {
  updateModel(response: IResponse): void
  add(id: string | undefined, o: IOptions): IResponse
}

export { IService, IValidatedOptions, TypeValidateOptionsKeys };

