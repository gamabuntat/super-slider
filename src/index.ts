import {STree} from './Components/Components';
import createSlider from './createSlider/createSlider';
import createComponents from './createComponents/createComponents';
import Service from './Service/Service';
import Model from './Model/Model';
import TrackView from './View/TrackView';
import ButtonView from './View/ButtonView';
import DisplayView from './View/DisplayView';
import ProgressBarView from './View/ProgressBarView';
import ScaleView from './View/ScaleView';
import OrientationType from './View/OrientationType';
import Presenter from './Presenter/Presenter';
import PresenterStorage from './Presenter/PresenterStorage';

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (o = {}, ...args) {
      const id = this.attr('id');
      if (!id) { return this; }
      if (typeof o == 'object') {
        this[0].innerHTML = '';
        const isInterval = !!o.interval;
        const isVertical = !!o.vertical;
        const sTree = STree.create({
          elementType: 'div',
          name: 'foremostContainer',
          isVertical
        })
          .add(
            'foremostContainer',
            {elementType: 'div', name: 'mainContainer', isVertical},
            {elementType: 'div', name: 'scale', isVertical},
          )
          .add(
            'mainContainer',
            {elementType: 'div', name: 'container', isVertical},
          )
          .add(
            'container',
            {elementType: 'div', name: 'track', isVertical, isInterval},
            {elementType: 'button', name: 'buttonStart', isVertical},
            {elementType: 'div', name: 'displayStart', isVertical},
            isInterval
              && {elementType: 'button', name: 'buttonEnd', isVertical},
            isInterval
              && {elementType: 'div', name: 'displayEnd', isVertical}
          )
          .add(
            'track',
            {
              elementType: 'div', 
              name: 'progressBarStart', 
              isVertical, 
              isInterval
            },
            isInterval && {
              elementType: 'div',
              name: 'progressBarEnd',
              isVertical,
              isInterval
            },
          );
        this[0].insertAdjacentElement('beforeend', createSlider(sTree.root));
        const c = createComponents(sTree.root);
        const orient = new OrientationType(isVertical);
        const buttonW = c.buttonStart.getBoundingClientRect().width;
        c.mainContainer.style.padding = isVertical
          ? `${buttonW * (isInterval ? 1 : 0.5)}px 0`
          : `0 ${buttonW * (isInterval ? 1 : 0.5)}px`;
        const offsets = {
          buttonS: {
            transformOffset: buttonW * (isInterval ? -1 : -0.5),
            offset: buttonW * (isInterval && isVertical
              ? 0 : isInterval ? 1 : 0.5),
          },
          buttonE: {
            offset: buttonW * (isVertical ? 1 : 0)
          },
          displayS: buttonW * (isInterval ? -1 : -0.5),
          progress: isInterval ? 1 : 0,
        };
        storage[id] = new Presenter(
          new ScaleView(c.scale, orient, buttonW),
          new PresenterStorage(
            new ButtonView(
              c.buttonStart,
              orient,
              offsets.buttonS.transformOffset,
              offsets.buttonS.offset,
            ),
            new DisplayView(
              c.displayStart, orient, offsets.displayS, buttonW
            ),
            new ProgressBarView(
              c.progressBarStart, orient, 0, offsets.progress
            ),
          ),
          isInterval && new PresenterStorage(
            new ButtonView(
              c.buttonEnd, orient, 0, offsets.buttonE.offset
            ),
            new DisplayView(c.displayEnd, orient, 0, buttonW),
            new ProgressBarView(
              c.progressBarEnd, orient, 1, offsets.progress
            )
          ),
          new Service(new Model(
            c.track, c.buttonStart, c.buttonEnd || false, c.displayStart, o
          )),
          new TrackView(c.track, orient, buttonW * (isInterval ? 1 : 0)),
        ).init();
      } else if (o == 'option') {
        if (args[0] == 'get') {
          return storage[id].getOptions();
        } else if (args[0] == 'move') {
          setTimeout(() => (
            storage[id].validateButtonPosition(args[1], args[2])
          ), 0);
        } else if (args[0] == 'toggleVisibility') {
          storage[id].updateVisibility(args[1]);
        }
      }
      return this;
    };
  })();
})(jQuery);
