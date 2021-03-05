import ButtonView from '../View/ButtonView';
import DisplayView from '../View/DisplayView';
import ProgressBarView from '../View/ProgressBarView';

export default class PresenterStorage {
  constructor(
    public button: ButtonView,
    public display: DisplayView,
    public progressBar: ProgressBarView
  ) {}
}
