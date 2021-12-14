import {
  IEventEmitter,
  TypeResponseHandler,
} from 'slider/EventEmitter/EventEmitter';

interface IService extends IEventEmitter {
  subscribe(preID: string, cb: TypeResponseHandler): string;
  removeModel(id: string): void;
  updateModel(response: ModelResponse): void;
  add(id: string, o: Options): { model: ModelResponse; isNew: boolean };
}

export default IService;
