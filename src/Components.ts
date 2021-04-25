// class Piped {
//   pipe(...fns: Array<(a: any) => any>) {
//     return fns.reduceRight((a, b) => (...args) => a(b(...args)));
//   }
// }

type TElemType = 'div' | 'button'

interface IData {
  elemType: TElemType
  name: string
  verticalMod?: boolean
}

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
    const defaultClass = SNode.getDefaultClass(this.name);
    const modClass = SNode.filterClass(
      SNode.getIsMod(defaultClass),
      SNode.getMod(this.name),
      defaultClass
    );
    const verticalClass = SNode.filterClass(
      data.verticalMod || false,
      SNode.getVerticalMod,
      defaultClass
    );
    this.elem = SNode.addClasses(
      SNode.createNodeElem(data.elemType),
      [modClass, verticalClass].reduce((acc, fn) => (
        fn(acc)
      ), [SNode.setPrefix(defaultClass)])
    );
  }

  static filterClass = (
    predicate: boolean,
    step: (c: string) => string,
    defaulClass: string
  ) => (acc: string[] | []): string[] => (
    predicate ? [...acc, SNode.setPrefix(step(defaulClass))] : acc
  )

  static getDefaultClass = (name: string) => (
    (name.match(/\w+(?=Start|End)/) || [name])[0]
  )

  static setPrefix(c: string): string {
    return `${SNode.prefix}${c}`;
  }

  static getIsMod(c: string): boolean {
    return ['button', 'display', 'progressBar'].includes(c);
  }

  static getMod = (name: string) => (defaultClass: string): string => (
    `${defaultClass}_${(name.match(/Start|End/) || ['whoops'])[0]}`
      .toLowerCase()
  )

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

const data: IData = {
  elemType: 'div',
  name: 'buttonStart',
  verticalMod: true
};

console.log(new SNode(data));

