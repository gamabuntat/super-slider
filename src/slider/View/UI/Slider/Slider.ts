import ISlider from './ISlider';

class Slider implements ISlider {
  private BEMVerticalMod: string;
  private BEMIntervalMod: string;

  constructor(protected component: HTMLElement) {
    const BEMBlockName = this.component.classList[0];
    this.BEMVerticalMod = `${BEMBlockName}--vertical`;
    this.BEMIntervalMod = `${BEMBlockName}--interval`;
  }

  toggleVerticalMod(): void {
    this.component.classList.toggle(this.BEMVerticalMod);
  }

  toggleIntervalMod(): void {
    this.component.classList.toggle(this.BEMIntervalMod);
  }
}

export default Slider;
