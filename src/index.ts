interface JQuery {
    myPlugin: () => JQuery
}

(function ($) {
    $.fn.myPlugin = function() {
        console.log('this is fn');
        return this;
    };
})(jQuery);

console.log($('#slider1').myPlugin()[0]);

