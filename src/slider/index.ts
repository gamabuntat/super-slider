import genRandomStr from 'helpers/genRandomStr';

import Presenter from './Presenter/Presenter';
import View from './View/View';
import Service from './Service/Service';
import init from './init';

(function ($) {
  $.fn.slider = function (o?: Options) {
    this[0].id ||= genRandomStr();

    this.destroy = () => {
      this[0].innerHTML = '';
      Service.getInstance().removeModel(this[0].id);
      return this;
    };

    this.subscribe = (cb: (r: Model) => void) => {
      Service.getInstance().subscribe(this[0].id, cb);
      return this;
    };

    if (o) {
      if (Service.getInstance().findModelIndex(this[0].id) === -1) {
        new Presenter(Service.getInstance(), new View(this[0]), this[0].id);
      }
      Service.getInstance().add(this[0].id, o);
    }

    return this;
  };

  init();
})(jQuery);
