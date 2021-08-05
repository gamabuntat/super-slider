import INode from './INode';

interface ITree {
  findNode(name: string, node: INode): INode | null
  add(parentName: string, ...nodes: INode[]): ITree
}

export default ITree;

