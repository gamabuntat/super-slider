import IView from 'slider/View/interfaces/IView';
import { IResponse } from 'slider/helpers/IResponse';

class Presenter {
  constructor(
    private view: IView,
    private model: { update(r: IResponse): void, sendRs(): IResponse }
  ) {
    this.view.on(this.model.sendRs(), this.handleViewUpdate.bind(this));
  }

  handleViewUpdate(response: IResponse): void {
    console.log(response);
    this.model.update(response);
  }
}

export default Presenter;

