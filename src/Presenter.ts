import Model from './Model';
import {ScaleView, ButtonView} from './View';

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
  ) {
    model.on('changeX', (
      x: number, 
      scaleX: number, 
      btnWidth: number,
    ) => this.callMoveButton(x, scaleX, btnWidth));
    scale.on('clickOnScale', (e: MouseEvent) => this.setNewX(e));
  }

  readModel(): void {
    console.log(this.model);
  }

  setNewX(e: MouseEvent): void {
    this.model.setX(e);
  }

  callMoveButton(x: number, scaleX: number, btnWidth: number): void {
    this.button.moveButton(x, scaleX, btnWidth);
  }

  init(): Presenter {
    this.model.keepElementRect(
      this.scale.init(),
      this.button.init(),
    );
    return this;
  }
}
