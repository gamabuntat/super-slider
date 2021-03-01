import Service from '../Service/Service';
import ScaleView from '../View/ScaleView';
import ButtonView from '../View/ButtonView';
import DisplayView from '../View/DisplayView';

export default class Presenter {
  constructor(
    private service: Service,
    private scale: ScaleView,
    private buttonS: ButtonView,
    private displayS: DisplayView,
    private buttonE: ButtonView | false,
    private displayE: DisplayView | false
  ) {
    this.service
      .on('sendButtonData', (args) => this.moveButton(args as number[]))
      .on('sendDisplayData', (args) => this.moveDisplay(args as number[]))
      .on('changeValue', (args) => this.changeValue(args as number[]));
    this.scale
      .on('clickOnScale', (x) => this.determineButton(x as number[]))
      .on('clickOnScale', (x) => this.getButtonData(x as number[]))
      .on(
        'definePointer', (pointerId) => this.fixPointer(pointerId as number[])
      )
      .on('resizeScale', (w) => this.updateSizes(w as number[]));
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

  moveButton([x, maxExtreme, minExtreme, scaleX, scaleW]: number[]): void {
    this.getActiveButton().moveButton(
      x, maxExtreme, minExtreme, scaleX, scaleW
    );
  }

  moveDisplay([
    relativeBtnPos, 
    scaleW, 
    maxExtreme, 
    minExtreme
  ]: number[]): void {
    this.getActiveDisplay().moveDisplay(
      relativeBtnPos, 
      scaleW, 
      maxExtreme, 
      minExtreme
    );
  }

  changeValue(
    [relativeBtnPos, min, valueOfDivision]: number[]
  ): void {
    this.getActiveDisplay().changeValue(
      relativeBtnPos, min, valueOfDivision
    );
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

