import IEventBinder from 'slider/EventBinder/IEventBinder';
import { IAllPositions } from 'slider/View/Config/IConfig';

interface IScaleView extends IEventBinder {
  update(p: IAllPositions): void
}

export default IScaleView;

