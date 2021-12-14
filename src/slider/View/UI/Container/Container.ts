import IContainer from './IContainer';

abstract class Container {
  constructor(protected component: HTMLElement) {}

  abstract getCoord(): number;

  abstract getSize(): number;

  abstract swap(): IContainer;
}

class HorizontalContainer extends Container implements IContainer {
  getCoord(): number {
    return this.component.getBoundingClientRect().x;
  }

  getSize(): number {
    return this.component.getBoundingClientRect().width;
  }

  swap(): IContainer {
    return new VerticalContainer(this.component);
  }
}

class VerticalContainer extends Container implements IContainer {
  getCoord(): number {
    return this.component.getBoundingClientRect().y;
  }

  getSize(): number {
    return this.component.getBoundingClientRect().height;
  }

  swap(): IContainer {
    return new HorizontalContainer(this.component);
  }
}

export { HorizontalContainer, VerticalContainer };
