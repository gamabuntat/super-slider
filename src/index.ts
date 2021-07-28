import './slider/style/slider.sass';
import {STree, SNode} from './Components/Components';
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
    const tree = new STree(
      new SNode({elementType: 'div', name: 'container'})
    )
      .add(
        'container', 
        new SNode({elementType: 'button', name: 'ccc'}),
        new SNode({elementType: 'div', name: 'sss'})
      )
      .add(
        'ccc',
        new SNode({elementType: 'div', name: 'qqq'})
      );
    console.log(tree.findNode('container'));
    return this;
  };
})(jQuery || {});

$('.js-slider').slider();

