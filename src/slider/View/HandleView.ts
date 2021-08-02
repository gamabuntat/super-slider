import IHandle from '../interfaces/IHandle';

class HandleView {
  constructor(
    private handle: HTMLElement,
    { offset }: IHandle,
  ) {
    this.log(offset);
  }

  log(offset: number): void {
    console.log(`${this.handle} has offlet ${offset}`);
  }
}

export default HandleView;

