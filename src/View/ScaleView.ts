import View from './View';

export default class ScaleView extends View {
  // resizeObserver: ResizeObserver
  constructor(scale: HTMLElement) {
    super(scale);
    // this.resizeObserver = new ResizeObserver((entries) => {
    //   this.emit('resizeScale', entries[0].contentRect.width);
    // });
    // this.resizeObserver.observe(this.component);
    this.component.addEventListener(
      'pointerdown', 
      (e) => {
        this.toggleTrigger();
        this.emit('clickOnScale', e.x);
        this.emit('definePointer', e.pointerId);
      }
    );
  } 
}

