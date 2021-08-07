import IEventBinder from '../../../EventBinder/IEventBinder';

interface ICalcPositionArgs {
  max: number
  min: number
  containerCoord: number
  containerSize: number
}

interface IHandleView extends IEventBinder {
  logShift(): void
  bindListeners(): IHandleView
  calcPosition<A extends ICalcPositionArgs>(arg: A): number
  move(position: number): void
  swap(): IHandleView
}

export {IHandleView, ICalcPositionArgs};

