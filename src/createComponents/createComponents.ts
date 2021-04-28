import IComponents from './IComponents';
import {SNode} from '../Components/Components';

const createComponents = (
  node: SNode, components: IComponents = {}
): IComponents => {
  node.childs.forEach((n) => createComponents(n, components));
  components[node.name] = node.elem;
  return components;
};

export default createComponents;

