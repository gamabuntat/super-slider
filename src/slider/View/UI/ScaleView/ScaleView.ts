import EventBinder from 'slider/EventBinder/EventBinder';
import isEven from 'helpers/isEven';
import IScaleView from './IScaleView';

abstract class ScaleView extends EventBinder {
  protected buttonSize = 0
  // protected buttons: HTMLCollectionOf<Element>
  protected buttons: HTMLElement[] = []
  private container!: HTMLElement
  private hiddenMod: string
  private buttonClass: string
  private buttonHiddenMod: string
  private lastPosition = 0
  private resizeObserver: ResizeObserver
  private timer!: ReturnType<typeof setTimeout>
  private delay = 100
  private ap: number[] = []
  private nButtons = 0

  constructor(component: HTMLElement) {
    super(component);
    this.container = this.getContainer();
    this.component.innerHTML = '';
    this.component.insertAdjacentElement('beforeend', this.container);
    this.hiddenMod = this.getElemClass('--hidden');
    this.buttonClass = this.getElemClass('-button');
    this.buttonHiddenMod = this.getElemClass('-button--hidden');
    this.resizeObserver = new ResizeObserver(this.handleScaleResize);
    // this.buttons = this.findButtons();
    this.bindListeners();
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  toggleHiddenMode(): void {
    this.component.classList.toggle(this.hiddenMod);
  }

  update(absolutePositions: number[]): void {
    this.ap = absolutePositions;
    this.setMaxSizes();
    this.nButtons = this.getNButtons();
    console.log(this.ap);
    console.log(this.nButtons);
    console.log(this.getUsefullAP(this.nButtons).sort(this.sort));
    console.log('\n');

    // if (this.component.classList.contains(this.hiddenMod)) { return; }
    // this.resetSizes();
    // this.container.innerHTML = '';
    // this.buttons = absolutePositions.map((ap) => {
    //   const b = this.getButton(ap);
    //   this.container.insertAdjacentElement('beforeend', b);
    //   this.setLabelSize(b);
    //   this.setAttrSize(b);
    //   this.toggleButtonHiddenMod(b);
    //   return b;
    // });
    // this.prevN = this.getN();
    // this.restoreUsability(this.prevN - 2, [this.buttons.slice(1, -1)]);
    // this.showExtremeButtons();
  }

  private setMaxSizes() {
    this.unsetContainerSizes();
    this.ap.slice(0, 2).concat(this.ap.slice(-2)).forEach((ap) => {
      const b = this.getButton();
      b.innerHTML = String(ap);
      this.container.insertAdjacentElement('beforeend', b);
      this.setButtonSize(b);
      this.setAttrSize(b);
      b.remove();
    });
    this.removeContainerAttrSizes();
  }

  private removeAttrSizes(): void {
    this.component.style.width = '';
    this.component.style.height = '';
  }

  private removeContainerAttrSizes(): void {
    this.container.style.width = '';
    this.container.style.height = '';
  }

  private unsetContainerSizes(): void {
    this.container.style.width = 'unset';
    this.container.style.height = 'unset';
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
  }

  private bindListeners(): void {
    this
      .bind('click', this.handleScaleClick)
      .resizeObserver.observe(this.component);
  }

  private getNButtons(
    n = this.ap.length, depth = 0, max = this.getMaxNButtons()
  ): number {
    const intervals = 2 ** depth;
    const npi = n / intervals;
    if (npi < 1) { return this.ap.length - n; }
    const points = (isEven(npi) ? 2 : 1) * intervals;
    const newN = n - points;
    if (newN < 0 || this.ap.length - newN > max) { return this.ap.length - n; }
    return this.getNButtons(newN, depth + 1, max);
  }

  private getMaxNButtons(): number {
    return Math.min(
      Math.floor(this.getSize() / this.buttonSize),
      this.ap.length
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
    // this.updateSize();
    // const n = this.getN();
    // if (n !== this.prevN) {
    //   this.prevN = n;
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(
    //     () => (
    //       this.hideButtons(),
    //       this.restoreUsability(this.prevN - 2, [this.buttons.slice(1, -1)]),
    //       this.showExtremeButtons()
    //     ),
    //     this.delay
    //   );
    // }
  }

  private getUsefullAP(
    n: number, ap = [this.ap], result: number[] = []
  ): number[] {
    if (n <= 0) { return result; }
    let nextN = n;
    let nextResult: number[] = [ ...result ];
    const points = isEven(ap[0].length) ? 2 : 1;
    const nextAP = ap.reduce((next, aps) => {
      const leftPoint = Math.floor((aps.length - 1) / 2);
      const leftHalf = aps.slice(0, leftPoint);
      const rightPoint = Math.ceil((aps.length - 1) / 2);
      const rightHalf = aps.slice(rightPoint + 1);
      next.push(leftHalf, rightHalf);
      const resultPart = aps.slice(leftPoint, rightPoint + 1);
      nextResult = nextResult.concat(resultPart);
      nextN -= points;
      return next;
    }, [] as number[][]);
    return this.getUsefullAP(nextN, nextAP, nextResult);
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
    // if (this.prevN >= 1) { this.toggleButtonHiddenMod(this.buttons[0]); }
    // if (this.prevN >= 2) {
    //   this.toggleButtonHiddenMod(this.buttons[this.buttons.length - 1]); 
    // }
  }

  private getButton(): HTMLElement {
    const b = document.createElement('button');
    b.classList.add(this.buttonClass);
    return b;
  }

  private getContainer(): HTMLElement {
    const c = document.createElement('div');
    c.classList.add(this.getElemClass('-container'));
    return c;
  }

  private findButtons(): HTMLCollectionOf<Element> {
    return this.component.getElementsByClassName(this.buttonClass);
  }

  private hideButtons(): void {
    this.buttons.forEach((b) => b.classList.add(this.buttonHiddenMod));
  }

  private toggleButtonHiddenMod(button: HTMLElement): void {
    button.classList.toggle(this.buttonHiddenMod);
  }

  abstract swap(): IScaleView

  protected abstract getSize(): number

  protected abstract setButtonSize(button: HTMLElement): void

  protected abstract setAttrSize(button: HTMLElement): void

  protected abstract sort(a: number, b: number): number
}

class HorizontalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new VerticalScaleView(this.component);
  }

  protected getSize(): number  {
    return this.component.getBoundingClientRect().width;
  }

  protected setButtonSize(button: HTMLElement): void {
    this.buttonSize = Math.max(
      button.getBoundingClientRect().width,
      this.buttonSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.height = `${Math.max(
      parseFloat(getComputedStyle(this.component).height),
      button.getBoundingClientRect().height
    )}px`;
  }

  protected sort(a: number, b: number): number {
    return a - b;
  }
}

class VerticalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new HorizontalScaleView(this.component);
  }

  protected getSize(): number {
    return this.component.getBoundingClientRect().height;
  }

  protected setButtonSize(button: HTMLElement): void {
    this.buttonSize = Math.max(
      button.getBoundingClientRect().height,
      this.buttonSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.width = `${Math.max(
      parseFloat(getComputedStyle(this.component).width),
      button.getBoundingClientRect().width
    )}px`;
  }

  protected sort(a: number, b: number): number {
    return b - a;
  }
}
export { HorizontalScaleView, VerticalScaleView };

