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

// const cb = (i: IResponse) => (
//   console.log('\n'), console.log(i), console.log('\n')
// );

$('#slider1').slider({ step: 2.123, max: -32, min: -74, isInterval: true });
$('#slider2').slider({ isVertical: true });
$('#slider3')
  .slider({ isInterval: true, isVertical: true, min: -10, max: -2, step: 2 })
;

const $s = $('.js-hihe');
$s
  .slider({ isVertical: true, isInterval: true })
  .slider({ isVertical: true, min: -10, max: 0, from: 5, step: 2 })
  .slider({ isVertical: false })
;

$s.destroy();

$s.slider({from: 10, step: 10});

