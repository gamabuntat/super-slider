import View from './View';
import OrientationType from './OrientationType';

export default class TrackView extends View {
  resizeObserver: ResizeObserver
  constructor(
    track: HTMLElement, orient: OrientationType, private buttonW: number
  ) {
    super(track, orient);
    window.addEventListener('resize', () => {
      this.resizeHandler();
    });
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeHandler();
    });
    this.resizeObserver.observe(this.component);
    this.component.addEventListener(
      'pointerdown', 
      (e) => {
        this.toggleTrigger();
        this.emit('clickOnTrack', e[this.orient.coord]);
        this.emit('definePointer', e.pointerId);
      }
    );
  } 

  transform(x: number): void {
    this.component.style.transform = (
      `scale${this.orient.coord.toUpperCase()}(${1 + x})`
    );
  }

  resizeHandler(): void {
    this.transform(0);
    const prevSize = this.getRect()[this.orient.size];
    this.emit('resizeTrack', prevSize, this.getRect()[this.orient.coord]);
    this.transform(this.buttonW / prevSize);
  }
}

