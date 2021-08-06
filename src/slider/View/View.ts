import IView from './interfaces/IView';
import treeTemplate from './treeTemplate';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';
import HandleView from './UI/HandleView/HandleView';
import {IHandleView} from './UI/HandleView/IHandleView';
import { ViewState, ViewVerticalState, ViewHorizontalState } from './ViewState';

import {IResponse} from '../helpers/IResponse';

interface IComponents {
  [k: string]: HTMLElement
}

class View implements IView {
  private static tree: IViewTreeTemplate = treeTemplate
  private static defaultBEMBlockName = 'ui-slider'
  private states: ViewState[]
  private currentState: ViewState
  private components: IComponents = {}
  private blockName = ''
  private isTriggered = false
  private handleActiveIdx = 0
  private slider: HTMLElement
  private handles: IHandleView[]
  private handlesHandlePointerdown: Array<(ev: PointerEvent) => void>

  constructor(private currentResponse: IResponse) {
    this.states = [
      new ViewHorizontalState(this), new ViewVerticalState(this)
    ];
    this.currentState = this.states[+this.currentResponse.isVertical];
    this.slider = this.createSlider(View.tree);
    this.handles = [
      new HandleView(this.components.handleStart),
      new HandleView(this.components.handleEnd)
    ];
    this.handlesHandlePointerdown = this.getHadlesHandlePointerdown();
    this.bindListeners();
    this.renderSleder();
  }
  
  getCurrentResponse(): IResponse {
    return this.currentResponse;
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
    this.handleActiveIdx = idx;
    this.currentState.handleHandlePointerdown();
    console.log(this.isTriggered);
    console.log(ev.offsetX);
  }

  private bindListeners(): void {
    this.handles.forEach((h, idx) => {
      h
        .bind('pointerdown', this.handlesHandlePointerdown[idx])
        .bind('pointermove', this.handleHandlePointermove)
        .bind('lostpointercapture', this.handleHandleLostpointercapture);
    });
  }

  private handleHandlePointermove = (ev: PointerEvent) => {
    if (!this.isTriggered) { return; }
    console.log(ev.x);
    console.log('idx: ' + this.handleActiveIdx);
    this.currentState.handleHandlePointermove();
  }

  private handleHandleLostpointercapture = (): void => {
    this.isTriggered = false;
  }

  private renderSleder(): void {
    document.body.insertAdjacentElement('beforeend', this.slider);
  }
}

export default View;

