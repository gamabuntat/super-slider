import View from './View';

export default class ScaleView extends View {
  constructor(scale: HTMLElement) {
    super(scale);
    this.component.addEventListener(
      'pointerdown', 
      (e) => this.emit('clickOnScale', e.x)
    );
  } 
}

