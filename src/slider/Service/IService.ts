import {
  IEventEmitter, TypeResponseHandler 
} from 'slider/EventEmitter/EventEmitter';

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
  subscribe(preID: string, cb: TypeResponseHandler): string
  removeModel(id: string): void
  updateModel(response: IResponse): void
  add(id: string, o: IOptions): { model: IResponse, isNew: boolean }
}

export { IService, IValidatedOptions, TypeValidateOptionsKeys };

