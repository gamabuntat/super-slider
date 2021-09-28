import { EventEmitter } from 'slider/EventEmitter/EventEmitter';

import treeTemplate from './treeTemplate';
import IView from './interfaces/IView';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';
import { HorizontalConfig } from './Config/Config';
import { IConfig } from './Config/IConfig';
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
import { HorizontalScaleView } from './UI/ScaleView/ScaleView';
import IScaleView from './UI/ScaleView/IScaleView';
import { HorizontalTrackView } from './UI/TrackView/TrackView';
import ITrackView from './UI/TrackView/ITrackView';

class View extends EventEmitter implements IView {
  private static tree: IViewTreeTemplate = treeTemplate
  private config: IConfig
  private components: { [k: string]: HTMLElement } = {}
  private sliderBEMBlockName = 'ui-slider'
  private slider: ISliderView
  private container: IContainerView
  private handles: IHandleView[]
  private progressBars: IProgressBarView[]
  private labels: ILabelView[]
  private scale: IScaleView
  private track: ITrackView

  constructor(response: IResponse, root: HTMLElement) {
    super();
    this.config = new HorizontalConfig({
      ...response, 
      isVertical: false,
      isInterval: false,
      isLabel: true,
      isScale: true
    });
    root.insertAdjacentElement('beforeend', this.createSlider(View.tree));
    this.slider = new SliderView(this.components[this.sliderBEMBlockName]);
    this.container = new HorizontalContainerView(this.components.container);
    this.handles = [this.components.handleStart, this.components.handleEnd]
      .map((h) => new HorizontalHandleView(h));
    this.progressBars = [
      new StartProgressBarView(this.components.progressBarStart),
      new EndProgressBarView(this.components.progressBarEnd)
    ];
    this.labels = [this.components.labelStart, this.components.labelEnd]
      .map((c) => new LabelView(c));
    this.scale = new HorizontalScaleView(this.components.scale);
    this.track = new HorizontalTrackView(this.components.track);
    this.parseResponse(response);
    this.bindListeners();
    root.id = response.id;
  }

  parseResponse(response: IResponse): void {
    if (this.config.getResponse().isVertical !== response.isVertical) {
      this.updateViewOrientation();
    }
    if (this.config.getResponse().isInterval !== response.isInterval) {
      this.slider.toggleIntervalMod();
    }
    if (this.config.getResponse().isScale !== response.isScale) {
      this.scale.toggleHiddenMode();
    }
    if (this.config.getResponse().isLabel !== response.isLabel) {
      this.labels.forEach((l) => l.toggleHiddenMode());
    }
    this.config.update(response);
    this.scale.update(this.config.getAllPositions().absolutePositions);
    this.setInMotion();
    this.rebindListeners();
  }

  private updateViewOrientation(): void {
    this.config = this.config.swap();
    this.slider.toggleVerticalMod();
    this.container = this.container.swap();
    this.handles = this.handles.map((hv) => hv.swap());
    this.progressBars.reverse();
    this.scale = this.scale.swap();
    this.track = this.track.swap();
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
    return `${this.sliderBEMBlockName}__${
      name
        .replace(/(?<=.)[A-Z]/g, '-$&')
        .toLowerCase()
        .replace(
          /(?<base1>.*(?=-(start|end)))(?<mod>-(start|end))(?<base2>.*)/,
          '$<base1>$<base2>-$<mod>'
        )
    }`;
  }

  private rebindListeners(): void {
    this.unbindListeners();
    this.bindListeners();
  }

  private bindListeners(): void {
    this.handles.forEach((h) => h
      .bind('pointermove', this.handleHandlePointermove)
      .bind('keydown', this.handleHandleKeydown)
    );
    this.scale.bind('click', this.handleScaleClick);
    this.track.bind('pointerdown', this.handleTrackPointerdown);
    this.components.gigletStart
      .addEventListener('pointerdown', this.handleGigletStartPointerdown);
    this.components.gigletEnd
      .addEventListener('pointerdown', this.handleGigletEndPointerdown);
  }

  private unbindListeners(): void {
    this.handles.forEach((h) => h
      .unbind('pointermove', this.handleHandlePointermove)
      .unbind('keydown', this.handleHandleKeydown)
    );
    this.scale.unbind('click', this.handleScaleClick);
    this.track.unbind('pointerdown', this.handleTrackPointerdown);
    this.components.gigletStart
      .removeEventListener('pointerdown', this.handleGigletStartPointerdown);
    this.components.gigletEnd
      .removeEventListener('pointerdown', this.handleGigletEndPointerdown);
  }

  private handleHandlePointermove = (): void => {
    if (this.checkCaptureStatus()) { 
      this.config.setPositions(this.config.getPositions().map((p, idx) => {
        return this.handles[idx].getCaptureStatus() 
          ? this.handles[idx].calcPosition(
            this.container.getCoord(), this.container.getSize()
          ) 
          : p;
      }));
      this.moveAndSendResponse();
    }
  }

  private checkCaptureStatus(): boolean {
    return Boolean(this.handles.find((h) => h.getCaptureStatus()));
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
    this.moveAndSendResponse();
  }

  private handleScaleClick = (): void => {
    this.updateActiveHandlePosition(
      this.config.calcPosition(this.scale.getLastPosition())
    );
    this.moveAndSendResponse();
  }

  private handleTrackPointerdown = (e: PointerEvent): void => {
    e.preventDefault();
    const lastPosition = this.track.getLastPosition();
    const handlePositions = this.config.getPositions();
    const handleIDX = this.defineActiveHandleIDX(lastPosition, handlePositions);
    this.updateActiveHandlePosition(
      lastPosition, 
      handlePositions,
      handleIDX
    );
    this.handles[handleIDX].fixPointer(this.track.getPointerID());
    this.moveAndSendResponse();
  }

  private handleGigletStartPointerdown = (e: PointerEvent): void => {
    e.preventDefault();
    this.config.setPositions([
      Number(this.config.getResponse().isVertical),
      this.config.getPositions()[1]
    ]);
    this.handles[0].fixPointer(e.pointerId);
    this.moveAndSendResponse();
  }

  private handleGigletEndPointerdown = (e: PointerEvent) => {
    e.preventDefault();
    const response = this.config.getResponse();
    const handleIDX = Number(response.isInterval);
    const positions = this.config.getPositions();
    positions[handleIDX] = Number(!response.isVertical);
    this.config.setPositions(positions);
    this.handles[handleIDX].fixPointer(e.pointerId);
    this.moveAndSendResponse();
  }

  private updateActiveHandlePosition(
    lastPosition: number,
    handlePositions = this.config.getPositions(),
    idx = this.defineActiveHandleIDX(lastPosition, handlePositions)
  ): void {
    handlePositions[idx] = lastPosition;
    this.config.setPositions(handlePositions);
  }

  private defineActiveHandleIDX(
    lastPosition: number,
    handlePositions = this.config.getPositions()
  ): number {
    const diffs = handlePositions
      .map((p) => Math.abs(p - lastPosition) || Infinity);
    let idx = diffs.indexOf(Math.min(...diffs));
    if (handlePositions[0] === handlePositions[1]) { 
      if (lastPosition > handlePositions[1]) { idx = 1; }
      if (lastPosition < handlePositions[0]) { idx = 0; }
      if (this.config.getResponse().isVertical) { idx = +!idx; }
    }
    if (!this.config.getResponse().isInterval) { idx = 0; }
    return idx;
  }

  private moveAndSendResponse(): void {
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

