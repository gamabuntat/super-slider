type TypeAnyFunc = (...args: unknown[]) => unknown;

type TypeHandler<
  H extends TypeAnyFunc
> = (...args: Parameters<H>) => ReturnType<H>;

interface IEvents<H extends TypeAnyFunc> {
  [k: string]: TypeHandler<H>[]
}

interface IEventEmitter<H extends TypeAnyFunc> {
   events: IEvents<H>
}

class EventEmitter<H extends TypeAnyFunc> implements IEventEmitter<H> {
  events: IEvents<H>
  constructor() {
    this.events = {};
  }

  on(evt: string, listener: TypeHandler<H>): EventEmitter<H> {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(evt: string, ...args: Parameters<H>): void {
    (this.events[evt] || [])
      .forEach((lsn: TypeHandler<H>) => lsn(...args));
  }
}

export default EventEmitter;

