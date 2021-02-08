interface StorageForEvents {
  [evt: string]: Handler[]
}

interface hx {
  x: number
  scaleX: number
  scaleW: number
  btnW: number
}

interface he {
  e: PointerEvent
}

type Handler = (o: hx | he | void) => void

class EventEmitter {
  protected events: StorageForEvents = {};
  on(evt: string, listener: Handler): EventEmitter {
    (this.events[evt] || (this.events[evt] = [])).push(listener);
    return this;
  }

  emit(evt: string, args: hx | he): void {
    (this.events[evt] || [])
      .slice()
      .forEach((lsn: Handler) => lsn(args));
  }
}

export {hx, he, EventEmitter};
