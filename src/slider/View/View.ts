import HandleView from './UI/HandleView/HandleView';
import {IHandleView} from './UI/HandleView/IHandleView';
import IViewTreeTemplate from './interfaces/IViewTreeTemplate';

// import IResponse from '../interfaces/IResponse';

interface IComponents {
  [k: string]: HTMLElement
}

class View {
  components: IComponents = {}
  blockName = ''
  slider: HTMLElement
  handles: IHandleView[]

  constructor(tree: IViewTreeTemplate) {
    this.slider = this.createSlider(tree);
    this.handles = [
      new HandleView(this.components.handleStart),
      new HandleView(this.components.handleEnd)
    ];
    document.body.insertAdjacentElement('beforeend', this.slider);
  }

  private createSlider(
    tree: IViewTreeTemplate, parent?: HTMLElement
  ): HTMLElement {
    const elem = document.createElement(tree.elementType);
    this.saveComponent(
      parent ? tree.name : this.setBlockName(tree.name),
      elem
    );
    elem.classList.add(this.getClass(tree.name));
    if (parent) { parent.insertAdjacentElement('beforeend', elem); }
    (tree.childs || []).forEach((node) => this.createSlider(node, elem));
    return elem;
  }

  private setBlockName(blockName: string): string {
    return this.blockName = blockName;
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

  private saveComponent(name: string, elem: HTMLElement): void {
    this.components[name] = elem;
  }
}

export default View;

