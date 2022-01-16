import Presenter from './Presenter/Presenter';
import View from './View/View';
import Service from './Service/Service';
import init from './init';

(function ($) {
  $.fn.slider = function (o?: Options) {
    this.destroy = () => {
      this[0].innerHTML = '';
      Service.getInstance().removeModel(this[0].id);
      return this;
    };

    this.subscribe = (cb: (r: Model) => void) => {
      const id = Service.getInstance().subscribe(this[0].id, cb);
      this[0].id ||= id;
      return this;
    };

    if (o) {
      const { isNew, model } = Service.getInstance().add(this[0].id, o);

      if (isNew) {
        this[0].id = model.id;
        new Presenter(
          Service.getInstance(),
          new View(this[0]),
          model.id
        );
        Service.getInstance().add(model.id, o);
      }
    }

    return this;
  };

  init();
})(jQuery);
