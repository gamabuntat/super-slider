import { IEventEmitter } from 'slider/EventEmitter/EventEmitter';

interface IView extends IEventEmitter {
  parseResponse(response: ModelResponse): void;
}

export default IView;
