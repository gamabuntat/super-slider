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

  changeSize(btnPos: number, relBtnW: number): void {
    const value = (
      Math.abs(this.referencePoint - btnPos) 
       - relBtnW * this.offset / 2
    );
    this.component.style.flexBasis = `${value * 100}%`;
  }
}

