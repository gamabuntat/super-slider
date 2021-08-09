import treeTemplate from './treeTemplate';
import IView from './interfaces/IView';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';
import SliderView from './UI/SliderView/SliderView';
import ISliderView from './UI/SliderView/ISliderView';
import { HorizontalContainerView } from './UI/ContainerView/ContainerView';
import IContainerView from './UI/ContainerView/IContainerView';
import { HorizontalHandleView } from './UI/HandleView/HandleView';
import { IHandleView, ICalcPositionArgs } from './UI/HandleView/IHandleView';

import EventEmitter from 'slider/EventEmitter/EventEmitter';
import { IResponse } from 'slider/helpers/IResponse';

interface IComponents {
  [k: string]: HTMLElement
}

class View extends EventEmitter implements IView {
  private static tree: IViewTreeTemplate = treeTemplate
  private currentResponse: IResponse = { 
    id: '',
    isVertical: false,
    isInterval: false,
    positions: [{ max: 1, min: 0 }, { max: 1, min: 0 }]
  }
  private components: IComponents = {}
  private sliderBEMBlockName = 'ui-slider'
  private isTriggered = false
  private handleActiveIdx = 0
  private lastPosition = 0
  private sliderHTML: HTMLElement
  private slider: ISliderView
  private container: IContainerView
  private handles: IHandleView[]
  private handlesHandlePointerdown: Array<(ev: PointerEvent) => void>

  constructor(response: IResponse, root: HTMLElement) {
    super();
    this.sliderHTML = this.createSlider(View.tree);
    this.slider = new SliderView(this.components[this.sliderBEMBlockName]);
    this.container = new HorizontalContainerView(this.components.container);
    this.handles = this.getHandles();
    this.handlesHandlePointerdown = this.getHadlesHandlePointerdown();
    this.parseResponse(response);
    this.bindListeners();
    this.renderSleder(root);
  }

  parseResponse(response: IResponse): void {
    if (this.currentResponse.isVertical !== response.isVertical) {
      this.updateViewOrientation();
    }
    this.currentResponse = response;
  }

  private updateViewOrientation(): void {
    this.slider.toggleVerticalMod();
    this.container = this.container.swap();
    this.handles = this.handles.map((hv) => hv.swap());
    this.rebindListeners();
  }

  private createSlider(
    { name, elementType, childs = [] }: IViewTreeTemplate,
    parent?: HTMLElement
  ): HTMLElement {
    const elem = document.createElement(elementType);
    this.saveComponent(
      parent ? name : this.sliderBEMBlockName = name || this.sliderBEMBlockName,
      elem
    );
    elem.classList.add(parent ? this.getClass(name) : this.sliderBEMBlockName);
    if (parent) { parent.insertAdjacentElement('beforeend', elem); }
    childs.forEach((node) => this.createSlider(node, elem));
    return elem;
  }

  private saveComponent(name: string, elem: HTMLElement): void {
    this.components[name] = elem;
  }

  private getClass(name: string): string {
    return this.sliderBEMBlockName + '__' + name
      .replace(/(?<=.)[A-Z]/g, '-$&')
      .toLowerCase()
      .replace(
        /(?<base1>.*(?=-(start|end)))(?<mod>-(start|end))(?<base2>.*)/,
        "$<base1>$<base2>-$<mod>"
      );
  }

  private getHandles(): IHandleView[] {
    return [
      new HorizontalHandleView(this.components.handleStart),
      new HorizontalHandleView(this.components.handleEnd)
    ];
  }

  private getHadlesHandlePointerdown(): Array<(ev: PointerEvent) => void> {
    return Array
      .from({ length: 2 })
      .map((i, idx) => this.makeHandleHandlePointerdown(idx));
  }

  private makeHandleHandlePointerdown = (idx: number) => () => {
    this.isTriggered = true;
    this.handleActiveIdx = idx;
  }

  private rebindListeners(): void {
    this.unbindListeners();
    this.bindListeners();
  }

  private bindListeners(): void {
    this.handles.forEach((h, idx) => {
      h
        .bind('pointerdown', this.handlesHandlePointerdown[idx])
        .bind('pointermove', this.handleHandlePointermove)
        .bind('lostpointercapture', this.handleHandleLostpointercapture);
    });
  }

  private unbindListeners(): void {
    this.handles.forEach((h, idx) => {
      h
        .unbind('pointerdown', this.handlesHandlePointerdown[idx])
        .unbind('pointermove', this.handleHandlePointermove)
        .unbind('lostpointercapture', this.handleHandleLostpointercapture);
    });
  }

  private handleHandlePointermove = (): void => {
    if (!this.isTriggered) { return; }
    console.log(this.handleActiveIdx);
    this.lastPosition = this.handles[this.handleActiveIdx]
      .calcPosition(this.getMoveArgs());
    this.handles[this.handleActiveIdx].move(this.lastPosition);
    this.updateResponseExtremum();
    this.emit(this.currentResponse);
  }

  private getMoveArgs(): ICalcPositionArgs {
    return {
      ...this.currentResponse.positions[this.handleActiveIdx],
      containerCoord: this.container.getCoord(),
      containerSize: this.container.getSize(),
    };
  }

  private updateResponseExtremum(): void {
    [
      (p: number) => this.currentResponse.positions[1].min = p,
      (p: number) => this.currentResponse.positions[0].max = p
    ][this.handleActiveIdx](this.lastPosition);
  }

  private handleHandleLostpointercapture = (): void => {
    this.isTriggered = false;
  }

  private renderSleder(root: HTMLElement): void {
    root.insertAdjacentElement('beforeend', this.sliderHTML);
  }
}

export default View;

