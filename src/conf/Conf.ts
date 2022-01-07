type Input = HTMLInputElement & { name: keyof Options };

class Conf {
  private $slider!: JQuery;
  private container!: HTMLDivElement;
  private inputs!: Input[];
  private cause!: Input;

  constructor(private root: HTMLElement, o: Options) {
    this.init();
    this.subscribe();
    this.bindListeners();
    this.update(o);
  }

  private init(): void {
    this.$slider = $(this.root).find('.js-conf__slider');
    this.container = this.root.querySelector('.js-conf__input-container')!;
    this.inputs = [...this.root.querySelectorAll('input')] as Input[];
  }

  private update(o: Options): void {
    this.$slider.slider(o);
  }

  private subscribe() {
    this.$slider.slider().subscribe(this.handleSliderUpdate);
  }

  private handleSliderUpdate = (r: Model): void => {
    this.inputs.forEach((i) => {
      i.classList.remove('conf__numeric-input_wrong');
      if (this.isNumerical(i.name)) {
        i.value = String(r[i.name as NumericalKeys]);
        return;
      }
      i.checked = r[i.name as BooleanKeys];
    });
    this.handleIntervalInputChange();
    this.handleVerticalInputChange();
    this.getInputByName('from').step = String(r.step);
    this.getInputByName('from').min = String(r.min);
    this.getInputByName('to').step = String(r.step);
    this.getInputByName('to').min = String(r.min);
    if (r.cancel) {
      this.cause.classList.add('conf__numeric-input_wrong');
    }
  };

  private bindListeners(): void {
    this.container.addEventListener('change', this.handleInputChange);
  }

  private handleInputChange = ({ target }: Event): void => {
    if (target instanceof HTMLInputElement) {
      this.cause = target as Input;
      this.update({
        [target.name]: this.isNumerical(target.name)
          ? parseFloat(target.value)
          : target.checked,
      });
    }
  };

  private handleIntervalInputChange = (): void => {
    this.getInputByName('to').disabled =
      !this.getInputByName('isInterval').checked;
  };

  private handleVerticalInputChange = (): void => {
    if (this.getInputByName('isVertical').checked) {
      this.root.classList.add('conf_vertical');
      return;
    }
    this.root.classList.remove('conf_vertical');
  };

  private getInputByName(name: keyof Options): Input {
    return this.inputs.find((i) => i.name === name)!;
  }

  private isNumerical(name: string): boolean {
    return !name.startsWith('is');
  }
}

export default Conf;
