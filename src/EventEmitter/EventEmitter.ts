interface StorageForEvents {
  [evt: string]: Handler[]
}

type Handler = (args: AA[]) => void
type AA = number

class EventEmitter {
  protected events: StorageForEvents = {};

  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit( evt: string, ...args: AA[]): void {
    (this.events[evt] || []).slice().forEach((lsn: Handler) => lsn(args));
  }
}

export {EventEmitter, AA};
