import {
  IEventEmitter,
  ResponseHandler,
} from 'slider/EventEmitter/EventEmitter';

interface IService extends IEventEmitter {
  subscribe(id: string, cb: ResponseHandler): void;
  removeModel(id: string): void;
  updateModel(response: Model): void;
  add(id: string, o: Options): void;
  findModelIndex(id: string): number;
}

export default IService;
