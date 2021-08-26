import { EventEmitter } from 'slider/EventEmitter/EventEmitter';
import treeTemplate from './treeTemplate';
import IView from './interfaces/IView';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';
import SliderView from './UI/SliderView/SliderView';
import ISliderView from './UI/SliderView/ISliderView';
import { HorizontalContainerView } from './UI/ContainerView/ContainerView';
import IContainerView from './UI/ContainerView/IContainerView';
import { HorizontalHandleView } from './UI/HandleView/HandleView';
import IHandleView from './UI/HandleView/IHandleView';
import { 
  StartProgressBarView, EndProgressBarView 
} from './UI/ProgressBarView/ProgressBarView';
import IProgressBarView from './UI/ProgressBarView/IProgressBarView';
import LabelView from './UI/LabelView/LabelView';
import ILabelView from './UI/LabelView/ILabelView';
import { HorizontalConfig } from './Config/Config';
import { IConfig } from './Config/IConfig';

class View extends EventEmitter implements IView {
  private static tree: IViewTreeTemplate = treeTemplate
  private config: IConfig
  private components: { [k: string]: HTMLElement } = {}
  private sliderBEMBlockName = 'ui-slider'
  private isTriggered = false
  private sliderHTML: HTMLElement
  private slider: ISliderView
  private container: IContainerView
  private handles: IHandleView[]
  private progressBars: IProgressBarView[]
  private labels: ILabelView[]
  private handlesHandlePointerdown: Array<(ev: PointerEvent) => void>
  private activeIDX = 0

  constructor(response: IResponse, root: HTMLElement) {
    super();
    this.config = new HorizontalConfig({
      ...response, isVertical: false, isInterval: false 
    });
    this.sliderHTML = this.createSlider(View.tree);
    this.slider = new SliderView(this.components[this.sliderBEMBlockName]);
    this.container = new HorizontalContainerView(this.components.container);
    this.handles = this.getHandles();
    this.progressBars = [
      new StartProgressBarView(this.components.progressBarStart),
      new EndProgressBarView(this.components.progressBarEnd)
    ];
    this.labels = [this.components.labelStart, this.components.labelEnd]
      .map((c) => new LabelView(c));
    this.handlesHandlePointerdown = this.getHadlesHandlePointerdown();
    this.parseResponse(response);
    this.bindListeners();
    root.insertAdjacentElement('beforeend', this.sliderHTML);
    root.id = response.id;
  }

  parseResponse(response: IResponse): void {
    if (this.config.getResponse().isVertical !== response.isVertical) {
      this.updateViewOrientation();
    }
    if (this.config.getResponse().isInterval !== response.isInterval) {
      this.slider.toggleIntervalMod();
    }
    this.config.update(response);
    this.moveComponents();
  }

  private updateViewOrientation(): void {
    this.config = this.config.swap();
    this.slider.toggleVerticalMod();
    this.container = this.container.swap();
    this.handles = this.handles.map((hv) => hv.swap());
    this.progressBars.reverse();
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
    this.activeIDX = idx;
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
    const lastPositions = this.config.getPositions();
    const extremums = this.config.getExtremums()[this.activeIDX];
    lastPositions[this.activeIDX] = this.handles[this.activeIDX]
      .calcPosition(
        extremums.min,
        extremums.max,
        this.container.getCoord(),
        this.container.getSize()
      );
    this.config.setPositions(lastPositions);
    this.moveComponents();
    this.emit(this.config.getResponse());
  }

  private moveComponents(): void {
    this.handles.forEach((h, idx) => h.move(this.config.getPositions()[idx]));
    this.progressBars
      .forEach((pb, idx) => pb.resize(this.config.getPositions()[idx]));
    const { from, to } = this.config.getResponse();
    [from , to].forEach((v, idx) => this.labels[idx].updateValue(String(v)));
  }

  private handleHandleLostpointercapture = (): void => {
    this.isTriggered = false;
  }
}

export default View;

