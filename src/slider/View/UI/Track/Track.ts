import EventBinder from 'slider/EventBinder/EventBinder';

import ITrack from './ITrack';

abstract class Track extends EventBinder {
  private pointerID = 0;
  protected lastPosition = 0;

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
  };

  private setPointerID({ pointerId }: PointerEvent): void {
    this.pointerID = pointerId;
  }

  abstract swap(): ITrack;

  protected abstract setLastPosition(e: MouseEvent): void;
}

class HorizontalTrack extends Track implements ITrack {
  swap(): ITrack {
    this.unbindListeners();
    return new VerticalTrack(this.component);
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

class VerticalTrack extends Track implements ITrack {
  swap(): ITrack {
    this.unbindListeners();
    return new HorizontalTrack(this.component);
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

export { HorizontalTrack, VerticalTrack };
