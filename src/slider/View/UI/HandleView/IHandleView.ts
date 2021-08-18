import IEventBinder from 'slider/EventBinder/IEventBinder';

interface IHandleView extends IEventBinder {
  calcPosition(
    max: number,
    min: number,
    containerCoord: number,
    containerSize: number,
  ): number
  move(position: number): void
  swap(): IHandleView
}

export default IHandleView;

