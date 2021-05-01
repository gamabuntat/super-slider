import {SNode, STree} from '../src/Components/Components';

test('', () => {
  expect(SNode.getDefaultClass('HelloWorldStart')).toBe('hello-world');
});
