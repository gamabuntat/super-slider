interface StorageForEvents {
  [evt: string]: Handler[]
}

export interface hx {
  x: number
  scaleX: number
  btnW: number
}

export interface he {
  e: PointerEvent
}

type Handler = (o: hx | he) => void

export class EventEmitter {
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
