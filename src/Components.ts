type TElemType = 'div' | 'button'

interface INodeData {
  elementType: TElemType
  name: string
  isVertical?: boolean
}

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
    this.elem = SNode.addClasses(
      SNode.createNodeElem(nodeData.elementType),
      [modClass, verticalClass].reduce(
        (acc, fn) => fn(acc), [SNode.setPrefix(defaultClass)]
      )
    );
  }

  static getDefaultClass = (name: string) => (
    (name.match(/\w+(?=Start|End)/) || [name])[0].replace(
      /([A-Z])/g, (match: string) => `-${match.toLowerCase()}`
    )
  )

  static filterClass = (
    predicate: boolean,
    step: (c: string) => string,
    defaulClass: string
  ) => (acc: string[] | []): string[] => (
    predicate ? [...acc, SNode.setPrefix(step(defaulClass))] : acc
  )

  static getIsMod = (c: string) => (
    !!(c.match(/Start|End/) || [])[0]
  )

  static getMod = (name: string) => (defaultClass: string): string => (
    `${defaultClass}_${
      (name.match(/Start|End/) || ['whoops'])[0].toLowerCase()
    }`
  )

  static getVerticalMod = (defaultClass: string) => `${defaultClass}_vertical`

  static setPrefix = (c: string) => `${SNode.prefix}${c}`

  static addClasses = (elem: HTMLElement, classes: string[]) => {
    elem.classList.add(...classes);
    return elem;
  }

  static createNodeElem = (elementType: TElemType) => (
    document.createElement(elementType)
  )
}

class Tree {
  root: SNode | null
  constructor(sNode: SNode | null = null) {
    this.root = sNode;
  }

  findNode(
    name: string, node: SNode | null = this.root
  ): SNode | null {
    if (!node) { return null; }
    if (node.name === name) { return node; }
    for (const n of node.childs) {
      const isSuccsess = this.findNode(name, n);
      if (isSuccsess) { return isSuccsess; }
    }
    return null;
  }

  addChilds(parentNode: SNode | null, ...node: SNode[]): Tree {
    if (parentNode) {
      node.forEach((n) => {
        parentNode.childs.push(n);
      });
    }
    return this;
  }

  add(parentName: string, ...nodeData: Array<INodeData | false>): Tree {
    return this.addChilds(
      this.findNode(parentName), 
      ...nodeData.reduce((nodes, data) => (
        data ? [...nodes, new SNode(data)] : nodes
      ), [] as SNode[])
    );
  }

  static create(nodeData: INodeData): Tree {
    return new Tree(new SNode(nodeData));
  }
}

const tree = (
  Tree.create({
    elementType: 'div',
    name: 'foremostContainer'
  })
    .add(
      'foremostContainer',
      {elementType: 'div', name: 'mainContainer'},
      {elementType: 'div', name: 'scale', isVertical: true},
    )
    .add(
      'scale',
      {elementType: 'div', name: 'inScale'},
    )
    .add(
      'mainContainer',
      {elementType: 'div', name: 'container'},
    )
    .add(
      'container',
      {elementType: 'div', name: 'track'},
      {elementType: 'button', name: 'buttonStart'},
      {elementType: 'button', name: 'buttonEnd'},
      {elementType: 'div', name: 'displayStart'},
      {elementType: 'div', name: 'displayEnd'},
    )
    .add(
      'displayStart',
      {elementType: 'div', name: 'qqqqqq'},
    )
);

const createSlider = (elem: HTMLElement, node: SNode) => {
  return node.childs.reduce((acc, child) => {
    if (!child) { return acc; }
    acc.insertAdjacentElement('beforeend', createSlider(child.elem, child));
    return acc;
  }, elem);
};

console.log(tree.findNode('container'));
console.log(createSlider(tree.root!.elem, tree.root!));

