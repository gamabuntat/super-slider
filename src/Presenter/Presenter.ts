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
      .on('sendArguments', (args) => this.moveButton(args as response));
    if (this.buttonE) {
      [this.buttonS, this.buttonE].forEach((b) => {
        b
          .on('pointerDown', (x) => this.defineButton(x as number[]))
          .on('defineMoveButton', () => this.sendArguments());
      })
      this.buttonS.on('pointerDown', () => this.setMaxExtreme());
      this.buttonE.on('pointerDown', () => this.setMinExtreme());
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

  sendArguments(): void {
    this.service.sendArguments();
  }

  moveButton([button, maxExtreme, minExtreme, scaleX]: response): void {
    this.definButton(button).difineFinnalyMoveButton(
      maxExtreme, minExtreme, scaleX
    );
  }

  definButton(button: btn): ButtonView {
    return this[button] || this.buttonS;
  }
}

