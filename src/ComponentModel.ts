export default class ComponentModel {
  constructor(private scale: HTMLElement, private button: HTMLElement) {}

  getScaleRect(): DOMRect {
    return this.scale.getBoundingClientRect();
  }

  getButtonRect(): DOMRect {
    return this.button.getBoundingClientRect();
  }
}
