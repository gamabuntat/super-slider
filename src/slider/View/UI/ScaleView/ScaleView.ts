import { IAllPositions } from 'slider/View/Config/IConfig';
import EventBinder from 'slider/EventBinder/EventBinder';
import IScaleView from './IScaleView';

class ScaleView extends EventBinder implements IScaleView {
  private scaleButtonClass: string
  private positions: number[] = []

  constructor(component: HTMLElement) {
    super(component);
    this.scaleButtonClass = this.getScaleButtonClass();
  }

  update({ positions, absolutePositions }: IAllPositions): void {
    this.positions = positions;
  }

  private getScaleButtonClass(): string {
    return `${this.component.classList[0].replace(/--.*/, '')}-button`;
  }

  private getNewScaleButton(): HTMLElement {
    const b = document.createElement('button');
    b.classList.add(this.scaleButtonClass);
    return b;
  }
}

export default ScaleView;

