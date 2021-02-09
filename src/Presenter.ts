import Model from './Model';
import ScaleView from './View/ScaleView';
import ButtonView from './View/ButtonView';

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
  ) {
    this.model.on('changeX', (x) => this.callMoveButton(x as number[]));
    this.scale.on('clickOnScale', (e) => this.setX(e as PointerEvent));
    this.button.on('pointerPressed', (args) => (
      this.setShiftX(args as [PointerEvent, DOMRect])
    ))
      .on('pointerMoved', (e) => this.setX(e as PointerEvent));
  }

  callMoveButton([x, scaleX, scaleW, shiftX, btnW]: number[]): void {
    this.button.moveButton(x, scaleX, scaleW, shiftX, btnW);
  }

  setShiftX([e, btnRect]: [PointerEvent, DOMRect]): void {
    this.model.setShiftX(e, btnRect);
  }

  setX(e: PointerEvent): void {
    this.model.setX(e);
  }
}

