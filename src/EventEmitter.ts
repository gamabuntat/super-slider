interface StorageForEvents {
  [evt: string]: Handler[]
}

interface hx {
  x: number
  scaleX: number
  scaleW: number
  shiftX: number
  btnW: number
}

type Handler = (o: hx | PointerEvent | void) => void

class EventEmitter {
  protected events: StorageForEvents = {};
  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(evt: string, args?: hx | PointerEvent): void {
    (this.events[evt] || [])
      .slice()
      .forEach((lsn: Handler) => lsn(args));
  }
}

export {hx, EventEmitter};
