import Model from './Model';

export interface Options {
  x?: number
  max?: number
  min?: number
  vertical?: boolean
}

interface Storage {
  [id: string]: Model
}

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (o: Options | string = {}, ...args): JQuery {
      if (typeof o == 'object') {
        const components = {
          container: createComponent('div', 'ui-slider__container'),
          scale: createComponent('div', 'ui-slider__scale'),
          startButton: createComponent('button', 'ui-slider__button_start'),
          endButton: o?.vertical === true
            && createComponent('button', 'ui-slider__button_end'),
        };

        Object.values(components)
          .reduce((place, e) => {
            if (place && e) {
              place.insertAdjacentElement('beforeend', e);
            }
            if (place === components.container) {
              return place;
            }
            return e;
          }, this[0]);

        storage[this.attr('id') ?? ''] = new Model(o);
        // const id = this.attr('id') ?? '';
        // storage[id] = new Model();
      } else {
        console.log('no options :(', args);
      }
      return this;
    };
  })();
})(jQuery);

function createComponent(elem: string, elemClass: string) {
  const component = document.createElement(elem);
  component.classList.add(elemClass);
  return component;
}
