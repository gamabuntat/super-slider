import View from './View';

export default class TrackView extends View {
  resizeObserver: ResizeObserver
  constructor(
    track: HTMLElement, private buttonW: number
  ) {
    super(track);
    this.resizeObserver = new ResizeObserver(() => {
      this.transform(0);
      const prevW = this.getRect().width;
      this.emit('resizeTrack', prevW, this.getRect().x);
      this.transform(this.buttonW / prevW);
    });
    this.resizeObserver.observe(this.component);
    this.component.addEventListener(
      'pointerdown', 
      (e) => {
        this.toggleTrigger();
        this.emit('clickOnTrack', e.x);
        this.emit('definePointer', e.pointerId);
      }
    );
  } 

  transform(x: number): void {
    this.component.style.transform = `scaleX(${1 + x})`;
  }
}

