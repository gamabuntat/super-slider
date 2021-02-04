/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/EventEmitter.ts":
/*!*****************************!*\
  !*** ./src/EventEmitter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(evt, listener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, ...arg) {
        (this._events[evt] || []).slice().forEach((lsn) => lsn(...arg));
    }
}
exports.default = EventEmitter;


/***/ }),

/***/ "./src/Model.ts":
/*!**********************!*\
  !*** ./src/Model.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventEmitter_1 = __importDefault(__webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts"));
class Model extends EventEmitter_1.default {
    constructor(o) {
        super();
        this.options = o;
    }
    setX(x) {
        this.options.x = x;
    }
}
exports.default = Model;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Model_1 = __importDefault(__webpack_require__(/*! ./Model */ "./src/Model.ts"));
(function ($) {
    const storage = {};
    (function () {
        $.fn.slider = function (o = {}, ...args) {
            var _a;
            if (typeof o == 'object') {
                const components = {
                    container: createComponent('div', 'ui-slider__container'),
                    scale: createComponent('div', 'ui-slider__scale'),
                    startButton: createComponent('button', 'ui-slider__button_start'),
                    endButton: (o === null || o === void 0 ? void 0 : o.vertical) === true
                        && createComponent('button', 'ui-slider__button_end'),
                };
                Object.values(components)
                    .reduce((place, e) => {
                    if (place && e) {
                        place.insertAdjacentElement('beforeend', e);
                    }
                    if (place === components.container) {
                        return place;
                    }
                    return e;
                }, this[0]);
                storage[(_a = this.attr('id')) !== null && _a !== void 0 ? _a : ''] = new Model_1.default(o);
                // const id = this.attr('id') ?? '';
                // storage[id] = new Model();
            }
            else {
                console.log('no options :(', args);
            }
            return this;
        };
    })();
})(jQuery);
function createComponent(elem, elemClass) {
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ2RGO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUNBQXVDLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDZkY7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQ0FBZ0MsbUJBQU8sQ0FBQywrQkFBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzVDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgb24oZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICAodGhpcy5fZXZlbnRzW2V2dF0gfHwgKHRoaXMuX2V2ZW50c1tldnRdID0gW10pKS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZ0LCAuLi5hcmcpIHtcbiAgICAgICAgKHRoaXMuX2V2ZW50c1tldnRdIHx8IFtdKS5zbGljZSgpLmZvckVhY2goKGxzbikgPT4gbHNuKC4uLmFyZykpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RW1pdHRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iobykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvO1xuICAgIH1cbiAgICBzZXRYKHgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnggPSB4O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb2RlbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vZGVsXCIpKTtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB7fTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uIChvID0ge30sIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbyA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogY3JlYXRlQ29tcG9uZW50KCdkaXYnLCAndWktc2xpZGVyX19jb250YWluZXInKSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IGNyZWF0ZUNvbXBvbmVudCgnZGl2JywgJ3VpLXNsaWRlcl9fc2NhbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b246IGNyZWF0ZUNvbXBvbmVudCgnYnV0dG9uJywgJ3VpLXNsaWRlcl9fYnV0dG9uX3N0YXJ0JyksXG4gICAgICAgICAgICAgICAgICAgIGVuZEJ1dHRvbjogKG8gPT09IG51bGwgfHwgbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogby52ZXJ0aWNhbCkgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGNyZWF0ZUNvbXBvbmVudCgnYnV0dG9uJywgJ3VpLXNsaWRlcl9fYnV0dG9uX2VuZCcpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhjb21wb25lbnRzKVxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChwbGFjZSwgZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2UgJiYgZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2UgPT09IGNvbXBvbmVudHMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxhY2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfSwgdGhpc1swXSk7XG4gICAgICAgICAgICAgICAgc3RvcmFnZVsoX2EgPSB0aGlzLmF0dHIoJ2lkJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnXSA9IG5ldyBNb2RlbF8xLmRlZmF1bHQobyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgaWQgPSB0aGlzLmF0dHIoJ2lkJykgPz8gJyc7XG4gICAgICAgICAgICAgICAgLy8gc3RvcmFnZVtpZF0gPSBuZXcgTW9kZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBvcHRpb25zIDooJywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSkoalF1ZXJ5KTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChlbGVtLCBlbGVtQ2xhc3MpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW0pO1xuICAgIGNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGVsZW1DbGFzcyk7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9