import IResponse from 'slider/interfaces/IResponse';

type TypeResponseHandler = (response: IResponse) => void;

interface IEventEmitter {
  on(ev: string, listener: TypeResponseHandler): this
}

class EventEmitter implements IEventEmitter {
  protected events: { [id: string]: TypeResponseHandler[] } = {}

  on(id: string, handler: TypeResponseHandler): this {
    (this.events[id] || (this.events[id] = [])).push(handler);
    return this;
  }

  protected emit(arg: IResponse): void {
    (this.events[arg.id] || [])
      .forEach((handler: TypeResponseHandler) => handler(arg));
  }
}

export { EventEmitter, IEventEmitter };

