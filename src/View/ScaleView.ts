import View from './View';

export default class ScaleView extends View {
  ResizeObserve: ResizeObserver
  constructor(scale: HTMLElement) {
    super(scale);
    this.component.addEventListener(
      'pointerdown', 
      (e) => {
        this.toggleTrigger();
        this.emit('clickOnScale', e);
      }
    );
    this.ResizeObserve = new ResizeObserver(() => {console.log('hi');});
    this.ResizeObserve.observe(this.component);
  }
}

