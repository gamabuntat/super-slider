import View from './View';
import OrientationType from './OrientationType';

export default class TrackView extends View {
  resizeObserver: ResizeObserver
  constructor(
    track: HTMLElement, orient: OrientationType, private buttonW: number
  ) {
    super(track, orient);
    this.transform(this.buttonW / this.getRect()[this.orient.size]);
    this.bindEventListeners();
    this.resizeObserver = new ResizeObserver(this.resizeHandler.bind(this));
    this.resizeObserver.observe(this.component);
  } 

  bindEventListeners(): void {
    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.component.addEventListener(
      'pointerdown', this.pointerDownHandler.bind(this)
    );
  }

  pointerDownHandler(e: PointerEvent): void {
    this.toggleTrigger();
    this.emit(
      'clickOnTrack', 
      e[this.orient.coord] + (
        this.orient.isVertical ? window.pageYOffset : window.pageXOffset
      )
    );
    this.emit('movemove', e[this.orient.coord]);
    this.emit('definePointer', e.pointerId);
  }

  transform(x: number): void {
    this.component.style.transform = (
      `scale${this.orient.coord.toUpperCase()}(${1 + x})`
    );
  }

  resizeHandler(): void {
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

