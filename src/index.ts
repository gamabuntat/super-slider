import './slider/styles/slider.sass';
import HandleView from './slider/View/HandleView';

(function ($) {
  $.fn.slider = function () {
    const handle: HTMLElement | null = document.querySelector('.js-slider');
    if (handle) { new HandleView(handle); }
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

