/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/EventEmitter.ts":
/*!*****************************!*\
  !*** ./src/EventEmitter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(evt, listener) {
        (this.events[evt] || (this.events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, args) {
        (this.events[evt] || [])
            .slice()
            .forEach((lsn) => lsn(args));
    }
}
exports.EventEmitter = EventEmitter;


/***/ }),

/***/ "./src/Model.ts":
/*!**********************!*\
  !*** ./src/Model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventEmitter_1 = __webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts");
class Model extends EventEmitter_1.EventEmitter {
    constructor({ x = 0 }) {
        super();
        this.x = x;
    }
    setX(e) {
        this.x = e.clientX;
        console.log(this.x);
    }
    keepElementRect(scale, button) {
        this.scaleRect = scale;
        this.buttonRect = button;
    }
    getScaleRect() {
        var _a, _b;
        return (_b = (_a = this.scaleRect) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0;
    }
}
exports.default = Model;


/***/ }),

/***/ "./src/Presenter.ts":
/*!**************************!*\
  !*** ./src/Presenter.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Presenter {
    constructor(model, scale, button) {
        this.model = model;
        this.scale = scale;
        this.button = button;
        model.on('changeX', (x) => {
            this.callMoveButton(x);
        });
        scale.on('clickOnScale', (e) => this.setNewX(e));
    }
    readModel() {
        console.log(this.model);
    }
    setNewX(e) {
        this.model.setX(e.e);
    }
    callMoveButton({ x, scaleX, btnW }) {
        this.button.moveButton(x, scaleX, btnW);
    }
    init() {
        this.model.keepElementRect(this.scale.init(), this.button.init());
        return this;
    }
    getRect() {
        return this.model.getScaleRect();
    }
}
exports.default = Presenter;


/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonView = exports.ScaleView = void 0;
const EventEmitter_1 = __webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts");
class View extends EventEmitter_1.EventEmitter {
    constructor(component) {
        super();
        this.component = component;
    }
    init() {
        return this.component.getBoundingClientRect();
    }
}
class ScaleView extends View {
    constructor(scale) {
        super(scale);
        this.component.addEventListener('pointerdown', (e) => this.emit('clickOnScale', { e }));
    }
}
exports.ScaleView = ScaleView;
class ButtonView extends View {
    constructor(button) {
        super(button);
    }
    moveButton(x, scaleX, btnWidth) {
        this.component.style.left = x - scaleX - btnWidth / 2 + 'px';
    }
}
exports.ButtonView = ButtonView;


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
const View_1 = __webpack_require__(/*! ./View */ "./src/View.ts");
const Presenter_1 = __importDefault(__webpack_require__(/*! ./Presenter */ "./src/Presenter.ts"));
(function ($) {
    const storage = {};
    (function () {
        $.fn.slider = function (o = {}, ...args) {
            const id = this.attr('id');
            if (!id) {
                return this;
            }
            if (typeof o == 'object') {
                const components = [
                    ['div', 'ui-slider__container'],
                    ['div', 'ui-slider__scale'],
                    ['button', 'ui-slider__button_start'],
                    ((o === null || o === void 0 ? void 0 : o.interval) == true
                        && ['button', 'ui-slider__button_end']),
                ]
                    .filter((args) => args)
                    .map((args) => createComponent(args));
                components.reduce((place, e) => {
                    place.append(e);
                    return components[0];
                }, this[0]);
                storage[id] = new Presenter_1.default(new Model_1.default(o), new View_1.ScaleView(components[1]), new View_1.ButtonView(components[2])).init();
                console.log(storage[id].getRect());
            }
            else {
                console.log('no options :(', args, storage);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovL21ldGFsYW1wLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7Ozs7Ozs7Ozs7QUNqQlA7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ3JCRjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDN0JGO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGlCQUFpQjtBQUN0Qyx1QkFBdUIsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUZBQXlGLElBQUk7QUFDN0Y7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzVCTDtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGdDQUFnQyxtQkFBTyxDQUFDLCtCQUFTO0FBQ2pELGVBQWUsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQixvQ0FBb0MsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDNUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gdm9pZCAwO1xuY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgb24oZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICAodGhpcy5ldmVudHNbZXZ0XSB8fCAodGhpcy5ldmVudHNbZXZ0XSA9IFtdKSkucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbWl0KGV2dCwgYXJncykge1xuICAgICAgICAodGhpcy5ldmVudHNbZXZ0XSB8fCBbXSlcbiAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAuZm9yRWFjaCgobHNuKSA9PiBsc24oYXJncykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKTtcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih7IHggPSAwIH0pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICB9XG4gICAgc2V0WChlKSB7XG4gICAgICAgIHRoaXMueCA9IGUuY2xpZW50WDtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy54KTtcbiAgICB9XG4gICAga2VlcEVsZW1lbnRSZWN0KHNjYWxlLCBidXR0b24pIHtcbiAgICAgICAgdGhpcy5zY2FsZVJlY3QgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5idXR0b25SZWN0ID0gYnV0dG9uO1xuICAgIH1cbiAgICBnZXRTY2FsZVJlY3QoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLnNjYWxlUmVjdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLndpZHRoKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBQcmVzZW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsLCBzY2FsZSwgYnV0dG9uKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgbW9kZWwub24oJ2NoYW5nZVgnLCAoeCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYWxsTW92ZUJ1dHRvbih4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjYWxlLm9uKCdjbGlja09uU2NhbGUnLCAoZSkgPT4gdGhpcy5zZXROZXdYKGUpKTtcbiAgICB9XG4gICAgcmVhZE1vZGVsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGVsKTtcbiAgICB9XG4gICAgc2V0TmV3WChlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0WChlLmUpO1xuICAgIH1cbiAgICBjYWxsTW92ZUJ1dHRvbih7IHgsIHNjYWxlWCwgYnRuVyB9KSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLm1vdmVCdXR0b24oeCwgc2NhbGVYLCBidG5XKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5rZWVwRWxlbWVudFJlY3QodGhpcy5zY2FsZS5pbml0KCksIHRoaXMuYnV0dG9uLmluaXQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRSZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5nZXRTY2FsZVJlY3QoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcmVzZW50ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQnV0dG9uVmlldyA9IGV4cG9ydHMuU2NhbGVWaWV3ID0gdm9pZCAwO1xuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKFwiLi9FdmVudEVtaXR0ZXJcIik7XG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG59XG5jbGFzcyBTY2FsZVZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihzY2FsZSkge1xuICAgICAgICBzdXBlcihzY2FsZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgKGUpID0+IHRoaXMuZW1pdCgnY2xpY2tPblNjYWxlJywgeyBlIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLlNjYWxlVmlldyA9IFNjYWxlVmlldztcbmNsYXNzIEJ1dHRvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihidXR0b24pIHtcbiAgICAgICAgc3VwZXIoYnV0dG9uKTtcbiAgICB9XG4gICAgbW92ZUJ1dHRvbih4LCBzY2FsZVgsIGJ0bldpZHRoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnN0eWxlLmxlZnQgPSB4IC0gc2NhbGVYIC0gYnRuV2lkdGggLyAyICsgJ3B4JztcbiAgICB9XG59XG5leHBvcnRzLkJ1dHRvblZpZXcgPSBCdXR0b25WaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb2RlbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vZGVsXCIpKTtcbmNvbnN0IFZpZXdfMSA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5jb25zdCBQcmVzZW50ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9QcmVzZW50ZXJcIikpO1xuKGZ1bmN0aW9uICgkKSB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IHt9O1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQuZm4uc2xpZGVyID0gZnVuY3Rpb24gKG8gPSB7fSwgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG8gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gW1xuICAgICAgICAgICAgICAgICAgICBbJ2RpdicsICd1aS1zbGlkZXJfX2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBbJ2RpdicsICd1aS1zbGlkZXJfX3NjYWxlJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnYnV0dG9uJywgJ3VpLXNsaWRlcl9fYnV0dG9uX3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgICgobyA9PT0gbnVsbCB8fCBvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvLmludGVydmFsKSA9PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBbJ2J1dHRvbicsICd1aS1zbGlkZXJfX2J1dHRvbl9lbmQnXSksXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChhcmdzKSA9PiBhcmdzKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChhcmdzKSA9PiBjcmVhdGVDb21wb25lbnQoYXJncykpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucmVkdWNlKChwbGFjZSwgZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZS5hcHBlbmQoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzWzBdO1xuICAgICAgICAgICAgICAgIH0sIHRoaXNbMF0pO1xuICAgICAgICAgICAgICAgIHN0b3JhZ2VbaWRdID0gbmV3IFByZXNlbnRlcl8xLmRlZmF1bHQobmV3IE1vZGVsXzEuZGVmYXVsdChvKSwgbmV3IFZpZXdfMS5TY2FsZVZpZXcoY29tcG9uZW50c1sxXSksIG5ldyBWaWV3XzEuQnV0dG9uVmlldyhjb21wb25lbnRzWzJdKSkuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0b3JhZ2VbaWRdLmdldFJlY3QoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gb3B0aW9ucyA6KCcsIGFyZ3MsIHN0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfSkoKTtcbn0pKGpRdWVyeSk7XG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnQoW2VsZW0sIGVsZW1DbGFzc10pIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW0pO1xuICAgIGNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGVsZW1DbGFzcyk7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9