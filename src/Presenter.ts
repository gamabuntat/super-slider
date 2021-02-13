import Model from './Model';
import ScaleView from './View/ScaleView';
import ButtonView from './View/ButtonView';

type btn = 'button' | 'buttonE'
type typeMoveButton = [btn, number, number, number, number, number]

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
    private buttonE: ButtonView | false,
  ) {
    this.model
      .on('changeX', (x) => this.callMoveButton(x as typeMoveButton))
      .on('setActiveButton', (btnAndPointerID) => (
        this.fixPointer(btnAndPointerID as [btn, number])
      ));
    this.scale
      // .on('clickOnScale', (e) => this.fixPointer(e as PointerEvent[]))
      .on('clickOnScale', () => this.setDefaultShiftX())
      .on('clickOnScale', (e) => this.setX(e as PointerEvent[]))
      .on('resizeElem', () => this.updateScaleSizes());
    [this.button, this.buttonE].forEach((b) => {
      b && b
        .on('pointerPressed', (e) => this.determineButton(e as PointerEvent[]))
        .on('pointerPressed', (e) => (
          this.setShiftX(e as PointerEvent[])
        ))
        .on('pointerMoved', (e) => this.setX(e as PointerEvent[]));
    });
  }

  callMoveButton(
    [btn, x, scaleX, scaleW, shiftX, btnW]: typeMoveButton
  ): void {
    this.selectActiveButton(btn).moveButton(x, scaleX, scaleW, shiftX, btnW);
  }

  fixPointer([btn, pointerId]: [btn, number]): void {
    this.selectActiveButton(btn).fixPointer(pointerId);
  }

  selectActiveButton(btn: btn): ButtonView {
    return this[btn] || this.button;
  }

  determineButton([e]: PointerEvent[]): void {
    this.model.determineButton(e);
  }

  setDefaultShiftX(): void {
    this.model.setDefaultShiftX();
  }

  setShiftX([e]: PointerEvent[]): void {
    this.model.setShiftX(e);
  }

  setX([e]: PointerEvent[]): void {
    this.model.setX(e);
  }

  updateScaleSizes(): void {
    this.model.updateScaleSizes();
  }
}

