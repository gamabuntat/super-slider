import './styles/slider.sass';

import View from './slider/View/View';

(function ($) {
  $.fn.slider = function () {
    new View({ 
      id: 'hihe',
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
    }, this[0])
      .parseResponse({
        id: 'hie',
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

    this.hi = () => console.log('hi'), this;

    return this;
  };
})(jQuery || {});

$('#slider1').slider().hi();
$('#slider2').slider().hi();

