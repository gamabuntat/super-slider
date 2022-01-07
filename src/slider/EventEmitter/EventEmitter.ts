type ResponseHandler = (response: Model) => void;

interface IEventEmitter {
  on(ev: string, listener: ResponseHandler): this;
}

class EventEmitter implements IEventEmitter {
  protected events: { [id: string]: ResponseHandler[] } = {};

  on(id: string, handler: ResponseHandler): this {
    (this.events[id] || (this.events[id] = [])).push(handler);
    return this;
  }

  protected emit(arg: Model, id: string = arg.id): void {
    (this.events[id] || []).forEach((handler: ResponseHandler) => handler(arg));
  }
}

export default EventEmitter;

export type { IEventEmitter, ResponseHandler };
