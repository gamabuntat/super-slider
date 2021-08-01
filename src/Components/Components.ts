import ISNodeData from './ISNodeData';
import INode from './INode';

class Node implements INode {
  name: string
  childs: INode[]
  constructor(name: string) {
    this.name = name;
    this.childs = [];
  }
}

class SNode extends Node {
  static prefix = 'ui-slider__'
  elem: HTMLElement
  constructor({name, elementType, isInterval, isVertical}: ISNodeData) {
    super(name);
    this.elem = document.createElement(elementType);
    const defaultClass = SNode.addPrefix(this.getDefaultClass());
    this.setMod(defaultClass, this.spotMod());
    this.setVerticalMod(defaultClass, isVertical);
    this.setIntervalMod(defaultClass, isInterval);
  }

  setMod(defaultClass: string, mod: string): void {
    mod === '' 
      ? this.addMod(defaultClass) 
      : this.addMod(defaultClass + '--' + mod);
  }

  setVerticalMod(defaultClass: string, isVertical?: boolean): void {
    isVertical && this.addMod(defaultClass + '--' + 'vertical');
  }

  setIntervalMod(defaultClass: string, isInterval?: boolean): void {
    isInterval && this.addMod(defaultClass + '--' + 'interval');
  }

  getDefaultClass(): string {
    return this.name
      .replace(/([S|s][T|t][A|a][R|r][T|t])|([E|e][N|n][D|d])/, '')
      .replace(/(?<=.)[A-Z]/g, '-$&')
      .replace(/\s(?!-)/g, '-')
      .replace(/\s/g, '')
      .toLowerCase();
  }

  spotMod(): string {
    return (this.name.toLowerCase().match(/(start|end)/) || [''])[0];
  }

  addMod(mod: string): void {
    this.elem.classList.add(mod);
  }

  static addPrefix(s: string): string {
    return SNode.prefix + s;
  }
}

class Tree<A> {
  private root: INode
  constructor(
    private NodeCreator: new (...args: A[]) => INode, 
    nodeArg: A,
  ) {
    this.root = new NodeCreator(nodeArg);
  }

  findNode(name: string, node: INode = this.root): INode | null {
    if (node.name === name) { return node; }
    for (const n of node.childs) {
      const foundNode = this.findNode(name, n);
      if (foundNode) { return foundNode; }
    }
    return null;
  }

  add(parentName: string, ...nodeArgs: A[]): Tree<A> {
    const parentNode = this.findNode(parentName);
    if (parentNode) {
      parentNode.childs.push(...nodeArgs.map((a) => new this.NodeCreator(a)));
    }
    return this;
  }
}

export {SNode, Tree};

