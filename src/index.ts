import Model from './Model';
import ScaleView from './View/ScaleView';
import ButtonView from './View/ButtonView';
import Presenter from './Presenter';

interface Storage {
  [id: string]: Presenter
}

interface Options {
  interval?: boolean
}

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (o: Options | string = {}, ...args): JQuery {
      const id = this.attr('id');
      if (!id) {
        return this;
      }
      if (typeof o == 'object') {
        const isInterval = o?.interval === true;
        const components = [
          ['div', 'ui-slider__container'],
          ['div', 'ui-slider__scale'],
          ['button', 'ui-slider__button_start'],
          isInterval && ['button', 'ui-slider__button_end'],
        ]
          .filter((args) => args)
          .map((args) => createComponent(args as string[]));
        components.reduce((place, e) => {
          place.append(e);
          return components[0];
        }, this[0]);
        storage[id] = new Presenter(
          new Model(
            components[1],
            components[2],
            isInterval && components[3],
            o
          ),
          new ScaleView(components[1]),
          new ButtonView(components[2]),
          isInterval && new ButtonView(components[3]),
        );
        function createComponent([elem, elemClass]: string[]) {
          const component = document.createElement(elem);
          component.classList.add(elemClass);
          return component;
        }
      } else {
        console.log('no options :(', args, storage);
      }
      return this;
    };
  })();
})(jQuery);

export {Options};
