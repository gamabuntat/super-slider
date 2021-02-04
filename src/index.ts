import Model from './Model';

interface Storage {
  [id: string]: Model
}

export interface Options {
  x?: number
  max?: number
  min?: number
  vertical?: boolean
}

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (o: Options | string = {}, ...args): JQuery {
      if (typeof o == 'object') {
        const components = [
          ['div', 'ui-slider__container'],
          ['div', 'ui-slider__scale'],
          ['button', 'ui-slider__button_start'],
          ['button', 'ui-slider__button_end'],
        ]
          .map((args) => createComponent(args));
        const [container, scale, startButton, endButton] = components;
        components.reduce((place, e) => {
          place.append(e);
          return place === container ? place : e;
        }, this[0]);

      } else {
        console.log('no options :(', args);
      }
      return this;
    };
  })();
})(jQuery);

function createComponent([elem, elemClass]: string[]) {
  const component = document.createElement(elem);
  component.classList.add(elemClass);
  return component;
}
