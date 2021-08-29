import { IAllPositions } from 'slider/View/Config/IConfig';
import EventBinder from 'slider/EventBinder/EventBinder';
import IScaleView from './IScaleView';

class ScaleView extends EventBinder implements IScaleView {
  private buttonClass: string
  private labelClass: string
  private lastPosition = 0
  private resizeObserver: ResizeObserver
  private buttons: HTMLElement[] = []

  constructor(component: HTMLElement) {
    super(component);
    this.buttonClass = this.getElemClass('button');
    this.labelClass = this.getElemClass('label');
    this.resizeObserver = this.getResizeObserver();
    this.bindListeners();
  }

  update({ absolutePositions }: IAllPositions): void {
    this.component.innerHTML = '';
    this.buttons = absolutePositions.map((ap) => {
      const button = this.getButton(ap);
      this.component.appendChild(button);
      return button;
    });
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  private getElemClass(postfix: string): string {
    return `${this.component.classList[0].replace(/--.*/, '')}-${postfix}`;
  }

  private getResizeObserver(): ResizeObserver {
    return new ResizeObserver(this.handleScaleResize);
  }

  private bindListeners(): void {
    this
      .bind('click', this.handleScaleClick)
      .resizeObserver.observe(this.component);
  }

  private handleScaleResize = (entr: ResizeObserverEntry[]): void => {
    console.log(entr[0].target);
  }

  private handleScaleClick = (e: MouseEvent): void => {
    const button = (<HTMLElement>e.target).closest(`.${this.buttonClass}`);
    if (button) {
      this.lastPosition =  Number(button.getAttribute('data-position'));
    }
  }

  private getButton(ap: number): HTMLElement {
    const b = document.createElement('button');
    b.classList.add(this.buttonClass);
    b.dataset.position = String(ap);
    const label = document.createElement('span');
    label.classList.add(this.labelClass);
    label.innerText = String(ap);
    b.insertAdjacentElement('beforeend', label);
    return b;
  }
}

export default ScaleView;

