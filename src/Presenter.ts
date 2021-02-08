import {hx} from './EventEmitter';
import Model from './Model';
import {ScaleView, ButtonView} from './View';

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
  ) {
    this.model.on('changeX', (x) => this.callMoveButton(x as hx));
    this.scale.on('clickOnScale', (e) => this.setX(e as PointerEvent));
    this.button.on('pointerPressed', (e) => this.setShiftX(e as PointerEvent))
      .on('pointerMoved', (e) => this.setX(e as PointerEvent));
  }

  setShiftX(e: PointerEvent): void {
    this.model.setShiftX(e);
  }

  setX(e: PointerEvent): void {
    this.model.setX(e);
  }

  callMoveButton({x, scaleX, scaleW, shiftX, btnW}: hx): void {
    this.button.moveButton(x, scaleX, scaleW, shiftX, btnW);
  }
}
