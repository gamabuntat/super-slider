import INodeData from './INodeData';
import INode from './INode';

class SNode implements INode {
  static prefix = 'ui-slider__'
  name: string
  elem: HTMLElement
  childs: SNode[]
  constructor({
    elementType,
    name,
    isVertical = false,
    isInterval = false
  }: INodeData) {
    this.name = name;
    this.childs = [];
    const defaultClass = SNode.getDefaultClass(this.name);
    const modClass = SNode.filterClass(
      SNode.getIsMod(this.name), SNode.getMod(this.name), defaultClass
    );
    const verticalClass = SNode.filterClass(
      isVertical, SNode.getVerticalMod, defaultClass
    );
    const intervalClass = SNode.filterClass(
      isInterval, SNode.getInterValMod, defaultClass
    );
    this.elem = SNode.addClasses(
      SNode.createNodeElem(elementType),
      [modClass, verticalClass, intervalClass].reduce(
        (acc, fn) => fn(acc), [SNode.setPrefix(defaultClass)]
      )
    );
  }

  static getDefaultClass = (name: string): string => (
    (name.match(/\w+(?=(Start|End)$)/) || [name])[0]
      .replace(/((?<=.)[A-Z])/g, '-$&')
      .toLowerCase()
  )

  static filterClass = (
    predicate: boolean,
    step: (c: string) => string,
    defaulClass: string
  ) => (acc: string[]): string[] => (
    predicate ? [...acc, SNode.setPrefix(step(defaulClass))] : acc
  )

  static getIsMod = (name: string): boolean => (
    !!(name.match(/(Start|End)$/) || [])[0]
  )

  static getMod = (name: string) => (defaultClass: string): string => (
    `${defaultClass}_${
      (name.match(/(Start|End)$/) || ['whoops'])[0].toLowerCase()
    }`
  )

  static getVerticalMod = (defaultClass: string): string => (
    `${defaultClass}_vertical`
  )

  static getInterValMod = (defaulClass: string): string => (
    `${defaulClass}_interval`
  )

  static setPrefix = (c: string): string => `${SNode.prefix}${c}`

  static addClasses = (
    elem: HTMLElement, classes: string[]
  ): HTMLElement => {
    elem.classList.add(...classes);
    return elem;
  }

  static createNodeElem = (elementType: string): HTMLElement => (
    document.createElement(elementType)
  )
}

class STree {
  constructor(public root: INode) {}

  findNode(name: string, node: INode = this.root): INode | null {
    if (node.name === name) { return node; }
    for (const n of node.childs) {
      const isSuccsess = this.findNode(name, n);
      if (isSuccsess) { return isSuccsess; }
    }
    return null;
  }

  addChilds(parentNode: INode, nodes: INode[]): void {
    nodes.forEach((n) => parentNode.childs.push(n));
  }

  public add(parentName: string, ...nodes: INode[]): STree {
    const parentNode = this.findNode(parentName);
    if (parentNode) { this.addChilds(parentNode, nodes); }
    return this;
  }
}

export {SNode, STree};

