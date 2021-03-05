import View from './View';
import OrientationType from './OrientationType';

export default class TrackView extends View {
  constructor(
    track: HTMLElement, orient: OrientationType, private buttonW: number
  ) {
    super(track, orient);
    window.addEventListener('resize', () => {
      this.transform(0);
      const prevW = this.getRect().width;
      this.emit('resizeTrack', prevW, this.getRect().x);
      this.transform(this.buttonW / prevW);
    });
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

