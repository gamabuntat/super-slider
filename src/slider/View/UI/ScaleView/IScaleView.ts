import IEventBinder from 'slider/EventBinder/IEventBinder';
import type { AllPositions } from 'slider/View/Config/IConfig';

interface IScaleView extends IEventBinder {
  swap(): IScaleView;
  update(p: AllPositions): void;
  getLastPosition(): number;
  toggleHiddenMode(): void;
}

export default IScaleView;
