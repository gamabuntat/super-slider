import { IEventEmitter } from 'slider/EventEmitter/EventEmitter';

interface IView extends IEventEmitter {
  parseResponse(response: Model): void;
}

export default IView;
