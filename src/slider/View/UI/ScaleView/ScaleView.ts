import EventBinder from 'slider/EventBinder/EventBinder';
import getLastItem from 'helpers/getLastItem';

import IScaleView from './IScaleView';

abstract class ScaleView extends EventBinder {
  protected buttonSize = 0
  protected ap: number[] = []
  private buttons: HTMLCollectionOf<Element>
  private container: HTMLElement
  private hiddenMod: string
  private buttonClass: string
  private labelClass: string
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
    this.nullifyButtonSize();
    this.removeAttrSizes();
    this.setMaxSizes();
    this.setNButtons();
    this.setStep();
    const size = this.getRelativeSize(getLastItem(this.selectAP()));
    this.insertButton(this.createButton(getLastItem(this.ap)));
    [...this.buttons].slice(-2).forEach((b) => {
      if (b instanceof HTMLElement) { this.resizeButton(b, size); }
    });
  }

  private setMaxSizes(): void {
    this.ap.slice(-2).forEach((ap) => {
      const b = this.createButton(ap);
      this.insertButton(b);
      this.setButtonSize(b);
      this.setAttrSize(b);
      b.remove();
    });
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

  private selectAP(
    ap = this.ap.slice(0, -this.step), idx = 0, res: number[] = []
  ): number[] {
    if (idx > ap.length - 1) { return res; }
    res.push(ap[idx]);
    this.insertButton(this.createButton(getLastItem(res)));
    return this.selectAP(ap, idx + this.step, res);
  }

  private getRelativeSize(ap: number): number {
    return (this.ap.length - 1 - this.ap.lastIndexOf(ap)) / 2 / this.step;
  }

  private bindListeners(): void {
    this
      .bind('click', this.handleScaleClick)
      .resizeObserver.observe(this.component);
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

  private resizeButton(btn: HTMLElement, value: number): void {
    btn.style.flexBasis = `${value * 100}%`;
  }

  private nullifyButtonSize(): void {
    this.buttonSize = 0;
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

  protected setButtonSize(button: HTMLElement): void {
    this.buttonSize = Math.max(
      button.children[0].getBoundingClientRect().width * 1.5,
      this.buttonSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.height = `${Math.max(
      parseFloat(getComputedStyle(this.component).height),
      button.children[0].getBoundingClientRect().height
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

  protected setButtonSize(button: HTMLElement): void {
    this.buttonSize = Math.max(
      button.children[0].getBoundingClientRect().height * 2,
      this.buttonSize
    );
  }

  protected setAttrSize(button: HTMLElement): void {
    this.component.style.width = `${Math.max(
      parseFloat(getComputedStyle(this.component).width),
      button.children[0].getBoundingClientRect().width
    )}px`;
  }

  protected setAP(ap: number[]): void {
    this.ap = ap.reverse();
  }
}
export { HorizontalScaleView, VerticalScaleView };

