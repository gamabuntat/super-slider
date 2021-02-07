import {he, hx} from './EventEmitter';
import Model from './Model';
import {ScaleView, ButtonView} from './View';

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
  ) {
    model.on('changeX', (x) => {
      this.callMoveButton(x as hx);
    });
    scale.on('clickOnScale', (e) => this.setNewX(e as he));
    button.on('clickOnButton', (e) => this.setNewX(e as he));
  }

  setNewX(e: he): void {
    this.model.setX(e.e);
  }

  callMoveButton({x, scaleX, btnW}: hx): void {
    this.button.moveButton(x, scaleX, btnW);
  }

  init(): Presenter {
    this.model.keepElementRect(
      this.scale.init(),
      this.button.init(),
    );
    return this;
  }
}
