import s from 'slider/styles/Slider.module.sass';

import ILabel from './ILabel';

class Label implements ILabel {
  constructor(protected component: HTMLElement) {}

  updateValue(v: string): void {
    this.component.textContent = v;
  }

  toggleHiddenMode(): void {
    this.component.classList.toggle(s.LabelHidden);
  }
}

export default Label;
