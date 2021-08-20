import { IService } from 'slider/Service/IService';
import IView from 'slider/View/interfaces/IView';
import IResponse from 'slider/interfaces/IResponse';

class Presenter {
  constructor(
    private service: IService,
    private view: IView,
    response: IResponse
  ) {
    service.on(response.id, this.handleModelUpdate);
    view.on(response.id, this.handleViewUpdate);
  }

  private handleModelUpdate = (response: IResponse): void => {
    this.view.parseResponse(response);
  }

  private handleViewUpdate = (response: IResponse): void  => {
    this.service.updateModel(response);
  }
}

export default Presenter;

