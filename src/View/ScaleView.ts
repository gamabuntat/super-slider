import View from './View';

export default class ScaleView extends View {
  private nValues: number
  private values: HTMLElement[]
  constructor(scale: HTMLElement, btnW: number) {
    super(scale);
    this.nValues = 5;
    this.values = Array(this.nValues).fill(0).map(() => this.createElement());
    this.values.forEach((s) => (
      this.component.insertAdjacentElement('beforeend', s)
    ));
    scale.style.margin = `${btnW * -0.5}px ${btnW * 0.5}px`;
    scale.style.marginBottom = `0`;
  }

  createElement(): HTMLElement {
    return document.createElement('span');
  }

  fillValues(max: number, min: number, step: number): void {
    this.values.reduce((prevValue, s) => {
      const value = prevValue.toFixed(this.defineDecimalPlaces(step));
      s.innerHTML = parseFloat(value).toString(); 
      return prevValue + (max - min) / (this.nValues - 1);
    }, min);
  }
}
