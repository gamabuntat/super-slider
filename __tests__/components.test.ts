import {SNode, STree} from '../src/Components/Components';

describe('SNode', () => {
  test('definition default class', () => {
    expect(SNode.getDefaultClass('HelloWorldStart')).toBe('hello-world');
    expect(SNode.getDefaultClass('endstartHelloEnd')).toBe('endstart-hello');
  });

  test('is mod?', () => {
    expect(SNode.getIsMod('StartButtonEnd')).toBe(true);
    expect(SNode.getIsMod('EndButton')).toBe(false);
  });

  test('get mod', () => {
    expect(SNode.getMod('StartButtonEnd')('start-button'))
      .toBe('start-button_end');
    expect(SNode.getMod('StartEndButton')('start-end-button'))
      .toBe('start-end-button_whoops');
  });

  test('correctly full class name', () => {
    expect(SNode.filterClass(
      SNode.getIsMod('buttonStartEnd'), 
      SNode.getMod('buttonStartEnd'),
      SNode.getDefaultClass('buttonStartEnd')
    )([])[0]).toBe('ui-slider__button-start_end');
  });
});

describe('STree', () => {
  const tree = new STree({ 
    name: 'main',
    elem: document.createElement('div'),
    childs: []
  });

  test('add elem in tree', () => {
    tree.addChilds(
      tree.root, 
      new SNode({elementType: 'div', name: 'A'}),
      new SNode({elementType: 'div', name: 'B'}),
      new SNode({elementType: 'div', name: 'C'}),
    );
    expect(tree.root.childs[0].name).toBe('A');
    expect(tree.root.childs[1].name).toBe('B');
    expect(tree.root.childs[2].name).toBe('C');

    tree.addChilds(
      tree.root.childs[0], 
      new SNode({elementType: 'div', name: 'AA'}),
    );
    expect(tree.root.childs[0].childs[0].name).toBe('AA');

    tree.addChilds(
      tree.root.childs[2], 
      new SNode({elementType: 'div', name: 'CC'}),
    );
    expect(tree.root.childs[2].childs[0].name).toBe('CC');
  });

  test('find tree elem correctly', () => {
    expect(tree.findNode('CC')?.name).toBe('CC');
    expect(tree.findNode('AA')?.name).toBe('AA');
    expect(tree.findNode('BB')).toBeNull();
  });
});

