import './styles/slider.sass';

import View from './slider/View/View';

(function ($) {
  $.fn.slider = function () {
    console.log(
      new View({ isVertical: false })
    );
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

