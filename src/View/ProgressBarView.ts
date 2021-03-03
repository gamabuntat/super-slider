import View from './View';

export default class ProgressBarView extends View {
  constructor(
    progressBar: HTMLElement, 
    private referencePoint: number, 
    private offset: number
  ) {
    super(progressBar);
  }

  changeWidth(btnPos: number, relBtnW: number): void {
    const width = (
      Math.abs(this.referencePoint - btnPos) 
       - relBtnW * this.offset / 2
    );
    this.component.style.width = `${width * 100}%`;
  }
}

