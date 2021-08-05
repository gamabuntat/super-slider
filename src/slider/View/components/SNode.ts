import Node from './Node';

class SNode extends Node {
  static prefix = 'ui-slider__'
  elem: HTMLElement
  constructor(name: string, elementType: string) {
    super(name);
    this.elem = document.createElement(elementType);
    this.elem.classList.add(SNode.prefix + this.getDefaultClass());
  }

  getDefaultClass(): string {
    return this.name
      .replace(/(?<=.)[A-Z]/g, '-$&')
      .toLowerCase()
      .replace(
        /(?<base1>.*(?=-(start|end)))(?<mod>-(start|end))(?<base2>.*)/,
        "$<base1>$<base2>-$<mod>"
      );
  }
}

export default SNode;

