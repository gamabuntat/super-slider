import treeTemplate from './treeTemplate';
import HandleView from './UI/HandleView/HandleView';
import {IHandleView} from './UI/HandleView/IHandleView';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';

// import IResponse from '../interfaces/IResponse';

interface IComponents {
  [k: string]: HTMLElement
}

class View {
  private static tree: IViewTreeTemplate = treeTemplate
  private components: IComponents = {}
  private blockName = ''
  private isTriggered = false
  private slider: HTMLElement
  private handles: IHandleView[]
  private handlesHandlePointermove: Array<(ev: PointerEvent) => void>

  constructor() {
    this.slider = this.createSlider(View.tree);
    this.handles = [
      new HandleView(this.components.handleStart),
      new HandleView(this.components.handleEnd)
    ];
    this.handlesHandlePointermove = this.getHadlesHandlePointermove();
    this.bindListeners();
    this.renderSleder();
  }

  private createSlider(
    { name, elementType, childs = [] }: IViewTreeTemplate,
    parent?: HTMLElement
  ): HTMLElement {
    const elem = document.createElement(elementType);
    this.saveComponent(
      parent ? name : this.setBlockName(name),
      elem
    );
    elem.classList.add(this.getClass(name));
    if (parent) { parent.insertAdjacentElement('beforeend', elem); }
    childs.forEach((node) => this.createSlider(node, elem));
    return elem;
  }

  private setBlockName(blockName: string): string {
    return this.blockName = blockName;
  }

  private saveComponent(name: string, elem: HTMLElement): void {
    this.components[name] = elem;
  }

  private getClass(name: string): string {
    return this.blockName + '__' + name
      .replace(/(?<=.)[A-Z]/g, '-$&')
      .toLowerCase()
      .replace(
        /(?<base1>.*(?=-(start|end)))(?<mod>-(start|end))(?<base2>.*)/,
        "$<base1>$<base2>-$<mod>"
      );
  }

  private getHadlesHandlePointermove(): Array<(ev: PointerEvent) => void> {
    return Array
      .from({ length: 2 })
      .map((i, idx) => this.makeHandleHandlePointermove(idx));
  }

  private makeHandleHandlePointermove = (idx: number) => (ev: PointerEvent) => {
    if (!this.isTriggered) { return; }
    console.log('id: ' + idx);
    console.log(ev.x);
  }

  private bindListeners(): void {
    this.handles.forEach((h, idx) => {
      h
        .bind('pointerdown', this.handleHandlePointerdown)
        .bind('pointermove', this.handlesHandlePointermove[idx])
        .bind('lostpointercapture', this.handleHandleLostpointercapture);
    });
  }

  private handleHandlePointerdown = (ev: PointerEvent): void => {
    this.isTriggered = true;
    console.log(this.isTriggered);
    console.log(ev.offsetX);
  }

  private handleHandleLostpointercapture = (): void => {
    this.isTriggered = false;
  }

  private renderSleder(): void {
    document.body.insertAdjacentElement('beforeend', this.slider);
  }
}

export default View;

