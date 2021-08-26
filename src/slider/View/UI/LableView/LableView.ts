import ILabelView from './ILableView';

class LableView implements ILabelView {
  constructor(protected component: HTMLElement) {}

  updateValue(v: string): void {
    this.component.innerText = v;
  }
}

export default LableView;

