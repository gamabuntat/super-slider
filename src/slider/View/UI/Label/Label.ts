import ILabel from './ILabel';

class Label implements ILabel {
  private hiddenMod: string;

  constructor(protected component: HTMLElement) {
    this.hiddenMod = `${this.component.classList[0].replace(
      /--.*/,
      ''
    )}--hidden`;
  }

  updateValue(v: string): void {
    this.component.textContent = v;
  }

  toggleHiddenMode(): void {
    this.component.classList.toggle(this.hiddenMod);
  }
}

export default Label;
