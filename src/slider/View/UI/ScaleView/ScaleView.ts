import EventBinder from 'slider/EventBinder/EventBinder';
import IScaleView from './IScaleView';

class ScaleView extends EventBinder implements IScaleView {
  private scaleButtonClass: string

  constructor(component: HTMLElement) {
    super(component);
    this.scaleButtonClass = this.getScaleButtonClass();
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

