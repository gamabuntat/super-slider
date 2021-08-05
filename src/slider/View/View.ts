import HandleView from './UI/HandleView/HandleView';
import {IHandleView} from './UI/HandleView/IHandleView';
import Tree from './components/Tree';
import ITree from './components/interfaces/ITree';
import SNode from './components/SNode';
import ISNodeData from './components/interfaces/ISNodeData';

import IResponse from '../interfaces/IResponse';

class View {
  private handleViews: IHandleView[]
  constructor(response: IResponse) {
    const elem = document.createElement('button');
    this.handleViews = Array
      .from({ length: response.positions.length })
      .map(() => new HandleView(elem));
  }

  createTree(): ITree {
    return new Tree();
  }
}

export default View;

