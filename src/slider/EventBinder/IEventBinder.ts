interface IEventBinder {
  bind<K extends keyof HTMLElementEventMap>(
    type: K, 
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void

  unbind<K extends keyof HTMLElementEventMap>(
    type: K, 
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void
}

export default IEventBinder;

