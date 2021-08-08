import { IResponse } from 'slider/helpers/IResponse';

type TypeResponseHandler = (response: IResponse) => void;

interface IEventEmitter {
  on({ id }: IResponse, listener: TypeResponseHandler): this
}

class EventEmitter implements IEventEmitter {
  protected events: { [id: string]: TypeResponseHandler[] } = {}

  on({ id }: IResponse, handler: TypeResponseHandler): this {
    (this.events[id] || (this.events[id] = [])).push(handler);
    return this;
  }

  protected emit(arg: IResponse): void {
    (this.events[arg.id] || [])
      .forEach((handler: TypeResponseHandler) => handler(arg));
  }
}

export default EventEmitter;

