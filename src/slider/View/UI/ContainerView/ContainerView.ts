import IContainerView from './IContainerView';

abstract class ContainerView implements IContainerView {
  constructor(protected component: HTMLElement) {}

  abstract getCoord(): number

  abstract getSize(): number

  abstract swap(): IContainerView
}

class HorizontalContainerView extends ContainerView {
  getCoord(): number {
    return this.component.getBoundingClientRect().x;
  }

  getSize(): number {
    return this.component.getBoundingClientRect().width;
  }

  swap(): IContainerView {
    return new VerticalContainerView(this.component);
  }
}

class VerticalContainerView extends ContainerView {
  getCoord(): number {
    return this.component.getBoundingClientRect().y;
  }

  getSize(): number {
    return this.component.getBoundingClientRect().height;
  }

  swap(): IContainerView {
    return new HorizontalContainerView(this.component);
  }
}

export { HorizontalContainerView, VerticalContainerView };

