import './styles/slider.sass';

import View from './slider/View/View';

(function ($) {
  $.fn.slider = function () {
    new View({ 
      isVertical: true,
      isInterval: true,
      positions: [
        {
          max: 1,
          min: 0
        },
        {
          max: 1,
          min: 0
        }
      ]
    })
      .parseResponse({
        isVertical: false,
        isInterval: true,
        positions: [
          {
            max: 1,
            min: 0
          },
          {
            max: 1,
            min: 0
          }
        ]
      }) 
    ;
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

