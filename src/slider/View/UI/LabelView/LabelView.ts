import ILabelView from './ILabelView';

class LabelView implements ILabelView {

  constructor(protected component: HTMLElement) {}

  updateValue(v: string): void {
    this.component.innerText = v;
  }
}

export default LabelView;

