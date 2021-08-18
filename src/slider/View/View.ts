import EventEmitter from 'slider/EventEmitter/EventEmitter';
import IResponse from 'slider/interfaces/IResponse';
import treeTemplate from './treeTemplate';
import IView from './interfaces/IView';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';
import SliderView from './UI/SliderView/SliderView';
import ISliderView from './UI/SliderView/ISliderView';
import { HorizontalContainerView } from './UI/ContainerView/ContainerView';
import IContainerView from './UI/ContainerView/IContainerView';
import { HorizontalHandleView } from './UI/HandleView/HandleView';
import IHandleView from './UI/HandleView/IHandleView';

class View extends EventEmitter implements IView {
  private static tree: IViewTreeTemplate = treeTemplate
  private currentResponse: IResponse
  private config: IConfig = {} as IConfig
  private components: { [k: string]: HTMLElement } = {}
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
    this.currentResponse = { ...response, isVertical: false, };
    this.parseResponse(response);
    this.bindListeners();
    this.renderSleder(root);
  }

  parseResponse(response: IResponse): void {
    if (this.currentResponse.isVertical !== response.isVertical) {
      this.updateViewOrientation();
    }
    this.currentResponse = response;
    this.updateConfig();
  }

  private updateViewOrientation(): void {
    this.slider.toggleVerticalMod();
    this.container = this.container.swap();
    this.handles = this.handles.map((hv) => hv.swap());
    this.rebindListeners();
  }

  private updateConfig(
    { max, min, step, from, to }: IResponse = this.currentResponse
  ): void {
    const diff = max - min;
    const divisionNumber = Math.ceil(diff / step);
    const unrealMax = divisionNumber * step + min;
    this.config = {
      extremums: [
        { max: (to - min) / diff, min: 0 },
        { max: 1, min: (from - min) / diff }
      ],
      diff,
      divisionNumber,
      unrealMax,
    };
  }

  private updateResponse(): void {
    this.currentResponse.from = this.config.extremums[1].min * this.config.diff;
    this.currentResponse.to = this.config.extremums[0].max * this.config.diff;
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
    this.lastPosition = this.makePositionDiscrete(
      this.handles[this.handleActiveIdx].calcPosition(
        this.config.extremums[this.handleActiveIdx].max,
        this.config.extremums[this.handleActiveIdx].min,
        this.container.getCoord(),
        this.container.getSize(),
      )
    );
    this.moveHandle();
    this.updateConfigExtremum();
    this.updateResponse();
    this.emit(this.currentResponse);
  }

  private makePositionDiscrete(position: number): number {
    return 1 / this.config.divisionNumber 
      * Math.round(position * this.config.divisionNumber);
  }

  private moveHandle(): void {
    this.handles[this.handleActiveIdx].move(this.lastPosition);
  }

  private getConfigPositions(): number[] {
    return [this.config.extremums[1].min, this.config.extremums[0].max];
  }

  private updateConfigExtremum(): void {
    [
      (p: number) => this.config.extremums[1].min = p,
      (p: number) => this.config.extremums[0].max = p
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

