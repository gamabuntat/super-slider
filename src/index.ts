import './slider/styles/slider.sass';

(function ($) {
  $.fn.slider = function () {
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

