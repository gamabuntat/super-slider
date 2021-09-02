import './styles/slider.sass';

import Presenter from './Presenter/Presenter';
import View from './View/View';
import Service from './Service/Service';

(function ($) {
  $.fn.slider = function (o?: IOptions) {
    this.destroy = () => {
      this[0].innerHTML = '';
      Service.getInstance().removeModel(this[0].id);
      return this;
    };

    this.subscribe = (cb: (r: IResponse) => void) => {
      Service.getInstance().subscribe(this[0].id, cb);
    };

    if (o) {
      const { isNew, model } = Service.getInstance().add(this[0].id, o);
      if (isNew) {
        new Presenter(
          Service.getInstance(), 
          new View(model, this[0]),
          model.id
        );
      }
    }

    return this;
  };
})(jQuery);

