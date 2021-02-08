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
    button.on('movePointer', () => this.updateSizes())
      .on('movePointer', (e) => this.setNewX(e as he));
  }

  updateSizes(): void {
    this.model.updateElementsSizes(this.scale.init());
  }

  setNewX(e: he): void {
    this.model.setX(e.e);
  }

  callMoveButton({x, scaleX, scaleW, btnW}: hx): void {
    this.button.moveButton(x, scaleX, scaleW, btnW);
  }

  init(): Presenter {
    this.model.updateElementsSizes(
      this.scale.init(),
      this.button.init(),
    );
    return this;
  }
}
