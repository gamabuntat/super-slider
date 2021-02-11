import Model from './Model';
import ScaleView from './View/ScaleView';
import ButtonView from './View/ButtonView';

type btn = 'button' | 'buttonE'

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
    private buttonE: ButtonView | false,
  ) {
    this.model
      .on('changeX', (x) => this.callMoveButton(x as number[]))
      .on('setActiveButton', (btnAndPointerID) => (
        this.fixPointer(btnAndPointerID as [btn, number])
      ));
    this.scale
      // .on('clickOnScale', (e) => this.fixPointer(e as PointerEvent[]))
      .on('clickOnScale', () => this.setDefaultShiftX())
      .on('clickOnScale', (e) => this.setX(e as PointerEvent[]))
      .on('resizeElem', (rect) => this.updateScaleSizes(rect as DOMRect[]));
    [this.button, this.buttonE].forEach((b) => {
      b && b
        .on('pointerPressed', (e) => this.determineButton(e as PointerEvent[]))
        .on('pointerPressed', (eventAndRect) => (
          this.setShiftX(eventAndRect as [PointerEvent, DOMRect])
        ))
        .on('pointerMoved', (e) => this.setX(e as PointerEvent[]));
    });
  }

  callMoveButton([x, scaleX, scaleW, shiftX, btnW]: number[]): void {
    this.button.moveButton(x, scaleX, scaleW, shiftX, btnW);
  }

  fixPointer([btn, pointerId]: [btn, number]): void {
    const activeButton = this[btn];
    activeButton && activeButton.fixPointer(pointerId);
  }

  determineButton([e]: PointerEvent[]): void {
    this.model.determineButton(e);
  }

  setDefaultShiftX(): void {
    this.model.setDefaultShiftX();
  }

  setShiftX([e, btnRect]: [PointerEvent, DOMRect]): void {
    this.model.setShiftX(e, btnRect);
  }

  setX([e]: PointerEvent[]): void {
    this.model.setX(e);
  }

  updateScaleSizes([rect]: DOMRect[]): void {
    this.model.updateScaleSizes(rect);
  }
}

