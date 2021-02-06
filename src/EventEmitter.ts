interface StorageForEvents {
  [evt: string]: Array<(e: MouseEvent) => void>
}

export default class EventEmitter {
  protected events: StorageForEvents = {};
  on(evt: string, listener: (e: MouseEvent) => void): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }
  emit(evt: string, e: MouseEvent): void {
    (this.events[evt] || []).slice().forEach((lsn) => lsn(e));
  }
}
