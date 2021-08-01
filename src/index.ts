import './slider/style/slider.sass';
import {Tree, SNode} from './Components/Components';
// import createSlider from './createSlider/createSlider';
// import createComponents from './createComponents/createComponents';
// import Service from './Service/Service';
// import Model from './Model/Model';
// import TrackView from './View/TrackView';
// import ButtonView from './View/ButtonView';
// import DisplayView from './View/DisplayView';
// import ProgressBarView from './View/ProgressBarView';
// import ScaleView from './View/ScaleView';
// import OrientationType from './View/OrientationType';
// import Presenter from './Presenter/Presenter';
// import PresenterStorage from './Presenter/PresenterStorage';

(function ($) {
  $.fn.slider = function () {
    console.log(
      new Tree(SNode, {elementType: 'div', name: 'rootstart'})
        .add(
          'rootstart',
          {elementType: 'button', name: 'button', isInterval: true},
          {elementType: 'div', name: 'div', isVertical: true}
        )
        .add(
          'button',
          {elementType: 'button', name: 'Adsa tARtEnDHihe dlska'}
        )
    );
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

