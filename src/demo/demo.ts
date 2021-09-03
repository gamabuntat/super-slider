import './demo.sass';

interface IConf {
  init(o: IOptions): void
}

class Conf implements IConf {
  private $slider: JQuery
  private inputs: HTMLInputElement[]
  private intervalInput: HTMLInputElement
  private toInput: HTMLInputElement

  constructor(private root: HTMLElement) {
    this.$slider = this.getJqueryElement('.js-slider');
    this.inputs = [...this.getInputs('input')];
    this.intervalInput = this.getInputs('[name="interval"]')[0];
    this.toInput = this.getInputs('[name="to"]')[0];
    this.subscribe();
    this.bindListeners();
  }

  init(o: IOptions) {
    this.$slider.slider(o);
  }

  private subscribe() {
    this.$slider.slider().subscribe(this.handleSliderUpdate);
  }

  private updateSlider(k: string, v: number | boolean) {
    const o: { [k: string]: IOptions[keyof IOptions] } = {};
    o[k] = v;
    this.init(o);
  }

  private handleSliderUpdate = (response: IResponse): void => {
    Object.entries(response).forEach((entr) => {
      const input = this.inputs.find((i) => i.dataset.name === entr[0]);
      if (!input) { return; }
      if (typeof entr[1] == 'number') { input.value = String(entr[1]); }
      if (typeof entr[1] == 'boolean') { input.checked = entr[1]; }
    });
    this.handleIntervalInputChange();
    this.toggleRootVerticalMod(response.isVertical);
  }

  private bindListeners(): void {
    const containers = this.root.querySelectorAll('.conf__container');
    containers[0].addEventListener('change', this.handleNumericsChange);
    containers[1].addEventListener('change', this.handleSwithesChange);
    this.intervalInput
      .addEventListener('change', this.handleIntervalInputChange);
  }

  private handleNumericsChange = (e: Event): void => {
    const target = <HTMLInputElement>e.target;
    this.updateSlider(target.name, +target.value);
  }

  private handleSwithesChange = (e: Event): void => {
    const target = <HTMLInputElement>e.target;
    this.updateSlider(
      target.dataset.name || '', 
      target.checked
    );
  }

  private handleIntervalInputChange = (): void => {
    this.toInput.disabled = !this.intervalInput.checked;
  }

  private toggleRootVerticalMod(flag: boolean): void {
    flag 
      ? this.root.classList.add('container_vertical')
      : this.root.classList.remove('container_vertical');
  }

  private getJqueryElement(selector: string): JQuery {
    return $(this.root).find(selector);
  }

  private getInputs(selector: string): NodeListOf<HTMLInputElement> {
    return this.root.querySelectorAll(selector);
  }
}

const options: IOptions[] = [
  {
    step: 1.333, max: 10.01, min: -1, isInterval: true
  },
  {
    isVertical: true, max: 2.2
  },
  {
    max: 9.001
  },
  {
    isInterval: true, isVertical: true, min: -10, max: 100, step: 2,
  },
];

document
  .querySelectorAll<HTMLElement>('.js-container')
  .forEach((c, idx) => new Conf(c).init(options[idx]));

