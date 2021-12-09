import IEventBinder from './IEventBinder';

class EventBinder implements IEventBinder {
  constructor(protected component: HTMLElement) {}

  bind<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.component.addEventListener(type, listener, options);
    return this;
  }

  unbind<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.component.removeEventListener(type, listener, options);
    return this;
  }
}

export default EventBinder;
