import EventBinder from 'slider/EventBinder/EventBinder';
import type { AllPositions } from 'slider/View/Config/IConfig';
import getLastItem from 'helpers/getLastItem';

import IScale from './IScale';

abstract class Scale extends EventBinder {
  protected divisionSize = 0;
  protected ap: AllPositions = [];
  private divisions: HTMLCollectionOf<Element>;
  private container: HTMLElement;
  private hiddenMod: string;
  private divisionClass: string;
  private buttonClass: string;
  private lastPosition = 0;
  private resizeObserver: ResizeObserver;
  private step = 0;
  private timer!: ReturnType<typeof setTimeout>;
  private delay = 100;
  private nDivisions = 0;

  constructor(component: HTMLElement) {
    super(component);
    this.component.innerHTML = '';
    this.hiddenMod = this.getElemClass('--hidden');
    this.divisionClass = this.getElemClass('-division');
    this.buttonClass = this.getElemClass('-button');
    this.container = this.getContainer();
    this.component.insertAdjacentElement('beforeend', this.container);
    this.resizeObserver = new ResizeObserver(this.handleScaleResize);
    this.divisions = this.findDivisions();
    this.bindListeners();
  }

  getLastPosition(): number {
    return this.lastPosition;
  }

  toggleHiddenMode(): void {
    this.component.classList.toggle(this.hiddenMod);
  }

  update(absolutePositions: AllPositions): void {
    this.ap = absolutePositions;
    this.restoreUsability();
  }

  protected unbindListeners(): void {
    this.unbind('click', this.handleScaleClick).resizeObserver.unobserve(
      this.component
    );
  }

  private restoreUsability() {
    this.container.innerHTML = '';
    this.nullifyDivisionSize();
    this.removeAttrSizes();
    this.setMaxSizes();
    this.setNDivisions();
    this.setStep();
    const selectedAP = this.selectAP();
    selectedAP.forEach(({ p }) => this.insertDivision(this.createDivision(p)));
    this.insertDivision(this.createDivision(getLastItem(this.ap).p));
    const relativeSize = this.getRelativeSize([
      ...selectedAP,
      getLastItem(this.ap),
    ]);
    [...this.divisions].slice(-2).forEach((d) => {
      if (d instanceof HTMLElement) {
        this.resizeDivision(d, relativeSize);
      }
    });
  }

  private setMaxSizes(): void {
    this.ap
      .slice(-2)
      .concat(this.ap.slice(0, 2))
      .forEach(({ p }) => {
        const division = this.createDivision(p);
        this.insertDivision(division);
        this.setDivisionSize(division);
        this.setAttrSize(division);
        division.remove();
      });
  }

  private setNDivisions(): void {
    this.nDivisions = Math.min(
      Math.floor(this.getSize() / this.divisionSize || 0),
      this.ap.length
    );
  }

  private setStep() {
    this.step = Math.ceil(this.ap.length / this.nDivisions);
  }

  private selectAP(
    idx = 0,
    res: AllPositions = [],
    aps = this.ap.slice(0, -this.step)
  ): AllPositions {
    if (idx > aps.length - 1) {
      return res;
    }
    res.push(aps[idx]);
    return this.selectAP(idx + this.step, res, aps);
  }

  private getRelativeSize(ap: AllPositions): number {
    return (getLastItem(ap).idx - ap[ap.length - 2].idx) / ap[1].idx / 2;
  }

  private bindListeners(): void {
    this.bind('click', this.handleScaleClick).resizeObserver.observe(
      this.component
    );
  }

  private handleScaleClick = (e: MouseEvent): void => {
    const button = (<HTMLElement>e.target).closest(`.${this.buttonClass}`);
    if (!button) {
      e.stopImmediatePropagation();
      return;
    }
    this.lastPosition = Number(button.getAttribute('data-position'));
  };

  private handleScaleResize = (): void => {
    if (this.component.classList.contains(this.hiddenMod)) {
      return;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.restoreUsability(), this.delay);
  };

  private createDivision(ap: number): HTMLElement {
    const division = this.getDivision();
    const b = this.getButton();
    const sap = String(ap);
    b.dataset.position = sap;
    b.textContent = sap;
    division.insertAdjacentElement('beforeend', b);
    return division;
  }

  private insertDivision(division: HTMLElement): void {
    this.container.insertAdjacentElement('beforeend', division);
  }

  private resizeDivision(division: HTMLElement, value: number): void {
    division.style.flexBasis = `${value * 100}%`;
  }

  private nullifyDivisionSize(): void {
    this.divisionSize = 0;
  }

  private removeAttrSizes(): void {
    this.component.style.width = '';
    this.component.style.height = '';
  }

  private getElemClass(postfix: string): string {
    return `${(this.component.classList[0] || '').replace(
      /--.*/,
      ''
    )}${postfix}`;
  }

  private getContainer(): HTMLElement {
    const c = document.createElement('div');
    c.classList.add(this.getElemClass('-container'));
    return c;
  }

  private getDivision(): HTMLElement {
    const division = document.createElement('div');
    division.classList.add(this.divisionClass);
    return division;
  }

  private getButton(): HTMLElement {
    const b = document.createElement('button');
    b.classList.add(this.buttonClass);
    return b;
  }

  private findDivisions(): HTMLCollectionOf<Element> {
    return this.component.getElementsByClassName(this.divisionClass);
  }

  abstract swap(): IScale;

  protected abstract getSize(): number;

  protected abstract setDivisionSize(button: HTMLElement): void;

  protected abstract setAttrSize(button: HTMLElement): void;
}

class HorizontalScale extends Scale implements IScale {
  swap(): IScale {
    this.unbindListeners();
    return new VerticalScale(this.component);
  }

  protected getSize(): number {
    return this.component.getBoundingClientRect().width;
  }

  protected setDivisionSize(division: HTMLElement): void {
    this.divisionSize = Math.max(
      division.children[0].getBoundingClientRect().width * 1.5,
      this.divisionSize
    );
  }

  protected setAttrSize(division: HTMLElement): void {
    this.component.style.height = `${Math.max(
      parseFloat(getComputedStyle(this.component).height),
      division.children[0].getBoundingClientRect().height
    )}px`;
  }
}

class VerticalScale extends Scale implements IScale {
  swap(): IScale {
    this.unbindListeners();
    return new HorizontalScale(this.component);
  }

  protected getSize(): number {
    return this.component.getBoundingClientRect().height;
  }

  protected setDivisionSize(division: HTMLElement): void {
    this.divisionSize = Math.max(
      division.children[0].getBoundingClientRect().height * 1.5,
      this.divisionSize
    );
  }

  protected setAttrSize(division: HTMLElement): void {
    this.component.style.width = `${Math.max(
      parseFloat(getComputedStyle(this.component).width),
      division.children[0].getBoundingClientRect().width
    )}px`;
  }
}

export { HorizontalScale, VerticalScale };
