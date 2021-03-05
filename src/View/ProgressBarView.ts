import View from './View';
import OrientationType from './OrientationType';

export default class ProgressBarView extends View {
  constructor(
    progressBar: HTMLElement, 
    orient: OrientationType,
    private referencePoint: number, 
    private offset: number
  ) {
    super(progressBar, orient);
  }

  changeWidth(btnPos: number, relBtnW: number): void {
    const value = (
      Math.abs(this.referencePoint - btnPos) 
       - relBtnW * this.offset / 2
    );
    this.component.style.width = `${value * 100}%`;
  }
}

