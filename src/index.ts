import Model from './Model/Model';
import ScaleView from './View/ScaleView';
import ButtonView from './View/ButtonView';
import DisplayView from './View/DisplayView';
import Presenter from './Presenter/Presenter';

interface Storage {
  [id: string]: Presenter
}

interface Options {
  interval?: boolean
  min?: number
  max?: number
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
          ['div', 'ui-slider__display_start'],
          isInterval && ['button', 'ui-slider__button_end'],
          isInterval && ['div', 'ui-slider__display_end'],
        ]
          .filter((args) => args)
          .map((args) => createComponent(args as string[]));
        components.reduce((place, e) => {
          place.append(e);
          return components[0];
        }, this[0]);
        const [
          , scale, buttonS, display, buttonE = false, displayE = false
        ] = components;
        storage[id] = new Presenter(
          new Model(
            scale, buttonS, buttonE, o
          ),
          new ScaleView(scale),
          new ButtonView(buttonS),
          new DisplayView(display),
          buttonE && new ButtonView(buttonE),
          displayE && new DisplayView(displayE),
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

