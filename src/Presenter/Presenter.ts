import Model from './Model';
import ScaleView from './View/ScaleView';
import ButtonView from './View/ButtonView';
import DisplayView from './View/DisplayView';

type btn = 'button' | 'buttonE'
type display = 'display' | 'displayE'
type typeMoveButton = [btn, number, number, number, number, number]
type typeMoveDisplay = [display, number, number, number, number, number]
type changeValue = [display, number, number]

export default class Presenter {
  constructor(
    private model: Model,
    private scale: ScaleView,
    private button: ButtonView,
    private display: DisplayView,
    private buttonE: ButtonView | false,
    private displayE: DisplayView | false
  ) {
    this.model
      .on('changeX', (x) => this.callMoveButton(x as typeMoveButton))
      .on('changeXDisplay', (x) => this.callMoveDisplay(x as typeMoveDisplay))
      .on('changeValue', (x) => this.changeDisplayValue(x as changeValue))
      .on('setActiveButton', (btnAndPointerID) => (
        this.fixPointer(btnAndPointerID as [btn, number])
      ));
    this.scale
      .on('clickOnScale', (e) => this.findButton(e as PointerEvent[]))
      .on('clickOnScale', () => this.setDefaultShiftX())
      .on('clickOnScale', (e) => this.setX(e as PointerEvent[]))
      .on('resizeElem', (entries) => (
        this.updateScaleSizes(...entries as [ResizeObserverEntry[]])));
    [this.button, this.buttonE].forEach((b) => {
      b && b
        .on('pointerPressed', (e) => this.defineButton(e as PointerEvent[]))
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

  callMoveDisplay([
    display, btnX, btnCenter, scaleX, maxExtreme, minExtreme
  ]: typeMoveDisplay): void {
    this.selectActiveDisplay(display)
      .moveDisplay(btnX, btnCenter, scaleX, maxExtreme, minExtreme);
  }

  changeDisplayValue([display, value]: changeValue): void {
    this.selectActiveDisplay(display).changeValue(value);
  }

  fixPointer([btn, pointerId]: [btn, number]): void {
    this.selectActiveButton(btn).fixPointer(pointerId);
  }

  selectActiveButton(btn: btn): ButtonView {
    return this[btn] || this.button;
  }

  selectActiveDisplay(display: display): DisplayView {
    return this[display] || this.display;
  }

  defineButton([e]: PointerEvent[]): void {
    this.model.defineButton(e);
  }

  findButton([e]: PointerEvent[]): void {
    this.model.findButton(e);
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

  updateScaleSizes(entries: ResizeObserverEntry[]): void {
    this.model.updateScaleSizes(entries);
  }
}

