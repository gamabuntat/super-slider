/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

(function ($) {
    const storage = {};
    (function () {
        $.fn.slider = function () {
            var _a;
            const sliderID = (_a = this.attr('id')) !== null && _a !== void 0 ? _a : '';
            if (sliderID !== '') {
                storage[sliderID] = this;
            }
            console.log(storage);
            return this;
        };
    })();
})(jQuery);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB7fTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlcklEID0gKF9hID0gdGhpcy5hdHRyKCdpZCcpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgICAgIGlmIChzbGlkZXJJRCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBzdG9yYWdlW3NsaWRlcklEXSA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdG9yYWdlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==