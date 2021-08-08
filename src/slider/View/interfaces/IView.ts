import { IResponse } from 'slider/helpers/IResponse';


interface IView {
  parseResponse(response: IResponse): void
}

export default IView;

