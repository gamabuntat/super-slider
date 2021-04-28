import {STree} from './Components/Components';
import createSlider from './createSlider/createSlider';
import createComponents from './createComponents/createComponents';
// import Service from './Service/Service';
// import Model from './Model/Model';
// import TrackView from './View/TrackView';
// import ButtonView from './View/ButtonView';
// import DisplayView from './View/DisplayView';
// import ProgressBarView from './View/ProgressBarView';
// import ScaleView from './View/ScaleView';
// import OrientationType from './View/OrientationType';
// import PresenterStorage from './Presenter/PresenterStorage';
// import Presenter from './Presenter/Presenter';

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (o = {}, ...args) {
      const id = this.attr('id');
      if (!id) { return this; }
      if (typeof o == 'object') {
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
            {elementType: 'div', name: 'track', isVertical},
            {elementType: 'button', name: 'buttonStart', isVertical},
            {elementType: 'div', name: 'displayStart', isVertical},
            isInterval 
              && {elementType: 'button', name: 'buttonEnd', isVertical},
            isInterval
              && {elementType: 'div', name: 'displayEnd', isVertical}
          )
          .add(
            'track',
            {elementType: 'div', name: 'progressBarStart', isVertical},
            isInterval
              && {elementType: 'div', name: 'progressBarEnd', isVertical},
          );
        const components = createComponents(sTree.root);
        this[0].insertAdjacentElement('beforeend', createSlider(sTree.root));
        components.foremostContainer.dataset.interval = String(isInterval);
      }
      return this;
    };
  })();
})(jQuery);

