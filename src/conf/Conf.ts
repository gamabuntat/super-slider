interface IConf {
  init(o: IOptions): void;
}

class Conf implements IConf {
  private $slider: JQuery;
  private inputs: HTMLInputElement[];
  private intervalInput: HTMLInputElement;
  private toInput: HTMLInputElement;
  private fromInput: HTMLInputElement;

  constructor(private root: HTMLElement) {
    this.$slider = this.getJqueryElement('.js-conf__slider');
    this.inputs = [...this.getInputs('input')];
    [this.intervalInput] = this.getInputs('[name="interval"]');
    [this.toInput] = this.getInputs('[name="to"]');
    [this.fromInput] = this.getInputs('[name="from"]');
    this.subscribe();
    this.bindListeners();
  }

  init(o: IOptions): void {
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
    Object.entries(response).forEach(([key, value]) => {
      if (key === 'step') {
        this.updateStepAttr(value);
      }
      if (key === 'min') {
        this.updateMinAttr(value);
      }
      const input = this.inputs.find((i) => i.dataset.name === key);
      if (!input) {
        return;
      }
      if (typeof value === 'number') {
        input.value = String(value);
      }
      if (typeof value === 'boolean') {
        input.checked = value;
      }
    });
    this.handleIntervalInputChange();
    this.toggleRootVerticalMod(response.isVertical);
  };

  private updateStepAttr(step: number): void {
    this.toInput.step = String(step);
    this.fromInput.step = String(step);
  }

  private updateMinAttr(min: number): void {
    this.toInput.min = String(min);
    this.fromInput.min = String(min);
  }

  private bindListeners(): void {
    const containers = this.root.querySelectorAll('.conf__container');
    containers[0].addEventListener('change', this.handleNumericsChange);
    containers[1].addEventListener('change', this.handleSwithesChange);
    this.intervalInput.addEventListener(
      'change',
      this.handleIntervalInputChange
    );
  }

  private handleNumericsChange = (e: Event): void => {
    const target = <HTMLInputElement>e.target;
    this.updateSlider(target.name, Number(target.value));
  };

  private handleSwithesChange = (e: Event): void => {
    const target = <HTMLInputElement>e.target;
    this.updateSlider(target.dataset.name || '', target.checked);
  };

  private handleIntervalInputChange = (): void => {
    this.toInput.disabled = !this.intervalInput.checked;
  };

  private toggleRootVerticalMod(flag: boolean): void {
    if (flag) {
      this.root.classList.add('conf_vertical');
      return;
    }
    this.root.classList.remove('conf_vertical');
  }

  private getJqueryElement(selector: string): JQuery {
    return $(this.root).find(selector);
  }

  private getInputs(selector: string): NodeListOf<HTMLInputElement> {
    return this.root.querySelectorAll(selector);
  }
}

export default Conf;
