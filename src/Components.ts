// class Piped {
//   pipe(...fns: Array<(a: any) => any>) {
//     return fns.reduceRight((a, b) => (...args) => a(b(...args)));
//   }
// }

type TElemType = 'div' | 'button'

interface IData {
  elemType: TElemType
  name: string
  defaultClass: string
  mod: boolean
  verticalMod: boolean
}

const data: IData = {
  elemType: 'button',
  name: 'buttonStart',
  defaultClass: 'button',
  mod: true,
  verticalMod: true
};

class SNode {
  static prefix = 'ui-slider__'
  name: string
  elem: HTMLElement
  childs: Node[] | []
  parent: Node | null
  constructor(data: IData) {
    this.name = data.name;
    this.childs = [];
    this.parent = null;
    const modeClass = SNode.filterClass(
      data.mod, 
      SNode.getMod(this.name),
      data.defaultClass
    );
    const verticalClass = SNode.filterClass(
      data.mod,
      SNode.getVerticalMod,
      data.defaultClass
    );
    this.elem = SNode.addClasses(
      SNode.createNodeElem(data.elemType),
      [modeClass, verticalClass].reduce((acc, fn) => (
        fn(acc)
      ), [SNode.setPrefix(data.defaultClass)])
    );
  }

  static filterClass = (
    predicate: boolean,
    step: (c: string) => string,
    defaulClass: string,
  ) => (acc: string[] | []): string[] => {
    return predicate ? [...acc, SNode.setPrefix(step(defaulClass))] : acc;
  }

  static setPrefix(c: string): string {
    return `${SNode.prefix}${c}`;
  }

  static getMod = (name: string) => (defaultClass: string): string => {
    return `${defaultClass}_${(name.match(/[S|E]\w*/) || [])[0]}`.toLowerCase();
  }

  static getVerticalMod(defaultClass: string): string {
    return `${defaultClass}_vertical`;
  }

  static addClasses(elem: HTMLElement, classes: string[]): HTMLElement {
    elem.classList.add(...classes);
    return elem;
  }

  static createNodeElem(elemType: TElemType): HTMLElement {
    return document.createElement(elemType);
  }
}

console.log(new SNode(data));
