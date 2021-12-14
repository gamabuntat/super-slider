import IEventBinder from 'slider/EventBinder/IEventBinder';
import type { AllPositions } from 'slider/View/Config/IConfig';

interface IScale extends IEventBinder {
  swap(): IScale;
  update(p: AllPositions): void;
  getLastPosition(): number;
  toggleHiddenMode(): void;
}

export default IScale;
