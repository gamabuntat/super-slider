import './styles/slider.sass';

import View from './slider/View/View';

(function ($) {
  $.fn.slider = function () {
    console.log(
      new View()
    );
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

