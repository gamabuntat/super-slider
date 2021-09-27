import EventBinder from 'slider/EventBinder/EventBinder';

import ITrackView from './ITrackView';

abstract class TrackView extends EventBinder {
  private pointerID = 0
  protected lastPosition = 0

  constructor(component: HTMLElement) {
    super(component);
    this.bindListeners();
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  getPointerID(): number {
    return this.pointerID;
  }

  protected unbindListeners(): void {
    this.unbind('pointerdown', this.handleTrackPointerdown);
  }

  private bindListeners(): void {
    this.bind('pointerdown', this.handleTrackPointerdown);
  }

  private handleTrackPointerdown = (e: PointerEvent): void => {
    this.setLastPosition(e);
    this.setPointerID(e);
  }

  private setPointerID({ pointerId }: PointerEvent): void {
    this.pointerID = pointerId;
  }

  abstract swap(): ITrackView

  protected abstract setLastPosition(e: MouseEvent): void
}

class HorizontalTrackView extends TrackView implements ITrackView {
  swap(): ITrackView {
    this.unbindListeners();
    return new VerticalTrackView(this.component);
  }

  protected setLastPosition({ x }: MouseEvent): void {
    this.lastPosition = (x - this.getTrackCoord()) / this.getTrackSize();
  }

  protected getTrackSize(): number {
    return this.component.getBoundingClientRect().width;
  }

  protected getTrackCoord(): number {
    return this.component.getBoundingClientRect().x;
  }
}

class VerticalTrackView extends TrackView implements ITrackView {
  swap(): ITrackView {
    this.unbindListeners();
    return new HorizontalTrackView(this.component);
  }

  protected setLastPosition({ y }: MouseEvent): void {
    this.lastPosition = (y - this.getTrackCoord()) / this.getTrackSize();
  }

  protected getTrackSize(): number {
    return this.component.getBoundingClientRect().height;
  }

  protected getTrackCoord(): number {
    return this.component.getBoundingClientRect().y;
  }
}

export { HorizontalTrackView, VerticalTrackView };

