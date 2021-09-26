/* eslint-disable */
import EventBinder from 'slider/EventBinder/EventBinder';

import IScaleView from './IScaleView';

abstract class ScaleView extends EventBinder {
  protected buttonSize = 0
  protected buttons: HTMLCollectionOf<Element>
  protected ap: number[] = []
  private container: HTMLElement
  private hiddenMod: string
  private buttonClass: string
  private labelClass: string
  private buttonHiddenMod: string
  private lastPosition = 0
  private resizeObserver: ResizeObserver
  private step = 0
  private timer!: ReturnType<typeof setTimeout>
  private delay = 100
  private nButtons = 0

  constructor(component: HTMLElement) {
    super(component);
    this.component.innerHTML = '';
    this.hiddenMod = this.getElemClass('--hidden');
    this.buttonClass = this.getElemClass('-button');
    this.buttonHiddenMod = this.getElemClass('-button--hidden');
    this.labelClass = this.getElemClass('-label');
    this.container = this.getContainer();
    this.component.insertAdjacentElement('beforeend', this.container);
    this.resizeObserver = new ResizeObserver(this.handleScaleResize);
    this.buttons = this.findButtons();
    this.bindListeners();
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  toggleHiddenMode(): void {
    this.component.classList.toggle(this.hiddenMod);
  }

  update(absolutePositions: number[]): void {
    this.setAP(absolutePositions);
    this.restoreUsability();
  }

  protected unbindListeners(): void {
    this
      .unbind('click', this.handleScaleClick)
      .resizeObserver.unobserve(this.component);
  }

  private restoreUsability() {
    this.container.innerHTML = '';
    this.setMaxSizes();
    this.setNButtons();
    this.setStep();
    const selectedAP = this.selectAP();
    const lastSelectedAP = selectedAP[selectedAP.length - 1];
    const lastAP = this.ap[this.ap.length - 1];
    const size = (this.ap.length - this.ap.lastIndexOf(lastSelectedAP))
      / 2 / this.step;
    if (lastSelectedAP !== lastAP) {
      this.resizeButton(size);
      this.insertButton(this.createButton(lastAP));
      this.resizeButton(size);
      return;
    }
    const penultimateButton = this.buttons[this.buttons.length - 2];
    if (penultimateButton instanceof HTMLElement && selectedAP.length > 2) {
      this.resizeButton(size, penultimateButton);
    }
    this.resizeButton(size);
  }

  private setMaxSizes() {
    const b = this.getButton();
    const label = document.createElement('span');
    b.insertAdjacentElement('beforeend', label);
    this.insertButton(b);
    this.ap.slice(0, 2).concat(this.ap.slice(-2)).forEach((ap) => {
      label.textContent = String(ap);
      this.setButtonSize(label);
      this.setAttrSize(label);
    });
    b.remove();
  }

  private setNButtons(): void {
    this.nButtons = Math.min(
      Math.floor(this.getSize() / (this.buttonSize) || 0),
      this.ap.length
    );
  }

  private setStep() {
    this.step = Math.ceil(this.ap.length / this.nButtons);
  }

  private selectAP(idx = 0, res: number[] = []): number[] {
    if (this.ap.length - 1 < idx) { return res; }
    res.push(this.ap[idx]);
    this.insertButton(this.createButton(res[res.length - 1]));
    return this.selectAP(idx + this.step, res);
  }

  private bindListeners(): void {
    this
      .bind('click', this.handleScaleClick);
      // .resizeObserver.observe(this.component);
  }

  private handleScaleClick = (e: MouseEvent): void => {
    const button = (<HTMLElement>e.target).closest(`.${this.buttonClass}`);
    if (button) {
      this.lastPosition =  Number(button.getAttribute('data-position'));
    }
  }

  private handleScaleResize = (): void => {
    if (this.component.classList.contains(this.hiddenMod)) { return; }
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => (
        this.restoreUsability()
      ),
      this.delay
    );
  }

  private createButton(ap: number): HTMLElement {
    const b = this.getButton();
    const label = this.getLabel();
    const sap = String(ap);
    label.textContent = sap;
    b.dataset.position = sap;
    b.insertAdjacentElement('beforeend', label);
    return b;
  }

  private insertButton(b: HTMLElement): void {
    this.container.insertAdjacentElement('beforeend', b);
  }

  private resizeButton(value: number, btn = this.getLastButton()): void {
    btn.style.flexBasis = `${value * 100}%`;
  }

  private getLastButton(): HTMLElement {
    return this.buttons[this.buttons.length - 1] as HTMLElement;
  }

  private removeAttrSizes(): void {
    this.component.style.width = '';
    this.component.style.height = '';
  }

  private getElemClass(postfix: string): string {
    return `${
      (this.component.classList[0] || '').replace(/--.*/, '')
    }${postfix}`;
  }

  private getContainer(): HTMLElement {
    const c = document.createElement('div');
    c.classList.add(this.getElemClass('-container'));
    return c;
  }

  private getButton(): HTMLElement {
    const b = document.createElement('button');
    b.classList.add(this.buttonClass);
    return b;
  }

  private getLabel(): HTMLElement {
    const label = document.createElement('span');
    label.classList.add(this.labelClass);
    return label;
  }

  private findButtons(): HTMLCollectionOf<Element> {
    return this.component.getElementsByClassName(this.buttonClass);
  }

  abstract swap(): IScaleView

  protected abstract getSize(): number

  protected abstract setButtonSize(button: HTMLElement): void

  protected abstract setAttrSize(button: HTMLElement): void

  protected abstract setAP(ap: number[]): void
}

class HorizontalScaleView extends ScaleView implements IScaleView {
  swap(): IScaleView {
    this.unbindListeners();
    return new VerticalScaleView(this.component);
  }

  protected getSize(): number  {
    return this.component.getBoundingClientRect().width;
  }

  protected setButtonSize(elem: HTMLElement): void {
    this.buttonSize = Math.max(
      elem.getBoundingClientRect().width * 2,
      this.buttonSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.height = `${Math.max(
      parseFloat(getComputedStyle(this.component).height),
      button.getBoundingClientRect().height
    )}px`;
  }

  protected setAP(ap: number[]): void {
    this.ap = ap;
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

  protected setButtonSize(elem: HTMLElement): void {
    this.buttonSize = Math.max(
      elem.getBoundingClientRect().height * 2,
      this.buttonSize
    );
  }

  protected setAttrSize(elem: HTMLElement): void {
    this.component.style.width = `${Math.max(
      parseFloat(getComputedStyle(this.component).width),
      elem.getBoundingClientRect().width
    )}px`;
  }

  protected setAP(ap: number[]): void {
    this.ap = ap.reverse();
  }
}
export { HorizontalScaleView, VerticalScaleView };

