import { IEventEmitter } from 'slider/EventEmitter/EventEmitter';

interface IView extends IEventEmitter {
  parseResponse(response: IResponse): void;
}

export default IView;
