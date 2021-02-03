import EventEmitter from 'EventEmitter';

interface Options {
  max?: number
  min?: number
}

interface Storage {
  [id: string]: EventEmitter
}

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (o: Options = {}): JQuery {
      if (typeof o !== 'string') {
        console.log(o);
      }
      const sliderID = this.attr('id') ?? '';
      if (sliderID !== '') {
        storage[sliderID] = new EventEmitter();
      }
      console.log(storage);
      return this;
    };
  })();
})(jQuery);
