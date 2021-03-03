import Service from './Service/Service';
import Model from './Model/Model';
import ScaleView from './View/TrackView';
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
  step?: number
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
          ['div', 'ui-slider__track'],
          ['button', 'ui-slider__button_start'],
          ['div', 'ui-slider__display_start'],
          ['div', 'ui-slider__progress-bar_start'],
          isInterval && ['button', 'ui-slider__button_end'],
          isInterval && ['div', 'ui-slider__display_end'],
          isInterval && ['div', 'ui-slider__progress-bar_end'],
        ]
          .filter((args) => args)
          .map((args) => createComponent(args as string[]));
        components.reduce((place, e) => {
          [...e.classList].find((c) => c.includes('progress')) 
            && (place = components[1]);
          place.append(e);
          return components[0];
        }, this[0]);
        const [
          container,
          track,
          buttonS,
          displayS,
          progressBarS,
          buttonE = false,
          displayE = false,
          progressBarE = false,
        ] = components;
        const buttonW = buttonS.getBoundingClientRect().width;
        container.style.margin = `0 ${buttonW * (isInterval ? 1 : 0.5)}px`;
        storage[id] = new Presenter(
          new Service(
            new Model(track, buttonS, buttonE, displayS, o)
          ),
          new ScaleView(
            track, 
            buttonW * (isInterval ? 1 : 0)
          ),
          new ButtonView(
            buttonS,
            -buttonW * (isInterval ? 1 : 0.5)
          ),
          new DisplayView(
            displayS,
            -buttonW * (isInterval ? 1 : 0.5),
            buttonW
          ),
          buttonE && new ButtonView(
            buttonE, 0
          ),
          displayE && new DisplayView(
            displayE, 0, buttonW
          ),
        ).init();
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

