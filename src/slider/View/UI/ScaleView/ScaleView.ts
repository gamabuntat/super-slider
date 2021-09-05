import EventBinder from 'slider/EventBinder/EventBinder';
import IScaleView from './IScaleView';

abstract class ScaleView extends EventBinder {
  protected size!: number
  protected labelSize = 0
  protected buttons: HTMLElement[] = []
  private container!: HTMLElement
  private hiddenMod: string
  private buttonClass: string
  private buttonHiddenMod: string
  private labelClass: string
  private lastPosition = 0
  private resizeObserver: ResizeObserver
  private timer!: ReturnType<typeof setTimeout>
  private delay = 100
  private prevN = 0

  constructor(component: HTMLElement) {
    super(component);
    this.container = this.getContainer();
    this.component.innerHTML = '';
    this.component.insertAdjacentElement('beforeend', this.container);
    this.updateSize();
    this.hiddenMod = this.getElemClass('--hidden');
    this.buttonClass = this.getElemClass('-button');
    this.buttonHiddenMod = this.getElemClass('-button--hidden');
    this.labelClass = this.getElemClass('-label');
    this.resizeObserver = new ResizeObserver(this.handleScaleResize);
    this.bindListeners();
  }

  update(absolutePositions: number[]): void {
    if (this.component.classList.contains(this.hiddenMod)) { return; }
    this.resetSizes();
    this.container.innerHTML = '';
    this.buttons = absolutePositions.map((ap) => {
      const b = this.getButton(ap);
      this.container.insertAdjacentElement('beforeend', b);
      this.setLabelSize(b);
      this.setAttrSize(b);
      this.toggleButtonHiddenMod(b);
      return b;
    });
    this.prevN = this.getN();
    this.restoreUsability(this.prevN - 2, [this.buttons.slice(1, -1)]);
    this.showExtremeButtons();
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  toggleHiddenMode(): void {
    this.component.classList.toggle(this.hiddenMod);
  }

  private resetSizes(): void {
    this.component.style.width = '';
    this.component.style.height = '';
  }

  private getElemClass(postfix: string): string {
    return `${
      (this.component.classList[0] || '').replace(/--.*/, '')
    }${postfix}`;
  }

  protected unbindListeners(): void {
    this
      .unbind('click', this.handleScaleClick)
      .resizeObserver.unobserve(this.component);
    window.removeEventListener('load', this.handleWindowLoad);
  }

  private bindListeners(): void {
    this
      .bind('click', this.handleScaleClick)
      .resizeObserver.observe(this.component);
    window.addEventListener('load', this.handleWindowLoad);
  }

  private getN(): number {
    return Math.min(
      this.buttons.length,
      Math.floor(this.size / this.labelSize) || 0
    );
  }

  private handleScaleClick = (e: MouseEvent): void => {
    const button = (<HTMLElement>e.target).closest(`.${this.buttonClass}`);
    if (button) {
      this.lastPosition =  Number(button.getAttribute('data-position'));
    }
  }

  private handleScaleResize = (): void => {
    if (this.component.classList.contains(this.hiddenMod)) { return; }
    this.updateSize();
    const n = this.getN();
    if (n !== this.prevN) {
      this.prevN = n;
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => (
          this.hideButtons(),
          (() => (
            this.restoreUsability(this.prevN - 2, [this.buttons.slice(1, -1)])
          ))(),
          this.showExtremeButtons()
        ),
        this.delay
      );
    }
  }

  private handleWindowLoad = (): void => {
    this.resetSizes();
    this.buttons.forEach(this.setAttrSize, this);
  }

  private restoreUsability(
    n: number, halves: HTMLElement[][] = [this.buttons]
  ): void {
    if (n <= 0) { return; }
    const newHalves = [];
    let newN = n;
    let idx = 0;
    while (idx < halves.length / 2) {
      const leftSide = halves[idx];
      const lCenter = Math.floor(leftSide.length / 2);
      this.toggleButtonHiddenMod(leftSide[lCenter]);
      newN -= 1;
      if (newN <= 0) { return; }
      if (leftSide.length > 1) { newHalves.push(leftSide.slice(0, lCenter)); }
      if (leftSide.length > 2) { newHalves.push(leftSide.slice(lCenter + 1)); }
      const rightSide = halves[halves.length - 1 - idx];
      const rCenter = Math.floor(rightSide.length / 2);
      if (idx != halves.length - 1 - idx) {
        this.toggleButtonHiddenMod(rightSide[rCenter]);
        newN -= 1;
        if (newN <= 0) { return; }
        if (rightSide.length > 1) {
          newHalves.push(rightSide.slice(0, rCenter)); 
        }
        if (rightSide.length > 2) {
          newHalves.push(rightSide.slice(rCenter + 1)); 
        }
      }
      idx += 1;
    }
    this.restoreUsability(newN, newHalves);
  }

  private showExtremeButtons(): void {
    if (this.prevN >= 1) { this.toggleButtonHiddenMod(this.buttons[0]); }
    if (this.prevN >= 2) {
      this.toggleButtonHiddenMod(this.buttons[this.buttons.length - 1]); 
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

  private getContainer(): HTMLElement {
    const c = document.createElement('div');
    c.classList.add(this.getElemClass('-container'));
    return c;
  }

  private hideButtons(): void {
    this.buttons.forEach((b) => b.classList.add(this.buttonHiddenMod));
  }

  private toggleButtonHiddenMod(button: HTMLElement): void {
    button.classList.toggle(this.buttonHiddenMod);
  }

  abstract swap(): IScaleView

  protected abstract updateSize(): void

  protected abstract setLabelSize(button: HTMLElement): void

  protected abstract setAttrSize(button: HTMLElement): void
}

class HorizontalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new VerticalScaleView(this.component);
  }

  protected updateSize(): void  {
    this.size = this.component.getBoundingClientRect().width;
  }

  protected setLabelSize(button: HTMLElement): void {
    this.labelSize = Math.max(
      button.children[0].getBoundingClientRect().width,
      this.labelSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.height = `${Math.max(
      parseFloat(getComputedStyle(this.component).height),
      button.children[0].getBoundingClientRect().height
    )}px`;
  }
}

class VerticalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new HorizontalScaleView(this.component);
  }

  protected updateSize(): void {
    this.size = this.component.getBoundingClientRect().height;
  }

  protected setLabelSize(button: HTMLElement): void {
    this.labelSize = Math.max(
      button.children[0].getBoundingClientRect().height,
      this.labelSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.width = `${Math.max(
      parseFloat(getComputedStyle(this.component).width),
      button.children[0].getBoundingClientRect().width
    )}px`;
  }
}
export { HorizontalScaleView, VerticalScaleView };

