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
        this.scaleX = 0;
        this.btnW = 0;
    }
    setX(e) {
        this.x = e.clientX;
        const { x, scaleX, btnW } = this;
        this.emit('changeX', { x, scaleX, btnW });
    }
    keepElementRect(scale, button) {
        this.scaleX = scale.x;
        this.btnW = button.width;
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
        button.on('movePointer', (e) => this.setNewX(e));
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
        this.component.addEventListener('pointerdown', (e) => {
            this.component.setPointerCapture(e.pointerId);
            this.addListener();
        });
    }
    moveButton(x, scaleX, btnWidth) {
        this.component.style.left = x - scaleX - btnWidth / 2 + 'px';
    }
    addListener() {
        this.component.addEventListener('pointermove', (e) => this.genEvent(e));
    }
    genEvent(e) {
        this.emit('movePointer', { e });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovL21ldGFsYW1wLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7Ozs7Ozs7Ozs7QUNqQlA7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQyw4QkFBOEIsa0JBQWtCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDcEJGO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ3hCRjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQkFBa0IsR0FBRyxpQkFBaUI7QUFDdEMsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RixJQUFJO0FBQzdGO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsSUFBSTtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ3RDTDtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGdDQUFnQyxtQkFBTyxDQUFDLCtCQUFTO0FBQ2pELGVBQWUsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQixvQ0FBb0MsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IHZvaWQgMDtcbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfVxuICAgIG9uKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgKHRoaXMuZXZlbnRzW2V2dF0gfHwgKHRoaXMuZXZlbnRzW2V2dF0gPSBbXSkpLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW1pdChldnQsIGFyZ3MpIHtcbiAgICAgICAgKHRoaXMuZXZlbnRzW2V2dF0gfHwgW10pXG4gICAgICAgICAgICAuc2xpY2UoKVxuICAgICAgICAgICAgLmZvckVhY2goKGxzbikgPT4gbHNuKGFyZ3MpKTtcbiAgICB9XG59XG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKFwiLi9FdmVudEVtaXR0ZXJcIik7XG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50RW1pdHRlcl8xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoeyB4ID0gMCB9KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMuc2NhbGVYID0gMDtcbiAgICAgICAgdGhpcy5idG5XID0gMDtcbiAgICB9XG4gICAgc2V0WChlKSB7XG4gICAgICAgIHRoaXMueCA9IGUuY2xpZW50WDtcbiAgICAgICAgY29uc3QgeyB4LCBzY2FsZVgsIGJ0blcgfSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlWCcsIHsgeCwgc2NhbGVYLCBidG5XIH0pO1xuICAgIH1cbiAgICBrZWVwRWxlbWVudFJlY3Qoc2NhbGUsIGJ1dHRvbikge1xuICAgICAgICB0aGlzLnNjYWxlWCA9IHNjYWxlLng7XG4gICAgICAgIHRoaXMuYnRuVyA9IGJ1dHRvbi53aWR0aDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgUHJlc2VudGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgc2NhbGUsIGJ1dHRvbikge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIG1vZGVsLm9uKCdjaGFuZ2VYJywgKHgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FsbE1vdmVCdXR0b24oeCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY2FsZS5vbignY2xpY2tPblNjYWxlJywgKGUpID0+IHRoaXMuc2V0TmV3WChlKSk7XG4gICAgICAgIGJ1dHRvbi5vbignbW92ZVBvaW50ZXInLCAoZSkgPT4gdGhpcy5zZXROZXdYKGUpKTtcbiAgICB9XG4gICAgc2V0TmV3WChlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0WChlLmUpO1xuICAgIH1cbiAgICBjYWxsTW92ZUJ1dHRvbih7IHgsIHNjYWxlWCwgYnRuVyB9KSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLm1vdmVCdXR0b24oeCwgc2NhbGVYLCBidG5XKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5rZWVwRWxlbWVudFJlY3QodGhpcy5zY2FsZS5pbml0KCksIHRoaXMuYnV0dG9uLmluaXQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByZXNlbnRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CdXR0b25WaWV3ID0gZXhwb3J0cy5TY2FsZVZpZXcgPSB2b2lkIDA7XG5jb25zdCBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudEVtaXR0ZXJfMS5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbn1cbmNsYXNzIFNjYWxlVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHNjYWxlKSB7XG4gICAgICAgIHN1cGVyKHNjYWxlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZSkgPT4gdGhpcy5lbWl0KCdjbGlja09uU2NhbGUnLCB7IGUgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuU2NhbGVWaWV3ID0gU2NhbGVWaWV3O1xuY2xhc3MgQnV0dG9uVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbikge1xuICAgICAgICBzdXBlcihidXR0b24pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtb3ZlQnV0dG9uKHgsIHNjYWxlWCwgYnRuV2lkdGgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc3R5bGUubGVmdCA9IHggLSBzY2FsZVggLSBidG5XaWR0aCAvIDIgKyAncHgnO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCAoZSkgPT4gdGhpcy5nZW5FdmVudChlKSk7XG4gICAgfVxuICAgIGdlbkV2ZW50KGUpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdtb3ZlUG9pbnRlcicsIHsgZSB9KTtcbiAgICB9XG59XG5leHBvcnRzLkJ1dHRvblZpZXcgPSBCdXR0b25WaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb2RlbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vZGVsXCIpKTtcbmNvbnN0IFZpZXdfMSA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5jb25zdCBQcmVzZW50ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9QcmVzZW50ZXJcIikpO1xuKGZ1bmN0aW9uICgkKSB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IHt9O1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQuZm4uc2xpZGVyID0gZnVuY3Rpb24gKG8gPSB7fSwgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG8gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gW1xuICAgICAgICAgICAgICAgICAgICBbJ2RpdicsICd1aS1zbGlkZXJfX2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBbJ2RpdicsICd1aS1zbGlkZXJfX3NjYWxlJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnYnV0dG9uJywgJ3VpLXNsaWRlcl9fYnV0dG9uX3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgICgobyA9PT0gbnVsbCB8fCBvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvLmludGVydmFsKSA9PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBbJ2J1dHRvbicsICd1aS1zbGlkZXJfX2J1dHRvbl9lbmQnXSksXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChhcmdzKSA9PiBhcmdzKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChhcmdzKSA9PiBjcmVhdGVDb21wb25lbnQoYXJncykpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucmVkdWNlKChwbGFjZSwgZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZS5hcHBlbmQoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzWzBdO1xuICAgICAgICAgICAgICAgIH0sIHRoaXNbMF0pO1xuICAgICAgICAgICAgICAgIHN0b3JhZ2VbaWRdID0gbmV3IFByZXNlbnRlcl8xLmRlZmF1bHQobmV3IE1vZGVsXzEuZGVmYXVsdChvKSwgbmV3IFZpZXdfMS5TY2FsZVZpZXcoY29tcG9uZW50c1sxXSksIG5ldyBWaWV3XzEuQnV0dG9uVmlldyhjb21wb25lbnRzWzJdKSkuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG9wdGlvbnMgOignLCBhcmdzLCBzdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG59KShqUXVlcnkpO1xuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KFtlbGVtLCBlbGVtQ2xhc3NdKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtKTtcbiAgICBjb21wb25lbnQuY2xhc3NMaXN0LmFkZChlbGVtQ2xhc3MpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==