import PresenterStorage from './PresenterStorage';
import TrackView from '../View/TrackView';
import ScaleView from '../View/ScaleView';
import Service from '../Service/Service';

export default class Presenter {
  constructor(
    private scale: ScaleView,
    private buttonS: PresenterStorage,
    private buttonE: PresenterStorage | false,
    private service: Service,
    private track: TrackView,
  ) {
    this.bindServiceListeners();
    this.bindTrackListeners();
    this.bindButtonListeners();
  }

  bindServiceListeners(): void {
    this.service
      .on('getTrackSizes', this.getTrackSizes.bind(this))
      .on('sendButtonData', this.calcButtonPosition.bind(this))
      .on('sendButtonApi', this.calcButtonPositionApi.bind(this))
      .on('sendDisplayData', this.moveDisplay.bind(this))
      .on('changeValue', this.changeValue.bind(this))
      .on('changeSize', this.changeSize.bind(this))
      .on('sendScaleData', this.fillValues.bind(this))
      .on('toggleScaleVisibility', this.toggleScaleVisibility.bind(this))
      .on('toggleDisplayVisibility', this.toggleDisplayVisibility.bind(this));
  }

  bindTrackListeners(): void {
    this.track
      .on('pointerDown', this.determineButton.bind(this))
      .on('moveButton', this.getButtonData.bind(this))
      .on('definePointer', this.fixPointer.bind(this))
      .on('resizeTrack', this.updateSizes.bind(this));
  }

  bindButtonListeners(): void {
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((storage) => (
        storage.button
          .on('pointerDown', this.determineButton.bind(this))
          .on('moveButton', this.getButtonData.bind(this))
          .on('updatePosition', this.saveLastPosition.bind(this))
      ));
      return;
    }
    this.buttonS.button
      .on('moveButton', this.getButtonData.bind(this))
      .on('updatePosition', this.saveLastPosition.bind(this));
  }

  getOptions(): Options {
    return this.service.getOptions();
  }

  getTrackSizes(): void {
    this.track.handleResize();
  }

  validateButtonPosition(button: buttonT, pos: number): void {
    this.service.validateButtonPosition(button, pos);
  }

  updateVisibility(prop: visibilityT): void {
    this.service.updateVisibility(prop);
  }

  determineButton([coord]: number[]): void {
    this.service.determineButton(coord);
  }

  getButtonData([coord]: number[]): void {
    this.service.sendButtonData(coord);
  }

  getActiveButton(): PresenterStorage {
    return this[this.service.getActiveButton()] || this.buttonS;
  }

  fixPointer([pointerId]: number[]): void {
    this.getActiveButton().button.fixPointer(pointerId);
  }

  calcButtonPosition(
    [coord, maxExtreme, minExtreme, trackX, trackW]: number[]
  ): void {
    this.getActiveButton().button.calcPosition(
      coord, maxExtreme, minExtreme, trackX, trackW
    );
  }

  calcButtonPositionApi(
    [pos, max, min, maxExtreme, minExtreme]: number[]
  ): void {
    this.getActiveButton().button.calcPositionApi(
      pos, max, min, maxExtreme, minExtreme
    );
  }

  moveDisplay(
    [relativeBtnPos, trackSize, maxExtreme, minExtreme]: number[]
  ): void {
    this.getActiveButton().display.moveDisplay(
      relativeBtnPos, trackSize, maxExtreme, minExtreme
    );
  }

  changeValue(
    [relativeBtnPos, min, max, step]: number[]
  ): void {
    this.getActiveButton().display.changeValue(
      relativeBtnPos, min, max, step
    );
  }

  toggleDisplayVisibility(): void {
    this.buttonS.display.toggleVisibility();
    this.buttonE && this.buttonE.display.toggleVisibility();
  }

  changeSize([coord, relBtnW]: number[]): void {
    this.getActiveButton().progressBar.changeSize(coord, relBtnW);
  }

  fillValues([max, min, step]: number[]): void {
    this.scale.fillValues(max, min, step);
  }

  toggleScaleVisibility(): void {
    this.scale.toggleVisibility();
  }

  saveLastPosition([coord]: number[]): void {
    this.service.saveLastPosition(coord);
  }

  updateSizes([size, coord]: number[]): void {
    this.service.updateSizes(size, coord);
  }

  init(): Presenter {
    this.service.init();
    return this;
  }
}

