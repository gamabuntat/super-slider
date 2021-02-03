interface StorageForEvents {
  [evt: string]: Array<(...arg: Array<string | number>) => void>
}

export default class EventEmitter {
  protected _events: StorageForEvents = {};
  on(evt: string, listener: () => void): EventEmitter {
    (this._events[evt] || (this._events[evt] = [])).push(listener);
    return this;
  }
  emit(evt: string, ...arg: Array<string | number>): void {
    (this._events[evt] || []).slice().forEach((lsn) => lsn(...arg));
  }
}
