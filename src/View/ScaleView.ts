import View from './View';

export default class ScaleView extends View {
  ResizeObserve: ResizeObserver
  constructor(scale: HTMLElement) {
    super(scale);
    this.component.addEventListener(
      'pointerdown', 
      (e) => {
        console.log(e.pointerId);
        this.toggleTrigger();
        this.emit('clickOnScale', e);
      }
    );
    this.ResizeObserve = new ResizeObserver(() => {
      setTimeout(() => {
        console.log(this.component.getBoundingClientRect().width);
      }, 1000);
    });
    this.ResizeObserve.observe(this.component);
  }
}

