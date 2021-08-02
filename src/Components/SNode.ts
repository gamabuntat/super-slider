import Node from './Node';
import ISNodeData from './ISNodeData';

class SNode extends Node {
  static prefix = 'ui-slider__'
  elem: HTMLElement
  constructor({name, elementType, isInterval, isVertical}: ISNodeData) {
    super(name);
    this.elem = document.createElement(elementType);
    const defaultClass = SNode.addPrefix(this.getDefaultClass());
    this.setMod(defaultClass, this.spotMod());
    this.setVerticalMod(defaultClass, isVertical);
    this.setIntervalMod(defaultClass, isInterval);
  }

  setMod(defaultClass: string, mod: string): void {
    mod === '' 
      ? this.addMod(defaultClass) 
      : this.addMod(defaultClass + '--' + mod);
  }

  setVerticalMod(defaultClass: string, isVertical?: boolean): void {
    isVertical && this.addMod(defaultClass + '--' + 'vertical');
  }

  setIntervalMod(defaultClass: string, isInterval?: boolean): void {
    isInterval && this.addMod(defaultClass + '--' + 'interval');
  }

  getDefaultClass(): string {
    return this.name
      .replace(/([S|s][T|t][A|a][R|r][T|t])|([E|e][N|n][D|d])/, '')
      .replace(/(?<=.)[A-Z]/g, '-$&')
      .replace(/\s(?!-)/g, '-')
      .replace(/\s/g, '')
      .toLowerCase();
  }

  spotMod(): string {
    return (this.name.toLowerCase().match(/(start|end)/) || [''])[0];
  }

  addMod(mod: string): void {
    this.elem.classList.add(mod);
  }

  static addPrefix(s: string): string {
    return SNode.prefix + s;
  }
}

export default SNode;

