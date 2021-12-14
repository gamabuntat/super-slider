import IEventBinder from 'slider/EventBinder/IEventBinder';

interface ITrack extends IEventBinder {
  swap(): ITrack;
  getLastPosition(): number;
  getPointerID(): number;
}

export default ITrack;
