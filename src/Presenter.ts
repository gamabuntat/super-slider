import Model from './Model';
import {ScaleView} from './View';

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
  ) {
    scale.on('clickOnScale', (e: MouseEvent) => this.setNewX(e));
  }

  readModel(): void {
    console.log(this.model);
  }

  setNewX(e: MouseEvent): void {
    this.model.setX(e);
  }
}
