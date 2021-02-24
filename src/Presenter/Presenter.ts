import Service from '../Sevice/Service';
import ScaleView from '../View/ScaleView';
import ButtonView from '../View/ButtonView';
import DisplayView from '../View/DisplayView';

export default class Presenter {
  constructor(
    private service: Service,
    private scale: ScaleView,
    private buttonS: ButtonView,
    private display: DisplayView,
    private buttonE: ButtonView | false,
    private displayE: DisplayView | false
  ) {
    this.service
      .on('sendMainData', (args) => this.moveButton(args as number[]));
    this.scale
      .on('clickOnScale', (x) => this.determineButton(x as number[]))
      .on('clickOnScale', (x) => this.getMainData(x as number[]))
      .on(
        'definePointer', (pointerId) => this.fixPointer(pointerId as number[])
      )
      .on('resizeScale', (w) => this.updateScaleSizes(w as number[]));
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((b) => {
        b
          .on('pointerDown', (x) => this.determineButton(x as number[]))
          .on('moveButton', (x) => this.getMainData(x as number[]))
          .on('updatePosition', (x) => this.saveLastPosition(x as number[]));
      });
      this.buttonS.on('lostPointer', () => this.setMinExtreme());
      this.buttonE.on('lostPointer', () => this.setMaxExtreme());
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

  getMainData([x]: number[]): void {
    this.service.sendMainData(x);
  }

  fixPointer([pointerId]: number[]): void {
    this.getActiveButton().fixPointer(pointerId);
  }

  getActiveButton(): ButtonView {
    return this[this.service.getActiveButton()] || this.buttonS;
  }

  moveButton([x, maxExtreme, minExtreme, scaleX, scaleW]: number[]): void {
    this.getActiveButton().moveButton(
      x, maxExtreme, minExtreme, scaleX, scaleW
    );
  }

  saveLastPosition([x]: number[]): void {
    this.service.saveLastPosition(x);
  }

  updateScaleSizes([w]: number[]): void {
    this.service.updateScaleSizes(w);
  }
}

