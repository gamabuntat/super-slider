import {SNode} from '../Components/Components';

const createSlider = (node: SNode): HTMLElement => {
  return node.childs.reduce((acc, child) => {
    if (!child) { return acc; }
    acc.insertAdjacentElement('beforeend', createSlider(child));
    return acc;
  }, node.elem);
};

export default createSlider;

