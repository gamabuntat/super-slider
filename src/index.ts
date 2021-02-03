interface JQuery {
  slider: (o: Options | string, ...args: string[]) => JQuery
}

interface Options {
  max?: number
  min?: number
}

interface Storage {
  [id: string]: JQuery
}

(function ($) {
  const storage: Storage = {} as Storage;
  (function () {
    $.fn.slider = function (): JQuery {
      const sliderID = this.attr('id') ?? '';
      if (sliderID !== '') {
        storage[sliderID] = this;
      }
      console.log(storage);
      return this;
    };
  })();
})(jQuery);

