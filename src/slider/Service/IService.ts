import {
  IEventEmitter,
  TypeResponseHandler,
} from 'slider/EventEmitter/EventEmitter';

interface IService extends IEventEmitter {
  subscribe(preID: string, cb: TypeResponseHandler): string;
  removeModel(id: string): void;
  updateModel(response: Model): void;
  add(id: string, o: Options): { model: Model; isNew: boolean };
}

export default IService;
