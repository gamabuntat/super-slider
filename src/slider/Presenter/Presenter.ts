import IService from 'slider/Service/IService';
import IView from 'slider/View/interfaces/IView';

class Presenter {
  constructor(private service: IService, private view: IView, id: string) {
    service.on(id, this.handleModelUpdate);
    view.on(id, this.handleViewUpdate);
  }

  private handleModelUpdate = (response: ModelResponse): void => {
    this.view.parseResponse(response);
  };

  private handleViewUpdate = (response: ModelResponse): void => {
    this.service.updateModel(response);
  };
}

export default Presenter;
