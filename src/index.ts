import Service from './Service/Service';
import Model from './Model/Model';
import TrackView from './View/TrackView';
import ButtonView from './View/ButtonView';
import DisplayView from './View/DisplayView';
import ProgressBarView from './View/ProgressBarView';
import ScaleView from './View/ScaleView';
import OrientationType from './View/OrientationType';
import PresenterStorage from './Presenter/PresenterStorage';
import Presenter from './Presenter/Presenter';

interface Storage {
  [id: string]: Presenter
}

interface Options {
  interval?: boolean
  vertical?: boolean
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
        this[0].innerHTML = '';
        const isInterval = o?.interval === true;
        const isVertical = o?.vertical === true;
        const orient = new OrientationType(isVertical);
        const components = [
          ['div', 'ui-slider__foremost-container'],
          ['div', 'ui-slider__main-container'],
          ['div', 'ui-slider__scale'],
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
        components.reduce((place, e, idx) => {
          [...e.classList].find((c) => c.includes('progress')) 
            && (place = components[4]);
          place.append(e);
          if (idx == 2) {
            return components[1];
          }
          return idx >= 3 ? components[3] : components[0];
        }, this[0]);
        const [
          foremostContainer,
          mainContainer,
          scale,
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
        const displaySW = displayS.getBoundingClientRect().width;
        foremostContainer.style.padding = `${(displaySW - buttonW) / 2}px`;
        mainContainer.style.padding = (
          isVertical 
            ? `${buttonW * (isInterval ? 1 : 0.5)}px 0`
            : `0 ${buttonW * (isInterval ? 1 : 0.5)}px`
        );
        storage[id] = new Presenter(
          new ScaleView(scale, orient, buttonW),
          new PresenterStorage(
            new ButtonView(
              buttonS, orient, buttonW * (isInterval ? -1 : -0.5),
            ),
            new DisplayView(
              displayS,
              orient,
              -buttonW * (isInterval ? 1 : 0.5),
              buttonW
            ),
            new ProgressBarView(
              progressBarS, orient, 0, (isInterval ? 1 : 0)
            ),
          ),
          (buttonE && displayE && progressBarE)
            && new PresenterStorage(
              new ButtonView(buttonE, orient, 0),
              new DisplayView(displayE, orient, 0, buttonW),
              new ProgressBarView(progressBarE, orient, 1, (isInterval ? 1 : 0))
            ),
          new TrackView(track, orient, buttonW * (isInterval ? 1 : 0)),
          new Service(new Model(track, buttonS, buttonE, displayS, o)),
        ).init();
        function createComponent([elem, elemClass]: string[]) {
          const component = document.createElement(elem);
          component.classList.add(elemClass);
          if (isVertical) {
            const defaultClass = elemClass.replace(/((?<!\_)\_[^\_]+|\_$)/, '');
            component.classList.add(`${defaultClass}_vertical`);
          }
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

