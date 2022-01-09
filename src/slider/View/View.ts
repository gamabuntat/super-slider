import s from 'slider/styles/Slider.module.sass';
import Swappable, { ISwappable } from 'helpers/Swappable';
import EventEmitter from 'slider/EventEmitter/EventEmitter';

import IView, { Components } from './IView';
import tree, { TreeTemplate } from './treeTemplate';
import HorizontalConfig from './Config/HorizontalConfig';
import VerticalConfig from './Config/VerticalConfig';
import { IConfig } from './Config/IConfig';
import { HorizontalContainer } from './UI/Container/Container';
import IContainer from './UI/Container/IContainer';
import { HorizontalHandle } from './UI/Handle/Handle';
import IHandle from './UI/Handle/IHandle';
import { StartProgressBar, EndProgressBar } from './UI/ProgressBar/ProgressBar';
import IProgressBar from './UI/ProgressBar/IProgressBar';
import { HorizontalScale } from './UI/Scale/Scale';
import IScale from './UI/Scale/IScale';
import { HorizontalTrack } from './UI/Track/Track';
import ITrack from './UI/Track/ITrack';

class View extends EventEmitter implements IView {
  private config: ISwappable<IConfig>;
  private components: Components = {} as Components;
  private container: IContainer;
  private handles: IHandle[];
  private progressBars: IProgressBar[];
  private scale: IScale;
  private track: ITrack;

  constructor(response: Model, root: HTMLElement) {
    super();
    const initResponse = {
      ...response,
      isVertical: false,
      isInterval: false,
      isLabel: true,
      isScale: true,
    };
    this.config = new Swappable<IConfig>(
      new HorizontalConfig(initResponse),
      new VerticalConfig(initResponse)
    );
    this.createSlider(tree, root);
    this.container = new HorizontalContainer(this.components.container);
    this.handles = [this.components.handleStart, this.components.handleEnd].map(
      (h) => new HorizontalHandle(h)
    );
    this.progressBars = [
      new StartProgressBar(this.components.progressBarStart),
      new EndProgressBar(this.components.progressBarEnd),
    ];
    this.scale = new HorizontalScale(this.components.scale);
    this.track = new HorizontalTrack(this.components.track);
    this.parseResponse(response);
    this.bindListeners();
    root.id = response.id;
  }

  parseResponse(response: Model): void {
    const old = this.config.get().getResponse();
    if (old.isInterval !== response.isInterval) {
      this.components.slider.classList.toggle(s.SliderInterval);
    }
    if (old.isScale !== response.isScale) {
      this.scale.toggleHiddenMode();
    }
    if (old.isLabel !== response.isLabel) {
      this.components.labelStart.classList.toggle(s.LabelHidden);
      this.components.labelEnd.classList.toggle(s.LabelHidden);
    }
    if (old.isVertical !== response.isVertical) {
      this.updateViewOrientation();
    }
    this.config.get().update(response);
    this.scale.update(this.config.get().getAllPositions());
    this.setInMotion();
    this.rebindListeners();
  }

  private updateViewOrientation(): void {
    this.config.swap();
    this.components.slider.classList.toggle(s.SliderVertical);
    this.container = this.container.swap();
    this.handles = this.handles.map((hv) => hv.swap());
    this.progressBars.reverse();
    this.scale = this.scale.swap();
    this.track = this.track.swap();
  }

  private createSlider(
    { name, classes = [], elementType = 'div', childs = [] }: TreeTemplate,
    parent: HTMLElement
  ): HTMLElement {
    const elem = document.createElement(elementType);
    this.components[name] = elem;
    elem.classList.add(...classes);
    parent.insertAdjacentElement('beforeend', elem);
    childs.forEach((node) => this.createSlider(node, elem));
    return elem;
  }

  private rebindListeners(): void {
    this.unbindListeners();
    this.bindListeners();
  }

  private bindListeners(): void {
    this.handles.forEach((h) =>
      h
        .bind('pointermove', this.handleHandlePointermove)
        .bind('keydown', this.handleHandleKeydown)
    );
    this.scale.bind('click', this.handleScaleClick);
    this.track.bind('pointerdown', this.handleTrackPointerdown);
    this.components.fillerStart.addEventListener(
      'pointerdown',
      this.handlefillerStartPointerdown
    );
    this.components.fillerEnd.addEventListener(
      'pointerdown',
      this.handlefillerEndPointerdown
    );
  }

  private unbindListeners(): void {
    this.handles.forEach((h) =>
      h
        .unbind('pointermove', this.handleHandlePointermove)
        .unbind('keydown', this.handleHandleKeydown)
    );
    this.scale.unbind('click', this.handleScaleClick);
    this.track.unbind('pointerdown', this.handleTrackPointerdown);
    this.components.fillerStart.removeEventListener(
      'pointerdown',
      this.handlefillerStartPointerdown
    );
    this.components.fillerEnd.removeEventListener(
      'pointerdown',
      this.handlefillerEndPointerdown
    );
  }

  private handleHandlePointermove = (): void => {
    if (this.checkCaptureStatus()) {
      this.config.get().setPositions(
        this.config
          .get()
          .getPositions()
          .map((p, idx) =>
            this.handles[idx].getCaptureStatus()
              ? this.handles[idx].calcPosition(
                  this.container.getCoord(),
                  this.container.getSize()
                )
              : p
          )
      );
      this.moveAndSendResponse();
    }
  };

  private checkCaptureStatus(): boolean {
    return Boolean(this.handles.find((h) => h.getCaptureStatus()));
  }

  private handleHandleKeydown = (ev: KeyboardEvent): void => {
    const forwardCodes = ['ArrowUp', 'ArrowRight'];
    const backCodes = ['ArrowDown', 'ArrowLeft'];
    this.config.get().setPositions(
      this.config
        .get()
        .getPositions()
        .map((p, idx) => {
          if (!this.handles[idx].getFocusStatus()) {
            return p;
          }
          if (forwardCodes.includes(ev.code)) {
            return this.config.get().getNext(p);
          }
          if (backCodes.includes(ev.code)) {
            return this.config.get().getPrev(p);
          }
          return p;
        })
    );
    this.moveAndSendResponse();
  };

  private handleScaleClick = (): void => {
    this.updateActiveHandlePosition(
      this.config.get().calcPosition(this.scale.getLastPosition())
    );
    this.moveAndSendResponse();
  };

  private handleTrackPointerdown = (e: PointerEvent): void => {
    e.preventDefault();
    const lastPosition = this.track.getLastPosition();
    const handlePositions = this.config.get().getPositions();
    const handleIDX = this.defineActiveHandleIDX(lastPosition, handlePositions);
    this.updateActiveHandlePosition(lastPosition, handlePositions, handleIDX);
    this.handles[handleIDX].fixPointer(this.track.getPointerID());
    this.moveAndSendResponse();
  };

  private handlefillerStartPointerdown = (e: PointerEvent): void => {
    e.preventDefault();
    this.config
      .get()
      .setPositions([
        Number(this.config.get().getResponse().isVertical),
        this.config.get().getPositions()[1],
      ]);
    this.handles[0].fixPointer(e.pointerId);
    this.moveAndSendResponse();
  };

  private handlefillerEndPointerdown = (e: PointerEvent) => {
    e.preventDefault();
    const response = this.config.get().getResponse();
    const handleIDX = Number(response.isInterval);
    const positions = this.config.get().getPositions();
    positions[handleIDX] = Number(!response.isVertical);
    this.config.get().setPositions(positions);
    this.handles[handleIDX].fixPointer(e.pointerId);
    this.moveAndSendResponse();
  };

  private updateActiveHandlePosition(
    lastPosition: number,
    handlePositions = this.config.get().getPositions(),
    idx = this.defineActiveHandleIDX(lastPosition, handlePositions)
  ): void {
    handlePositions[idx] = lastPosition;
    this.config.get().setPositions(handlePositions);
  }

  private defineActiveHandleIDX(
    lastPosition: number,
    handlePositions = this.config.get().getPositions()
  ): number {
    const diffs = handlePositions.map(
      (p) => Math.abs(p - lastPosition) || Infinity
    );
    let idx = diffs.indexOf(Math.min(...diffs));
    if (handlePositions[0] === handlePositions[1]) {
      if (lastPosition > handlePositions[1]) {
        idx = 1;
      }
      if (this.config.get().getResponse().isVertical) {
        idx = Number(!idx);
      }
    }
    if (!this.config.get().getResponse().isInterval) {
      idx = 0;
    }
    return idx;
  }

  private moveAndSendResponse(): void {
    this.setInMotion();
    this.emit(this.config.get().getResponse());
  }

  private setInMotion(): void {
    this.config
      .get()
      .getPositions()
      .forEach((p, idx) => {
        this.handles[idx].move(p);
        this.progressBars[idx].resize(p);
      });
    const { from, to } = this.config.get().getResponse();
    this.components.labelStart.textContent = String(from);
    this.components.labelEnd.textContent = String(to);
  }
}

export default View;
