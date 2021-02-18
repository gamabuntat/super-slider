import Service from '../Sevice/Service';
import ScaleView from '../View/ScaleView';
import ButtonView from '../View/ButtonView';
import DisplayView from '../View/DisplayView';

type btn = 'buttonS' | 'buttonE'
type response = [btn, number, number, number]

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
      .on('sendArguments', (args) => this.defineMoveButton(args as response));
    this.scale
      .on('clickOnScale', (x) => this.defineButton(x as number[]))
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((b) => {
        b
          .on('pointerDown', (x) => this.defineButton(x as number[]))
          .on('pointerDown', () => this.askArguments())
          .on('moveButton', (x) => this.saveLastPosition(x as number[]));
      })
      this.buttonS.on('lostPointer', () => this.setMinExtreme());
      this.buttonE.on('lostPointer', () => this.setMaxExtreme());
    }
  }

  defineButton([x]: number[]): void {
    this.service.defineButton(x);
  }

  setMaxExtreme(): void {
    this.service.setMaxExtreme();
  }

  setMinExtreme(): void {
    this.service.setMinExtreme();
  }

  askArguments(): void {
    this.service.sendArguments();
  }

  defineMoveButton([button, maxExtreme, minExtreme, scaleX]: response): void {
    const activeButton = this[button] || this.buttonS;
    activeButton.defineMoveButton(
      maxExtreme, minExtreme, scaleX
    );
  }

  saveLastPosition([x]: number[]): void {
    this.service.saveLastPosition(x);
  }
}

