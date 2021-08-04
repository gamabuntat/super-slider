class EventBinder {
  constructor(protected component: HTMLElement) {}

  bind<K extends keyof HTMLElementEventMap>(
    type: K, 
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.component.addEventListener(type, listener, options);
  }

  unbind<K extends keyof HTMLElementEventMap>(
    type: K, 
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.component.removeEventListener(type, listener, options);
  }
}

export default EventBinder;

