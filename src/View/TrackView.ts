import View from './View';

export default class ScaleView extends View {
  resizeObserver: ResizeObserver
  constructor(
    track: HTMLElement, private buttonW: number
  ) {
    super(track);
    this.resizeObserver = new ResizeObserver((entries) => {
      this.emit('resizeScale', entries[0].contentRect.width);
      this.transform();
    });
    this.resizeObserver.observe(this.component);
    this.component.addEventListener(
      'pointerdown', 
      (e) => {
        this.toggleTrigger();
        this.emit('clickOnScale', e.x);
        this.emit('definePointer', e.pointerId);
      }
    );
  } 

  transform(): void {
    this.component.style.transform = (
      `scaleX(${1 + this.buttonW / this.getRect().width})`
    );
  }
}

