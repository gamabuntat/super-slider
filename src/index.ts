import './slider/styles/slider.sass';

import treeTemplate from './slider/treeTemplate';
import View from './slider/View/View';

(function ($) {
  $.fn.slider = function () {
    console.log(
      new View(treeTemplate)
    );
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

