import IEventBinder from 'slider/EventBinder/IEventBinder';

interface IScaleView extends IEventBinder {
  swap(): IScaleView;
  update(p: number[]): void;
  getLastPosition(): number;
  toggleHiddenMode(): void;
}

export default IScaleView;
