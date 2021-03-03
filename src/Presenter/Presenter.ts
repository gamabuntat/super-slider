import Service from '../Service/Service';
import TrackView from '../View/TrackView';
import ButtonView from '../View/ButtonView';
import DisplayView from '../View/DisplayView';
import ProgressBarView from '../View/ProgressBarView';
import ScaleView from '../View/ScaleView';

export default class Presenter {
  constructor(
    private service: Service,
    private track: TrackView,
    private buttonS: ButtonView,
    private displayS: DisplayView,
    private progressBarS: ProgressBarView,
    private scale: ScaleView,
    private buttonE: ButtonView | false,
    private displayE: DisplayView | false,
    private progressBarE: ProgressBarView | false
  ) {
    this.service
      .on('sendButtonData', (args) => this.moveButton(args as number[]))
      .on('sendDisplayData', (args) => this.moveDisplay(args as number[]))
      .on('changeValue', (args) => this.changeValue(args as number[]))
      .on('changeWidth', (args) => this.changeWidth(args as number[]))
      .on('sendScaleData', (args) => this.fillValues(args as number[]));
    this.track
      .on('clickOnTrack', (x) => this.determineButton(x as number[]))
      .on('clickOnTrack', (x) => this.getButtonData(x as number[]))
      .on(
        'definePointer', (pointerId) => this.fixPointer(pointerId as number[])
      )
      .on('resizeTrack', (w) => this.updateSizes(w as number[]));
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((b) => {
        b
          .on('pointerDown', (x) => this.determineButton(x as number[]))
          .on('moveButton', (x) => this.getButtonData(x as number[]))
          .on('updatePosition', (x) => this.saveLastPosition(x as number[]));
      });
      this.buttonS.on('lostPointer', () => this.setMinExtreme());
      this.buttonE.on('lostPointer', () => this.setMaxExtreme());
    } else {
      this.buttonS
        .on('moveButton', (x) => this.getButtonData(x as number[]))
        .on('updatePosition', (x) => this.saveLastPosition(x as number[]));
    }
  }

  determineButton([x]: number[]): void {
    this.service.determineButton(x);
  }

  setMaxExtreme(): void {
    this.service.setMaxExtreme();
  }

  setMinExtreme(): void {
    this.service.setMinExtreme();
  }

  getButtonData([x]: number[]): void {
    this.service.sendButtonData(x);
  }

  fixPointer([pointerId]: number[]): void {
    this.getActiveButton().fixPointer(pointerId);
  }

  getActiveButton(): ButtonView {
    return this[this.service.getActiveButton()] || this.buttonS;
  }

  getActiveDisplay(): DisplayView {
    if (!this.displayE) {
      return this.displayS;
    }
    return (this.getActiveButton() === this.buttonS 
      ? this.displayS : this.displayE);
  }

  getActiveProgressBar(): ProgressBarView {
    if (!this.progressBarE) {
      return this.progressBarS;
    }
    return (this.getActiveButton() === this.buttonS
      ? this.progressBarS : this.progressBarE);
  }

  moveButton([x, maxExtreme, minExtreme, trackX, trackW]: number[]): void {
    this.getActiveButton().moveButton(
      x, maxExtreme, minExtreme, trackX, trackW
    );
  }

  moveDisplay([
    relativeBtnPos, 
    trackW, 
    maxExtreme, 
    minExtreme
  ]: number[]): void {
    this.getActiveDisplay().moveDisplay(
      relativeBtnPos, 
      trackW, 
      maxExtreme, 
      minExtreme
    );
  }

  changeValue(
    [relativeBtnPos, min, max, valueOfDivision, step]: number[]
  ): void {
    this.getActiveDisplay().changeValue(
      relativeBtnPos, min, max, valueOfDivision, step
    );
  }

  changeWidth([x, relBtnW]: number[]): void {
    this.getActiveProgressBar().changeWidth(x, relBtnW);
  }

  fillValues([max, min, step]: number[]): void {
    this.scale.fillValues(max, min, step);
  }

  saveLastPosition([x]: number[]): void {
    this.service.saveLastPosition(x);
  }

  updateSizes([w]: number[]): void {
    this.service.updateSizes(w);
  }

  init(): Presenter {
    this.service.init();
    return this;
  }
}

