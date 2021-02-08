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
        this.scaleW = 0;
        this.btnW = 0;
    }
    setX(e) {
        this.x = e.clientX;
        const { x, scaleX, scaleW, btnW } = this;
        this.emit('changeX', { x, scaleX, scaleW, btnW });
    }
    updateElementsSizes(scale, button) {
        this.scaleX = scale.x;
        this.scaleW = scale.width;
        if (button) {
            this.btnW = button.width;
        }
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
        button.on('movePointer', () => this.updateSizes())
            .on('movePointer', (e) => this.setNewX(e));
    }
    updateSizes() {
        this.model.updateElementsSizes(this.scale.init());
    }
    setNewX(e) {
        this.model.setX(e.e);
    }
    callMoveButton({ x, scaleX, scaleW, btnW }) {
        this.button.moveButton(x, scaleX, scaleW, btnW);
    }
    init() {
        this.model.updateElementsSizes(this.scale.init(), this.button.init());
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
        this.isTriggerd = false;
        this.component.addEventListener('pointerdown', (e) => {
            this.isTriggerd = true;
            this.component.setPointerCapture(e.pointerId);
        });
        this.component.addEventListener('pointerup', () => this.isTriggerd = false);
        this.component.addEventListener('pointermove', (e) => this.genEvent(e));
    }
    moveButton(x, scaleX, scaleW, btnW) {
        const btnPosition = Math.min(scaleW - btnW, Math.max((x - scaleX - btnW / 2), 0));
        this.component.style.left = `${btnPosition}px`;
    }
    genEvent(e) {
        this.isTriggerd && this.emit('movePointer', { e });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovL21ldGFsYW1wLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7Ozs7Ozs7Ozs7QUNqQlA7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMEJBQTBCO0FBQ3pDLDhCQUE4QiwwQkFBMEI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUN4QkY7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUM1QkY7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsa0JBQWtCLEdBQUcsaUJBQWlCO0FBQ3RDLHVCQUF1QixtQkFBTyxDQUFDLDZDQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUYsSUFBSTtBQUM3RjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0EscURBQXFELElBQUk7QUFDekQ7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUN2Q0w7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQ0FBZ0MsbUJBQU8sQ0FBQywrQkFBUztBQUNqRCxlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0Isb0NBQW9DLG1CQUFPLENBQUMsdUNBQWE7QUFDekQ7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSB2b2lkIDA7XG5jbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBvbihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgICh0aGlzLmV2ZW50c1tldnRdIHx8ICh0aGlzLmV2ZW50c1tldnRdID0gW10pKS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZ0LCBhcmdzKSB7XG4gICAgICAgICh0aGlzLmV2ZW50c1tldnRdIHx8IFtdKVxuICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgIC5mb3JFYWNoKChsc24pID0+IGxzbihhcmdzKSk7XG4gICAgfVxufVxuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gcmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpO1xuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXJfMS5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHsgeCA9IDAgfSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnNjYWxlWCA9IDA7XG4gICAgICAgIHRoaXMuc2NhbGVXID0gMDtcbiAgICAgICAgdGhpcy5idG5XID0gMDtcbiAgICB9XG4gICAgc2V0WChlKSB7XG4gICAgICAgIHRoaXMueCA9IGUuY2xpZW50WDtcbiAgICAgICAgY29uc3QgeyB4LCBzY2FsZVgsIHNjYWxlVywgYnRuVyB9ID0gdGhpcztcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2VYJywgeyB4LCBzY2FsZVgsIHNjYWxlVywgYnRuVyB9KTtcbiAgICB9XG4gICAgdXBkYXRlRWxlbWVudHNTaXplcyhzY2FsZSwgYnV0dG9uKSB7XG4gICAgICAgIHRoaXMuc2NhbGVYID0gc2NhbGUueDtcbiAgICAgICAgdGhpcy5zY2FsZVcgPSBzY2FsZS53aWR0aDtcbiAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5idG5XID0gYnV0dG9uLndpZHRoO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFByZXNlbnRlciB7XG4gICAgY29uc3RydWN0b3IobW9kZWwsIHNjYWxlLCBidXR0b24pIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gYnV0dG9uO1xuICAgICAgICBtb2RlbC5vbignY2hhbmdlWCcsICh4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGxNb3ZlQnV0dG9uKHgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NhbGUub24oJ2NsaWNrT25TY2FsZScsIChlKSA9PiB0aGlzLnNldE5ld1goZSkpO1xuICAgICAgICBidXR0b24ub24oJ21vdmVQb2ludGVyJywgKCkgPT4gdGhpcy51cGRhdGVTaXplcygpKVxuICAgICAgICAgICAgLm9uKCdtb3ZlUG9pbnRlcicsIChlKSA9PiB0aGlzLnNldE5ld1goZSkpO1xuICAgIH1cbiAgICB1cGRhdGVTaXplcygpIHtcbiAgICAgICAgdGhpcy5tb2RlbC51cGRhdGVFbGVtZW50c1NpemVzKHRoaXMuc2NhbGUuaW5pdCgpKTtcbiAgICB9XG4gICAgc2V0TmV3WChlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0WChlLmUpO1xuICAgIH1cbiAgICBjYWxsTW92ZUJ1dHRvbih7IHgsIHNjYWxlWCwgc2NhbGVXLCBidG5XIH0pIHtcbiAgICAgICAgdGhpcy5idXR0b24ubW92ZUJ1dHRvbih4LCBzY2FsZVgsIHNjYWxlVywgYnRuVyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMubW9kZWwudXBkYXRlRWxlbWVudHNTaXplcyh0aGlzLnNjYWxlLmluaXQoKSwgdGhpcy5idXR0b24uaW5pdCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJlc2VudGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJ1dHRvblZpZXcgPSBleHBvcnRzLlNjYWxlVmlldyA9IHZvaWQgMDtcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gcmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpO1xuY2xhc3MgVmlldyBleHRlbmRzIEV2ZW50RW1pdHRlcl8xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxufVxuY2xhc3MgU2NhbGVWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3Ioc2NhbGUpIHtcbiAgICAgICAgc3VwZXIoc2NhbGUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB0aGlzLmVtaXQoJ2NsaWNrT25TY2FsZScsIHsgZSB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5TY2FsZVZpZXcgPSBTY2FsZVZpZXc7XG5jbGFzcyBCdXR0b25WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IoYnV0dG9uKSB7XG4gICAgICAgIHN1cGVyKGJ1dHRvbik7XG4gICAgICAgIHRoaXMuaXNUcmlnZ2VyZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzVHJpZ2dlcmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0UG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKCkgPT4gdGhpcy5pc1RyaWdnZXJkID0gZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIChlKSA9PiB0aGlzLmdlbkV2ZW50KGUpKTtcbiAgICB9XG4gICAgbW92ZUJ1dHRvbih4LCBzY2FsZVgsIHNjYWxlVywgYnRuVykge1xuICAgICAgICBjb25zdCBidG5Qb3NpdGlvbiA9IE1hdGgubWluKHNjYWxlVyAtIGJ0blcsIE1hdGgubWF4KCh4IC0gc2NhbGVYIC0gYnRuVyAvIDIpLCAwKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnN0eWxlLmxlZnQgPSBgJHtidG5Qb3NpdGlvbn1weGA7XG4gICAgfVxuICAgIGdlbkV2ZW50KGUpIHtcbiAgICAgICAgdGhpcy5pc1RyaWdnZXJkICYmIHRoaXMuZW1pdCgnbW92ZVBvaW50ZXInLCB7IGUgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5CdXR0b25WaWV3ID0gQnV0dG9uVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb2RlbFwiKSk7XG5jb25zdCBWaWV3XzEgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuY29uc3QgUHJlc2VudGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJlc2VudGVyXCIpKTtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB7fTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uIChvID0ge30sIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWydkaXYnLCAndWktc2xpZGVyX19jb250YWluZXInXSxcbiAgICAgICAgICAgICAgICAgICAgWydkaXYnLCAndWktc2xpZGVyX19zY2FsZSddLFxuICAgICAgICAgICAgICAgICAgICBbJ2J1dHRvbicsICd1aS1zbGlkZXJfX2J1dHRvbl9zdGFydCddLFxuICAgICAgICAgICAgICAgICAgICAoKG8gPT09IG51bGwgfHwgbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogby5pbnRlcnZhbCkgPT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgWydidXR0b24nLCAndWktc2xpZGVyX19idXR0b25fZW5kJ10pLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoYXJncykgPT4gYXJncylcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoYXJncykgPT4gY3JlYXRlQ29tcG9uZW50KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnJlZHVjZSgocGxhY2UsIGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2UuYXBwZW5kKGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50c1swXTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzWzBdKTtcbiAgICAgICAgICAgICAgICBzdG9yYWdlW2lkXSA9IG5ldyBQcmVzZW50ZXJfMS5kZWZhdWx0KG5ldyBNb2RlbF8xLmRlZmF1bHQobyksIG5ldyBWaWV3XzEuU2NhbGVWaWV3KGNvbXBvbmVudHNbMV0pLCBuZXcgVmlld18xLkJ1dHRvblZpZXcoY29tcG9uZW50c1syXSkpLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBvcHRpb25zIDooJywgYXJncywgc3RvcmFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSkoalF1ZXJ5KTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChbZWxlbSwgZWxlbUNsYXNzXSkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbSk7XG4gICAgY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZWxlbUNsYXNzKTtcbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=