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
    this.service
      .on('sendButtonData', (data) => this.calcButtonPosition(data))
      .on('sendButtonApi', (data) => this.calcButtonPositionApi(data))
      .on('sendDisplayData', (data) => this.moveDisplay(data))
      .on('changeValue', (data) => this.changeValue(data))
      .on('changeSize', (data) => this.changeSize(data))
      .on('sendScaleData', (data) => this.fillValues(data))
      .on('toggleScaleVisibility', () => this.toggleScaleVisibility())
      .on('toggleDisplayVisibility', () => this.toggleDisplayVisibility());
    this.track
      .on('clickOnTrack', (coord) => this.determineButton(coord))
      .on('movemove', (coord) => this.getButtonData(coord))
      .on('definePointer', (pointerId) => this.fixPointer(pointerId))
      .on('resizeTrack', (sizeCoord) => this.updateSizes(sizeCoord));
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((storage) => {
        storage.button
          .on('pointerDown', (coord) => this.determineButton(coord))
          .on('moveButton', (coord) => this.getButtonData(coord))
          .on('updatePosition', (coord) => this.saveLastPosition(coord));
      });
    } else {
      this.buttonS.button
        .on('moveButton', (coord) => this.getButtonData(coord))
        .on('updatePosition', (coord) => this.saveLastPosition(coord));
    }
  }

  getOptions(): Options {
    return this.service.getOptions();
  }

  validateButtonPosition(button: buttonT, pos: number): void {
    this.service.validateButtonPosition(button, pos);
  }

  updateVisibility(prop: 'display' | 'scale'): void {
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
    this.buttonE && this.buttonE.display.toggleVisibility;
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

