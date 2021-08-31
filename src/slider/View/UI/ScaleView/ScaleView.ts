import { IAllPositions } from 'slider/View/Config/IConfig';
import EventBinder from 'slider/EventBinder/EventBinder';
import IScaleView from './IScaleView';

abstract class ScaleView extends EventBinder {
  protected scaleSize = 0
  protected lableSize = 0
  protected buttons: HTMLElement[] = []
  private hiddenMod: string
  private buttonClass: string
  private buttonHiddenMod: string
  private labelClass: string
  private lastPosition = 0
  private resizeObserver: ResizeObserver
  private timer!: ReturnType<typeof setTimeout>
  private delay = 200
  private prevN = 0

  constructor(component: HTMLElement) {
    super(component);
    this.hiddenMod = this.getElemClass('-hidden');
    this.buttonClass = this.getElemClass('button');
    this.buttonHiddenMod = this.getElemClass('button--hidden');
    this.labelClass = this.getElemClass('label');
    this.resizeObserver = new ResizeObserver(this.handleScaleResize);
    this.bindListeners();
  }

  update({ absolutePositions }: IAllPositions): void {
    if (this.component.classList.contains(this.hiddenMod)) { return; }
    this.component.innerHTML = '';
    this.buttons = absolutePositions.map((ap) => {
      const button = this.getButton(ap);
      this.component.appendChild(button);
      this.setLableSize(button);
      return button;
    });
    this.prevN = this.getN();
    // this.restoreUsability(this.prevN);
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  private getElemClass(postfix: string): string {
    return `${this.component.classList[0].replace(/--.*/, '')}-${postfix}`;
  }

  protected unbindListeners(): void {
    this
      .unbind('click', this.handleScaleClick)
      .resizeObserver.unobserve(this.component);
  }

  private bindListeners(): void {
    this
      .bind('click', this.handleScaleClick)
      .resizeObserver.observe(this.component);
  }

  private getN(): number {
    return Math.min(
      this.buttons.length,
      Math.floor(this.scaleSize / this.lableSize) || 0
    );
  }

  private handleScaleClick = (e: MouseEvent): void => {
    const button = (<HTMLElement>e.target).closest(`.${this.buttonClass}`);
    if (button) {
      this.lastPosition =  Number(button.getAttribute('data-position'));
    }
  }

  private handleScaleResize = (entrs: ResizeObserverEntry[]): void => {
    if (this.component.classList.contains(this.hiddenMod)) { return; }
    this.updateScaleSize(entrs[0]);
    const n = this.getN();
    // if (n !== this.prevN) {
    //   this.prevN = n;
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(
    //     () => this.restoreUsability(n),
    //     this.delay
    //   );
    // }
  }

  private restoreUsability = (
    n: number, halves: HTMLElement[][] = [this.buttons]
  ): void => {
    if (n <= 0) { return; }
    const newHalves = [];
    let newN = n;
    let idx = 0;
    do {
      const leftSide = halves[idx];
      const lCenter = Math.floor(leftSide.length / 2);
      leftSide[lCenter]
    } while (idx < halves.length / 2)
  }

  private getButton(ap: number): HTMLElement {
    const b = document.createElement('button');
    b.classList.add(this.buttonClass);
    b.dataset.position = String(ap);
    this.toggleButtonHiddenMod(b);
    const label = document.createElement('span');
    label.classList.add(this.labelClass);
    label.innerText = String(ap);
    b.insertAdjacentElement('beforeend', label);
    return b;
  }

  private toggleButtonHiddenMod(button: HTMLElement): void {
    button.classList.toggle(this.buttonHiddenMod);
  }

  abstract swap(): IScaleView

  protected abstract updateScaleSize(entr: ResizeObserverEntry): void

  protected abstract setLableSize(button: HTMLElement): void
}

class HorizontalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new VerticalScaleView(this.component);
  }

  protected updateScaleSize(entr: ResizeObserverEntry): void  {
    this.scaleSize = entr.contentRect.width;
  }

  protected setLableSize(button: HTMLElement): void {
    this.lableSize = Math.max(
      button.children[0].getBoundingClientRect().width,
      this.lableSize
    );
  }
}

class VerticalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new HorizontalScaleView(this.component);
  }

  protected updateScaleSize(entr: ResizeObserverEntry): void {
    this.scaleSize = entr.contentRect.height;
  }

  protected setLableSize(button: HTMLElement): void {
    this.lableSize = Math.max(
      button.children[0].getBoundingClientRect().height,
      this.lableSize
    );
  }
}
export { HorizontalScaleView, VerticalScaleView };

