import IEventBinder from 'slider/EventBinder/IEventBinder';

interface ITrackView extends IEventBinder {
  swap(): ITrackView
  getLastPosition(): number
  getPointerID(): number
}

export default ITrackView;

