import IEventBinder from 'slider/EventBinder/IEventBinder';
import { IAllPositions } from 'slider/View/Config/IConfig';

interface IScaleView extends IEventBinder {
  swap(): IScaleView
  update(p: IAllPositions): void
  getLastPosition(): number
  toggleHiddenMode(): void
}

export default IScaleView;

