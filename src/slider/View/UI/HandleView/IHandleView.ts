import IEventBinder from 'slider/EventBinder/IEventBinder';

interface IHandleView extends IEventBinder {
  getCaptureStatus(): boolean;
  getFocusStatus(): boolean;
  calcPosition(containerCoord: number, containerSize: number): number;
  move(position: number): void;
  fixPointer(pointerID: number): void;
  swap(): IHandleView;
}

export default IHandleView;
