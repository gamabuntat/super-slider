import './styles/slider.sass';

import Presenter from './slider/Presenter/Presenter';
import View from './slider/View/View';
import Service from './slider/Service/Service';

(function ($) {
  $.fn.slider = function (o?: IOptions) {
    this.destroy = () => {
      this[0].innerHTML = '';
      Service.getInstance().removeModel(this[0].id);
      return this;
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

// $('#slider1').slider({ step: 2, max: 10, to: -12 });
// $('#slider2').slider({ isVertical: true });
// $('#slider3').slider({ isInterval: true });

const $s = $('.js-hihe');
$s
  .slider({ isVertical: true, isInterval: true })
  .slider({ isVertical: true, max: 4, from: 5, step: 2 })
  .slider({ isVertical: false })
;

$s.destroy();

$s.slider({from: 10});

