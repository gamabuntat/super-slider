type TypeResponseHandler = (response: Model) => void;

interface IEventEmitter {
  on(ev: string, listener: TypeResponseHandler): this;
}

class EventEmitter implements IEventEmitter {
  protected events: { [id: string]: TypeResponseHandler[] } = {};

  on(id: string, handler: TypeResponseHandler): this {
    (this.events[id] || (this.events[id] = [])).push(handler);
    return this;
  }

  protected emit(arg: Model, id: string = arg.id): void {
    (this.events[id] || []).forEach((handler: TypeResponseHandler) =>
      handler(arg)
    );
  }
}

export { EventEmitter, IEventEmitter, TypeResponseHandler };
