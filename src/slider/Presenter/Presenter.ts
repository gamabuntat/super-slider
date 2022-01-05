import IService from 'slider/Service/IService';
import type IView from 'slider/View/IView';

class Presenter {
  constructor(private service: IService, private view: IView, id: string) {
    service.on(id, this.handleModelUpdate);
    view.on(id, this.handleViewUpdate);
  }

  private handleModelUpdate = (response: Model): void => {
    this.view.parseResponse(response);
  };

  private handleViewUpdate = (response: Model): void => {
    this.service.updateModel(response);
  };
}

export default Presenter;
