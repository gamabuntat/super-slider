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
  defaultClass: string
  constructor({
    name,
    elementType,
    // isInterval = false,
    // isVertical = false
  }: ISNodeData) {
    super(name);
    this.elem = document.createElement(elementType);
    this.defaultClass = this.getDefaultClass();
  }

  getDefaultClass(): string {
    return (this.name.match(/\w+(?=([S|s]tart|[E|e]nd)$)/) || [this.name])[0]
      .replace(/((?<=.)[A-Z])/g, '-$&')
      .toLowerCase();
  }

  addClasses(...classes: string[]): void {
    classes.forEach((c) => this.elem.classList.add(c));
  }
}



// static getDefaultClass = (name: string): string => (
//   (name.match(/\w+(?=(Start|End)$)/) || [name])[0]
//     .replace(/((?<=.)[A-Z])/g, '-$&')
//     .toLowerCase()
// )

// static filterClass = (
//   predicate: boolean,
//   step: (c: string) => string,
//   defaulClass: string
// ) => (acc: string[]): string[] => (
//   predicate ? [...acc, SNode.setPrefix(step(defaulClass))] : acc
// )

// static getIsMod = (name: string): boolean => (
//   !!(name.match(/(Start|End)$/) || [])[0]
// )

// static getMod = (name: string) => (defaultClass: string): string => (
//   `${defaultClass}_${
//     (name.match(/(Start|End)$/) || ['whoops'])[0].toLowerCase()
//   }`
// )

// static getVerticalMod = (defaultClass: string): string => (
//   `${defaultClass}_vertical`
// )

// static getInterValMod = (defaulClass: string): string => (
//   `${defaulClass}_interval`
// )

// static setPrefix = (c: string): string => `${SNode.prefix}${c}`

// static addClasses = (
//   elem: HTMLElement, classes: string[]
// ): HTMLElement => {
//   elem.classList.add(...classes);
//   return elem;
// }
// }

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

