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
  private sliderHTML: HTMLElement
  private slider: ISliderView
  private container: IContainerView
  private handles: IHandleView[]
  private progressBars: IProgressBarView[]
  private labels: ILabelView[]

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
    this.setInMotion();
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

  private rebindListeners(): void {
    this.unbindListeners();
    this.bindListeners();
  }

  private bindListeners(): void {
    this.handles.forEach((h) => {
      h
        .bind('pointermove', this.handleHandlePointermove)
        .bind('keydown', this.handleHandleKeydown);
    });
  }

  private unbindListeners(): void {
    this.handles.forEach((h) => {
      h
        .unbind('pointermove', this.handleHandlePointermove)
        .unbind('keydown', this.handleHandleKeydown);
    });
  }

  private handleHandlePointermove = (): void => {
    if (this.checkCaptureStatus()) { 
      this.config.setPositions(this.config.getPositions().map((p, idx) => {
        if (!this.handles[idx].getCaptureStatus()) { return p; }
        return this.handles[idx].calcPosition(
          this.container.getCoord(), this.container.getSize()
        );
      }));
      this.setInMotion();
      this.emit(this.config.getResponse());
    }
  }

  private checkCaptureStatus(): boolean {
    return !!this.handles.find((h) => h.getCaptureStatus());
  }

  private handleHandleKeydown = (ev: KeyboardEvent): void => {
    const forwardCodes = ['ArrowUp', 'ArrowRight'];
    const backCodes = ['ArrowDown', 'ArrowLeft'];
    this.config.setPositions(this.config.getPositions().map((p, idx) => {
      if (!this.handles[idx].getFocusStatus()) { return p; }
      if (forwardCodes.includes(ev.code)) { return this.config.getNext(p); }
      if (backCodes.includes(ev.code)) { return this.config.getPrev(p); }
      return p;
    }));
    this.setInMotion();
    this.emit(this.config.getResponse());
  }

  private setInMotion(): void {
    const { from, to } = this.config.getResponse();
    [from , to].forEach((v, idx) => {
      const position = this.config.getPositions()[idx];
      this.handles[idx].move(position);
      this.progressBars[idx].resize(position);
      this.labels[idx].updateValue(String(v));
    });
  }
}

export default View;

