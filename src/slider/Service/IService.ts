import {
  IEventEmitter, TypeResponseHandler 
} from 'slider/EventEmitter/EventEmitter';

interface IService extends IEventEmitter {
  subscribe(preID: string, cb: TypeResponseHandler): string
  removeModel(id: string): void
  updateModel(response: IResponse): void
  add(id: string, o: IOptions): { model: IResponse, isNew: boolean }
}

export { IService };

