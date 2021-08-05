import INode from './interfaces/INode';

class Node implements INode {
  name: string
  childs: INode[]
  constructor(name: string) {
    this.name = name;
    this.childs = [];
  }
}

export default Node;

