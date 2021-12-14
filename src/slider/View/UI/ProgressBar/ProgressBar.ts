import IProgressBar from './IProgressBar';

abstract class ProgressBar {
  constructor(protected component: HTMLElement) {}

  abstract resize(p: number): void;
}

class StartProgressBar extends ProgressBar implements IProgressBar {
  resize(p: number): void {
    this.component.style.flexBasis = `${p * 100}%`;
  }
}

class EndProgressBar extends ProgressBar implements IProgressBar {
  resize(p: number): void {
    this.component.style.flexBasis = `${(1 - p) * 100}%`;
  }
}

export { StartProgressBar, EndProgressBar };
