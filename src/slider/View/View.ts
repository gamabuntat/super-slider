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
  private slider: HTMLElement
  private handles: IHandleView[]

  constructor() {
    this.slider = this.createSlider(View.tree);
    this.handles = [
      new HandleView(this.components.handleStart)
        .bind('pointerdown', () => console.log('hi'))
        .bind('lostpointercapture', () => console.log('bye')),
      new HandleView(this.components.handleEnd)
    ];
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

  private renderSleder(): void {
    document.body.insertAdjacentElement('beforeend', this.slider);
  }
}

export default View;

