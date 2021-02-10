interface StorageForEvents {
  [evt: string]: Handler[]
}

// type Handler = (
//   o: number[] 
//   | PointerEvent 
//   | [PointerEvent, DOMRect] 
//   | DOMRect
//   | void
// ) => void

type Handler = (args: AA[]) => void
type AA = PointerEvent | DOMRect | number

class EventEmitter {
  protected events: StorageForEvents = {};

  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(
    evt: string, 
    // args?: number[] | PointerEvent | [PointerEvent, DOMRect] | DOMRect
    ...args: AA[]
  ): void {
    (this.events[evt] || [])
      .slice()
      .forEach((lsn: Handler) => lsn(args));
  }
}

export {EventEmitter, AA};
