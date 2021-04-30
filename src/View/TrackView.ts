import View from './View';
import OrientationType from './OrientationType';

export default class TrackView extends View {
  resizeObserver: ResizeObserver
  constructor(
    track: HTMLElement,
    orient: OrientationType,
    private buttonW: number
  ) {
    super(track, orient);
    this.transform(this.buttonW / this.getRect()[this.orient.size]);
    this.bindEventListeners();
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.component);
  } 

  bindEventListeners(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.component.addEventListener(
      'pointerdown', this.handleTrackPointerDown.bind(this)
    );
  }

  handleTrackPointerDown(e: PointerEvent): void {
    View.toggleTrigger();
    this.emit(
      'pointerDown', 
      e[this.orient.coord] + (
        this.orient.isVertical ? window.pageYOffset : window.pageXOffset
      )
    );
    this.emit('moveButton', e[this.orient.coord]);
    this.emit('definePointer', e.pointerId);
  }

  transform(x: number): void {
    this.component.style.transform = (
      `scale${this.orient.coord.toUpperCase()}(${1 + x})`
    );
  }

  handleResize(): void {
    this.transform(0);
    const prevSize = this.getRect()[this.orient.size];
    this.emit(
      'resizeTrack',
      prevSize,
      this.getRect()[this.orient.coord] + (
        this.orient.isVertical ? window.pageYOffset : window.pageXOffset
      )
    );
    this.transform(this.buttonW / prevSize);
  }
}

