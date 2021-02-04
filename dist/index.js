/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
(function ($) {
    const storage = {};
    (function () {
        $.fn.slider = function (o = {}, ...args) {
            if (typeof o == 'object') {
                const components = [
                    ['div', 'ui-slider__container'],
                    ['div', 'ui-slider__scale'],
                    ['button', 'ui-slider__button_start'],
                    ['button', 'ui-slider__button_end'],
                ]
                    .map((args) => createComponent(args));
                const [container, scale, startButton, endButton] = components;
                console.log(components.reduce((place, e) => {
                    place.append(e);
                    return place === container ? place : e;
                }, this[0]), components);
            }
            else {
                console.log('no options :(', args);
            }
            return this;
        };
    })();
})(jQuery);
function createComponent([elem, elemClass]) {
    const component = document.createElement(elem);
    component.classList.add(elemClass);
    return component;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9tZXRhbGFtcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXRhbGFtcC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDL0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB7fTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uIChvID0ge30sIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbyA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFsnZGl2JywgJ3VpLXNsaWRlcl9fY29udGFpbmVyJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnZGl2JywgJ3VpLXNsaWRlcl9fc2NhbGUnXSxcbiAgICAgICAgICAgICAgICAgICAgWydidXR0b24nLCAndWktc2xpZGVyX19idXR0b25fc3RhcnQnXSxcbiAgICAgICAgICAgICAgICAgICAgWydidXR0b24nLCAndWktc2xpZGVyX19idXR0b25fZW5kJ10sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAubWFwKChhcmdzKSA9PiBjcmVhdGVDb21wb25lbnQoYXJncykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IFtjb250YWluZXIsIHNjYWxlLCBzdGFydEJ1dHRvbiwgZW5kQnV0dG9uXSA9IGNvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29tcG9uZW50cy5yZWR1Y2UoKHBsYWNlLCBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZChlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYWNlID09PSBjb250YWluZXIgPyBwbGFjZSA6IGU7XG4gICAgICAgICAgICAgICAgfSwgdGhpc1swXSksIGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG9wdGlvbnMgOignLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG59KShqUXVlcnkpO1xuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KFtlbGVtLCBlbGVtQ2xhc3NdKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtKTtcbiAgICBjb21wb25lbnQuY2xhc3NMaXN0LmFkZChlbGVtQ2xhc3MpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9