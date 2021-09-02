import './demo.sass';

interface IConf {
  init(o: IOptions): void
}

class Conf implements IConf {
  private $slider: JQuery
  private min: HTMLElement
  private max: HTMLElement
  private step: HTMLElement
  private from: HTMLElement
  private to: HTMLElement
  private interval: HTMLElement
  private vertical: HTMLElement
  private labels: HTMLElement
  private scale: HTMLElement

  constructor(private root: HTMLElement) {
    console.log(this.root);
    this.$slider = this.getJqueryElement('.js-slider');
    const [min, max, step, from, to] = this
      .getJqueryElement('.conf__numeric-input');
    this.min = min;
    this.max = max;
    this.step = step;
    this.from = from;
    this.to = to;
    const [interval, vertical, labels, scale] = this
      .getJqueryElement('.conf__switches-input');
    this.interval = interval;
    this.vertical = vertical;
    this.labels = labels;
    this.scale = scale;
    this.subscribe();
    this.bindListeners();
  }

  init(o: IOptions) {
    this.$slider.slider(o);
  }

  private subscribe() {
    this.$slider.slider().subscribe(this.handleSliderUpdate);
  }

  private handleSliderUpdate = (response: IResponse): void => {
    console.log(response);
  }

  private bindListeners(): void {
    this.root.addEventListener('change', this.hanldeRootChange);
  }

  private hanldeRootChange = (e: Event): void => {
    const target = <HTMLInputElement>e.target;
    console.log(target.name);
  }

  private getJqueryElement(selector: string): JQuery {
    return $(this.root).find(selector);
  }
}

const options: IOptions[] = [
  {
    step: 2.123, max: -32, min: -74, isInterval: true, from: -52.77
  },
  {
    isVertical: true, max: 2.2
  },
  {},
  {
    isInterval: true, isVertical: true, min: -10, max: 100, step: 2,
  },
];

document
  .querySelectorAll<HTMLElement>('.container')
  .forEach((c, idx) => new Conf(c).init(options[idx]));

