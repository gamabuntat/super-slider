import PresenterStorage from './PresenterStorage';
import TrackView from '../View/TrackView';
import ScaleView from '../View/ScaleView';
import Service from '../Service/Service';

export default class Presenter {
  constructor(
    private track: TrackView,
    private scale: ScaleView,
    private buttonS: PresenterStorage,
    private buttonE: PresenterStorage | false,
    private service: Service,
  ) {
    this.service
      .on('sendButtonData', (data) => this.moveButton(data))
      .on('sendDisplayData', (data) => this.moveDisplay(data))
      .on('changeValue', (data) => this.changeValue(data))
      .on('changeWidth', (data) => this.changeWidth(data))
      .on('sendScaleData', (data) => this.fillValues(data));
    this.track
      .on('clickOnTrack', (x) => this.determineButton(x))
      .on('clickOnTrack', (x) => this.getButtonData(x))
      .on('definePointer', (pointerId) => this.fixPointer(pointerId))
      .on('resizeTrack', (wx) => this.updateSizes(wx));
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((storage) => {
        storage.button
          .on('pointerDown', (x) => this.determineButton(x))
          .on('moveButton', (x) => this.getButtonData(x))
          .on('updatePosition', (x) => this.saveLastPosition(x));
      });
    } else {
      this.buttonS.button
        .on('moveButton', (x) => this.getButtonData(x))
        .on('updatePosition', (x) => this.saveLastPosition(x));
    }
  }

  determineButton([x]: number[]): void {
    this.service.determineButton(x);
  }

  getButtonData([x]: number[]): void {
    this.service.sendButtonData(x);
  }

  getActiveButton(): PresenterStorage {
    return this[this.service.getActiveButton()] || this.buttonS;
  }

  fixPointer([pointerId]: number[]): void {
    this.getActiveButton().button.fixPointer(pointerId);
  }

  moveButton([x, maxExtreme, minExtreme, trackX, trackW]: number[]): void {
    this.getActiveButton().button.moveButton(
      x, maxExtreme, minExtreme, trackX, trackW
    );
  }

  moveDisplay(
    [relativeBtnPos, trackW, maxExtreme, minExtreme]: number[]
  ): void {
    this.getActiveButton().display.moveDisplay(
      relativeBtnPos, trackW, maxExtreme, minExtreme
    );
  }

  changeValue(
    [relativeBtnPos, min, max, valueOfDivision, step]: number[]
  ): void {
    this.getActiveButton().display.changeValue(
      relativeBtnPos, min, max, valueOfDivision, step
    );
  }

  changeWidth([x, relBtnW]: number[]): void {
    this.getActiveButton().progressBar.changeWidth(x, relBtnW);
  }

  fillValues([max, min, step]: number[]): void {
    this.scale.fillValues(max, min, step);
  }

  saveLastPosition([x]: number[]): void {
    this.service.saveLastPosition(x);
  }

  updateSizes([w, x]: number[]): void {
    this.service.updateSizes(w, x);
  }

  init(): Presenter {
    this.service.init();
    return this;
  }
}

