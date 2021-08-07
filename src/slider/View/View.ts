import IView from './interfaces/IView';
import treeTemplate from './treeTemplate';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';
import SliderView from './UI/SliderView/SliderView';
import ISliderView from './UI/SliderView/ISliderView';
import HandleView from './UI/HandleView/HandleView';
import { IHandleView } from './UI/HandleView/IHandleView';

import { IResponse } from '../helpers/IResponse';

interface IComponents {
  [k: string]: HTMLElement
}

class View implements IView {
  private static tree: IViewTreeTemplate = treeTemplate
  private static defaultBEMBlockName = 'ui-slider'
  private currentResponse: IResponse = { 
    isVertical: false,
    isInterval: false,
    positions: [{ max: 1, min: 0 }, { max: 1, min: 0 }]
  }
  private components: IComponents = {}
  private blockName = ''
  private isTriggered = false
  private shift = 0
  private handleActiveIdx = 0
  private sliderHTML: HTMLElement
  private slider: ISliderView
  private handles: IHandleView[]
  private handlesHandlePointerdown: Array<(ev: PointerEvent) => void>

  constructor(response: IResponse) {
    this.sliderHTML = this.createSlider(View.tree);
    this.slider = new SliderView(this.components[this.blockName]);
    this.handles = this.getHandles();
    this.handlesHandlePointerdown = this.getHadlesHandlePointerdown();
    this.parseResponse(response);
    this.bindListeners();
    this.renderSleder();
  }

  getCurrentResponse(): IResponse {
    return this.currentResponse;
  }

  private getHandles(): IHandleView[] {
    return [
      new HandleView(this.components.handleStart),
      new HandleView(this.components.handleEnd)
    ];
  }

  private parseResponse(response: IResponse): void {
    if (this.currentResponse.isVertical !== response.isVertical) {
      this.updateViewOrientation();
    }
  }

  private updateViewOrientation(): void {
    this.slider.toggleVerticalMod();
  }

  private createSlider(
    { name, elementType, childs = [] }: IViewTreeTemplate,
    parent?: HTMLElement
  ): HTMLElement {
    const elem = document.createElement(elementType);
    this.saveComponent(
      parent ? name : this.blockName = name || View.defaultBEMBlockName,
      elem
    );
    elem.classList.add(parent ? this.getClass(name) : this.blockName);
    if (parent) { parent.insertAdjacentElement('beforeend', elem); }
    childs.forEach((node) => this.createSlider(node, elem));
    return elem;
  }

  private saveComponent(name: string, elem: HTMLElement): void {
    this.components[name] = elem;
  }

  private getClass(name: string): string {
    return this.blockName + (name && '__') + name
      .replace(/(?<=.)[A-Z]/g, '-$&')
      .toLowerCase()
      .replace(
        /(?<base1>.*(?=-(start|end)))(?<mod>-(start|end))(?<base2>.*)/,
        "$<base1>$<base2>-$<mod>"
      );
  }

  private getHadlesHandlePointerdown(): Array<(ev: PointerEvent) => void> {
    return Array
      .from({ length: 2 })
      .map((i, idx) => this.makeHandleHandlePointerdown(idx));
  }

  private makeHandleHandlePointerdown = (idx: number) => (ev: PointerEvent) => {
    this.isTriggered = true;
    console.log(ev);
    console.log(idx);
  }

  private bindListeners(): void {
    this.handles.forEach((h, idx) => {
      h
        .bind('pointerdown', this.handlesHandlePointerdown[idx])
        .bind('pointermove', this.handleHandlePointermove)
        .bind('lostpointercapture', this.handleHandleLostpointercapture);
    });
  }

  private handleHandlePointermove = (ev: PointerEvent): void => {
    console.log(ev);
  }

  private handleHandleLostpointercapture = (): void => {
    this.isTriggered = false;
  }

  private renderSleder(): void {
    document.body.insertAdjacentElement('beforeend', this.sliderHTML);
  }
}

export default View;

