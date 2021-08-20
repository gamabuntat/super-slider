import { IEventEmitter } from 'slider/EventEmitter/EventEmitter';
import IResponse from 'slider/interfaces/IResponse';

interface IView extends IEventEmitter {
  parseResponse(response: IResponse): void
}

export default IView;

