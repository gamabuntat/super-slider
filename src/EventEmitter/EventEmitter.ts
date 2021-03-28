interface IEvents {
  [evt: string]: Handler[]
}

type Handler = (args: number[]) => void

export default class EventEmitter {
  protected events: IEvents = {};

  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(evt: string, ...args: number[]): void {
    (this.events[evt] || []).slice().forEach((lsn: Handler) => lsn(args));
  }
}

