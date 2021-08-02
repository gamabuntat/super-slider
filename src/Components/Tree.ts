import INode from './INode';

class Tree {
  constructor(public root: INode) {}

  findNode(name: string, node: INode = this.root): INode | null {
    if (node.name === name) { return node; }
    for (const n of node.childs) {
      const foundNode = this.findNode(name, n);
      if (foundNode) { return foundNode; }
    }
    return null;
  }

  add(parentName: string, ...nodes: INode[]): Tree {
    const parentNode = this.findNode(parentName);
    if (parentNode) { parentNode.childs.push(...nodes); }
    return this;
  }
}

export default Tree;

