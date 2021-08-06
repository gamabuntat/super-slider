import IView from './interfaces/IView';

abstract class ViewState {
  protected isTriggered = false

  constructor(protected context: IView) {}

  public abstract handleHandlePointerdown(): void

  public abstract handleHandlePointermove(): void
}

class ViewHorizontalState extends ViewState {
  handleHandlePointerdown(): void {
    this.isTriggered = true;
    console.log(this.context.getCurrentResponse());
    console.log('horizontal down');
  }

  handleHandlePointermove(): void {
    this.isTriggered = false;
    console.log('horizontal move');
  }
}

class ViewVerticalState extends ViewState {
  handleHandlePointerdown(): void {
    this.isTriggered = true;
    console.log('vertical down');
  }

  handleHandlePointermove(): void {
    this.isTriggered = false;
    console.log('vertical move');
  }
}

export { ViewState, ViewHorizontalState, ViewVerticalState };

