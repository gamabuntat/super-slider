import IProgressBarView from './IProgressBarView';

abstract class ProgressBarView {
  constructor(protected component: HTMLElement) {}

  abstract resize(p: number): void;
}

class StartProgressBarView extends ProgressBarView implements IProgressBarView {
  resize(p: number): void {
    this.component.style.flexBasis = `${p * 100}%`;
  }
}

class EndProgressBarView extends ProgressBarView implements IProgressBarView {
  resize(p: number): void {
    this.component.style.flexBasis = `${(1 - p) * 100}%`;
  }
}

export { StartProgressBarView, EndProgressBarView };
