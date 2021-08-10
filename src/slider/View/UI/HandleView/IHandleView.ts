import IEventBinder from 'slider/EventBinder/IEventBinder';

interface ICalcPositionArgs {
  max: number
  min: number
  containerCoord: number
  containerSize: number
  divisionNumber?: number
}

interface IHandleView extends IEventBinder {
  calcPosition<A extends ICalcPositionArgs>(arg: A): number
  move(position: number): void
  swap(): IHandleView
}

export {IHandleView, ICalcPositionArgs};

