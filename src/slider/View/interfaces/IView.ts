import EventEmitter from 'slider/EventEmitter/EventEmitter';
import IResponse from 'slider/interfaces/IResponse';

interface IView extends EventEmitter {
  parseResponse(response: IResponse): void
}

export default IView;

