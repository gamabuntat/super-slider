interface StorageForEvents {
  [evt: string]: Handler[]
}

interface Handler {
  <T>(...args: T[]): void
}

export default class EventEmitter {
  protected events: StorageForEvents = {};
  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }
  emit<T>(evt: string, ...args: T[]): void {
    (this.events[evt] || [])
      .slice()
      .forEach((lsn: Handler) => lsn(...args));
  }
}
