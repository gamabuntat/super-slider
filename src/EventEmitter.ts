interface StorageForEvents {
  [evt: string]: Handler[]
}

type Handler = (
  o: number[] 
  | PointerEvent 
  | [PointerEvent, DOMRect] 
  | void
) => void

export default class EventEmitter {
  protected events: StorageForEvents = {};
  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(
    evt: string, 
    args?: number[] | PointerEvent | [PointerEvent, DOMRect]
  ): void {
    (this.events[evt] || [])
      .slice()
      .forEach((lsn: Handler) => lsn(args));
  }
}

