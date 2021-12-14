import IEventBinder from 'slider/EventBinder/IEventBinder';

interface IHandle extends IEventBinder {
  getCaptureStatus(): boolean;
  getFocusStatus(): boolean;
  calcPosition(containerCoord: number, containerSize: number): number;
  move(position: number): void;
  fixPointer(pointerID: number): void;
  swap(): IHandle;
}

export default IHandle;
