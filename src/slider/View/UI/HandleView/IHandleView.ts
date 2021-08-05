import IEventBinder from '../../../EventBinder/IEventBinder';

interface ICalcPositionArgs {
  pointerCoord: number
  max: number
  min: number
  containerCoord: number
  containerSize: number
  shift: number
}

interface IHandleView extends IEventBinder {
  calcPosition<A extends ICalcPositionArgs>(arg: A): number
  moveX(position: number): void
  moveY(position: number): void
  getLastPosition(): number
}

export {IHandleView, ICalcPositionArgs};

