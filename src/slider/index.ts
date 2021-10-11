import './styles/slider.sass';

import defaultOptions from 'slider/defaultOptions';
import Presenter from './Presenter/Presenter';
import View from './View/View';
import Service from './Service/Service';

function initSliders(): void {
  document.querySelectorAll("[data-super-slider]").forEach((s) => {
    const data = (<HTMLElement>s).dataset;
    const options: { [k: string]: number | boolean } = {};
    for (const o in defaultOptions) {
      // eslint-disable-next-line
      if (o in data) { options[o] = transformValue(o, data[o]!); }
    }
    $(s).slider(options);
  });
}

function transformValue(k: string, v: string): number | boolean {
  return k.includes('is') 
    ? v === 'false' 
      ? false 
      : true 
    : Number(v);
}

(function ($) {
  $.fn.slider = function (o?: IOptions) {
    this.destroy = () => {
      this[0].innerHTML = '';
      Service.getInstance().removeModel(this[0].id);
      return this;
    };

    this.subscribe = (cb: (r: IResponse) => void) => {
      const id = Service.getInstance().subscribe(this[0].id, cb);
      this[0].id ||= id;
      return this;
    };

    if (o) {
      const { isNew, model } = Service.getInstance().add(this[0].id, o);
      if (isNew) {
        new Presenter(
          Service.getInstance(), 
          new View(model, this[0]),
          model.id
        );
      }
    }

    return this;
  };

  document.addEventListener('DOMContentLoaded', initSliders);
})(jQuery);

