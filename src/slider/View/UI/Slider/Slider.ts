import ISlider from './ISlider';

class Slider implements ISlider {
  private BEMVerticalMod: string
  constructor(protected component: HTMLElement) {
    this.BEMVerticalMod = this.component.classList[0] + '--vertical';
  }

  removeVerticalMod(): void {
    this.component.classList.remove(this.BEMVerticalMod);
  }

  addVerticalMod(): void {
    this.component.classList.add(this.BEMVerticalMod);
  }
}

export default Slider;

