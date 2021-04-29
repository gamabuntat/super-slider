import INodeData from './INodeData';

class SNode {
  static prefix = 'ui-slider__'
  name: string
  elem: HTMLElement
  childs: SNode[]
  constructor(nodeData: INodeData) {
    this.name = nodeData.name;
    this.childs = [];
    const defaultClass = SNode.getDefaultClass(this.name);
    const modClass = SNode.filterClass(
      SNode.getIsMod(this.name), SNode.getMod(this.name), defaultClass
    );
    const verticalClass = SNode.filterClass(
      nodeData.isVertical || false, SNode.getVerticalMod, defaultClass
    );
    const intervalClass = SNode.filterClass(
      nodeData.isInterval || false, SNode.getInterValMod, defaultClass
    );
    this.elem = SNode.addClasses(
      SNode.createNodeElem(nodeData.elementType),
      [modClass, verticalClass, intervalClass].reduce(
        (acc, fn) => fn(acc), [SNode.setPrefix(defaultClass)]
      )
    );
  }

  static getDefaultClass = (name: string): string => (
    (name.match(/\w+(?=[S|s]tart|[E|e]nd)/) || [name])[0].replace(
      /([A-Z])/g, (s: string) => `-${s.toLowerCase()}`
    )
  )

  static filterClass = (
    predicate: boolean,
    step: (c: string) => string,
    defaulClass: string
  ) => (acc: string[]): string[] => (
    predicate ? [...acc, SNode.setPrefix(step(defaulClass))] : acc
  )

  static getIsMod = (name: string): boolean => (
    !!(name.match(/[S|s]tart|[E|e]nd/) || [])[0]
  )

  static getMod = (name: string) => (defaultClass: string): string => (
    `${defaultClass}_${
      (name.match(/Start|End/) || ['whoops'])[0].toLowerCase()
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
  root: SNode
  constructor(sNode: SNode) {
    this.root = sNode;
  }

  findNode(name: string, node: SNode = this.root): SNode | null {
    if (!node) { return null; }
    if (node.name === name) { return node; }
    for (const n of node.childs) {
      const isSuccsess = this.findNode(name, n);
      if (isSuccsess) { return isSuccsess; }
    }
    return null;
  }

  addChilds(parentNode: SNode | null, ...node: SNode[]): STree {
    if (parentNode) { node.forEach((n) => parentNode.childs.push(n)); }
    return this;
  }

  add(parentName: string, ...nodeData: Array<INodeData | false>): STree {
    return this.addChilds(
      this.findNode(parentName),
      ...nodeData.reduce((nodes, data) => (
        data ? [...nodes, new SNode(data)] : nodes
      ), [] as SNode[])
    );
  }

  static create(nodeData: INodeData): STree {
    return new STree(new SNode(nodeData));
  }
}

export {SNode, STree};

