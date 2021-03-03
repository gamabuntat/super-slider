import View from './View';

export default class ScaleView extends View {
  private nValues: number
  private values: HTMLElement[]
  constructor(scale: HTMLElement) {
    super(scale);
    this.nValues = 5;
    this.values = Array(this.nValues).fill(0).map(() => this.createElement());
    this.values.forEach((s) => (
      this.component.insertAdjacentElement('beforeend', s)
    ));
  }

  createElement(): HTMLElement {
    return document.createElement('span');
  }

  fillValues(max: number, min: number): void {
    this.values.reduce((prevValue, s) => (
      (s.innerHTML = prevValue.toFixed()), 
      prevValue + (max - min) / (this.nValues - 1)
    ), min);
  }
}
