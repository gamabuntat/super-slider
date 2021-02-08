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
    constructor(scale, button, { x = 0 }) {
        super();
        this.scale = scale;
        this.button = button;
        this.x = x;
        this.scaleX = this.scale.getBoundingClientRect().x;
        this.scaleW = this.scale.getBoundingClientRect().width;
        this.btnW = this.button.getBoundingClientRect().width;
        this.shiftX = 0;
    }
    setShiftX(e) {
        this.shiftX = e.clientX - this.button.getBoundingClientRect().x;
    }
    setX(e) {
        this.x = e.clientX;
        this.updateElementsSizes();
        const { x, scaleX, scaleW, shiftX, btnW } = this;
        this.emit('changeX', { x, scaleX, scaleW, shiftX, btnW });
    }
    updateElementsSizes() {
        this.scaleX = this.scale.getBoundingClientRect().x;
        this.scaleW = this.scale.getBoundingClientRect().width;
        this.btnW === 0
            && (this.btnW = this.button.getBoundingClientRect().width);
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
        this.model.on('changeX', (x) => this.callMoveButton(x));
        this.scale.on('clickOnScale', (e) => this.setX(e));
        this.button.on('pointerPressed', (e) => this.setShiftX(e))
            .on('pointerMoved', (e) => this.setX(e));
    }
    setShiftX(e) {
        this.model.setShiftX(e);
    }
    setX(e) {
        this.model.setX(e);
    }
    callMoveButton({ x, scaleX, scaleW, shiftX, btnW }) {
        this.button.moveButton(x, scaleX, scaleW, shiftX, btnW);
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
}
class ScaleView extends View {
    constructor(scale) {
        super(scale);
        this.component.addEventListener('pointerdown', (e) => this.emit('clickOnScale', e));
    }
}
exports.ScaleView = ScaleView;
class ButtonView extends View {
    constructor(button) {
        super(button);
        this.isTriggerd = false;
        this.component.addEventListener('pointerdown', (e) => {
            this.toggleTrigger();
            this.component.setPointerCapture(e.pointerId);
            this.emit('pointerPressed', e);
        });
        this.component.addEventListener('pointerup', () => this.toggleTrigger());
        this.component.addEventListener('pointermove', (e) => this.isTriggerd && this.emit('pointerMoved', e));
    }
    toggleTrigger() {
        this.isTriggerd = this.isTriggerd ? false : true;
    }
    moveButton(x, scaleX, scaleW, shiftX, btnW) {
        const btnPosition = Math.min(scaleW - btnW, Math.max((x - scaleX - shiftX), 0));
        this.component.style.left = `${btnPosition}px`;
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
                storage[id] = new Presenter_1.default(new Model_1.default(components[1], components[2], o), new View_1.ScaleView(components[1]), new View_1.ButtonView(components[2]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovL21ldGFsYW1wLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7Ozs7Ozs7Ozs7QUNqQlA7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0EsZ0NBQWdDLFFBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQ0FBa0M7QUFDakQsOEJBQThCLGtDQUFrQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUM5QkY7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDdEJGO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGlCQUFpQjtBQUN0Qyx1QkFBdUIsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDckNMO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0NBQWdDLG1CQUFPLENBQUMsK0JBQVM7QUFDakQsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLG9DQUFvQyxtQkFBTyxDQUFDLHVDQUFhO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gdm9pZCAwO1xuY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgb24oZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICAodGhpcy5ldmVudHNbZXZ0XSB8fCAodGhpcy5ldmVudHNbZXZ0XSA9IFtdKSkucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbWl0KGV2dCwgYXJncykge1xuICAgICAgICAodGhpcy5ldmVudHNbZXZ0XSB8fCBbXSlcbiAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAuZm9yRWFjaCgobHNuKSA9PiBsc24oYXJncykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKTtcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzY2FsZSwgYnV0dG9uLCB7IHggPSAwIH0pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy5zY2FsZVggPSB0aGlzLnNjYWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XG4gICAgICAgIHRoaXMuc2NhbGVXID0gdGhpcy5zY2FsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgdGhpcy5idG5XID0gdGhpcy5idXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIHRoaXMuc2hpZnRYID0gMDtcbiAgICB9XG4gICAgc2V0U2hpZnRYKGUpIHtcbiAgICAgICAgdGhpcy5zaGlmdFggPSBlLmNsaWVudFggLSB0aGlzLmJ1dHRvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuICAgIH1cbiAgICBzZXRYKGUpIHtcbiAgICAgICAgdGhpcy54ID0gZS5jbGllbnRYO1xuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnRzU2l6ZXMoKTtcbiAgICAgICAgY29uc3QgeyB4LCBzY2FsZVgsIHNjYWxlVywgc2hpZnRYLCBidG5XIH0gPSB0aGlzO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZVgnLCB7IHgsIHNjYWxlWCwgc2NhbGVXLCBzaGlmdFgsIGJ0blcgfSk7XG4gICAgfVxuICAgIHVwZGF0ZUVsZW1lbnRzU2l6ZXMoKSB7XG4gICAgICAgIHRoaXMuc2NhbGVYID0gdGhpcy5zY2FsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuICAgICAgICB0aGlzLnNjYWxlVyA9IHRoaXMuc2NhbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIHRoaXMuYnRuVyA9PT0gMFxuICAgICAgICAgICAgJiYgKHRoaXMuYnRuVyA9IHRoaXMuYnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgUHJlc2VudGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgc2NhbGUsIGJ1dHRvbikge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZVgnLCAoeCkgPT4gdGhpcy5jYWxsTW92ZUJ1dHRvbih4KSk7XG4gICAgICAgIHRoaXMuc2NhbGUub24oJ2NsaWNrT25TY2FsZScsIChlKSA9PiB0aGlzLnNldFgoZSkpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5vbigncG9pbnRlclByZXNzZWQnLCAoZSkgPT4gdGhpcy5zZXRTaGlmdFgoZSkpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJNb3ZlZCcsIChlKSA9PiB0aGlzLnNldFgoZSkpO1xuICAgIH1cbiAgICBzZXRTaGlmdFgoZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnNldFNoaWZ0WChlKTtcbiAgICB9XG4gICAgc2V0WChlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0WChlKTtcbiAgICB9XG4gICAgY2FsbE1vdmVCdXR0b24oeyB4LCBzY2FsZVgsIHNjYWxlVywgc2hpZnRYLCBidG5XIH0pIHtcbiAgICAgICAgdGhpcy5idXR0b24ubW92ZUJ1dHRvbih4LCBzY2FsZVgsIHNjYWxlVywgc2hpZnRYLCBidG5XKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcmVzZW50ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQnV0dG9uVmlldyA9IGV4cG9ydHMuU2NhbGVWaWV3ID0gdm9pZCAwO1xuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKFwiLi9FdmVudEVtaXR0ZXJcIik7XG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgfVxufVxuY2xhc3MgU2NhbGVWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3Ioc2NhbGUpIHtcbiAgICAgICAgc3VwZXIoc2NhbGUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB0aGlzLmVtaXQoJ2NsaWNrT25TY2FsZScsIGUpKTtcbiAgICB9XG59XG5leHBvcnRzLlNjYWxlVmlldyA9IFNjYWxlVmlldztcbmNsYXNzIEJ1dHRvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihidXR0b24pIHtcbiAgICAgICAgc3VwZXIoYnV0dG9uKTtcbiAgICAgICAgdGhpcy5pc1RyaWdnZXJkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlVHJpZ2dlcigpO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0UG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdwb2ludGVyUHJlc3NlZCcsIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKCkgPT4gdGhpcy50b2dnbGVUcmlnZ2VyKCkpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIChlKSA9PiB0aGlzLmlzVHJpZ2dlcmQgJiYgdGhpcy5lbWl0KCdwb2ludGVyTW92ZWQnLCBlKSk7XG4gICAgfVxuICAgIHRvZ2dsZVRyaWdnZXIoKSB7XG4gICAgICAgIHRoaXMuaXNUcmlnZ2VyZCA9IHRoaXMuaXNUcmlnZ2VyZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG4gICAgbW92ZUJ1dHRvbih4LCBzY2FsZVgsIHNjYWxlVywgc2hpZnRYLCBidG5XKSB7XG4gICAgICAgIGNvbnN0IGJ0blBvc2l0aW9uID0gTWF0aC5taW4oc2NhbGVXIC0gYnRuVywgTWF0aC5tYXgoKHggLSBzY2FsZVggLSBzaGlmdFgpLCAwKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnN0eWxlLmxlZnQgPSBgJHtidG5Qb3NpdGlvbn1weGA7XG4gICAgfVxufVxuZXhwb3J0cy5CdXR0b25WaWV3ID0gQnV0dG9uVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb2RlbFwiKSk7XG5jb25zdCBWaWV3XzEgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuY29uc3QgUHJlc2VudGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJlc2VudGVyXCIpKTtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB7fTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uIChvID0ge30sIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWydkaXYnLCAndWktc2xpZGVyX19jb250YWluZXInXSxcbiAgICAgICAgICAgICAgICAgICAgWydkaXYnLCAndWktc2xpZGVyX19zY2FsZSddLFxuICAgICAgICAgICAgICAgICAgICBbJ2J1dHRvbicsICd1aS1zbGlkZXJfX2J1dHRvbl9zdGFydCddLFxuICAgICAgICAgICAgICAgICAgICAoKG8gPT09IG51bGwgfHwgbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogby5pbnRlcnZhbCkgPT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgWydidXR0b24nLCAndWktc2xpZGVyX19idXR0b25fZW5kJ10pLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoYXJncykgPT4gYXJncylcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoYXJncykgPT4gY3JlYXRlQ29tcG9uZW50KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnJlZHVjZSgocGxhY2UsIGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2UuYXBwZW5kKGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50c1swXTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzWzBdKTtcbiAgICAgICAgICAgICAgICBzdG9yYWdlW2lkXSA9IG5ldyBQcmVzZW50ZXJfMS5kZWZhdWx0KG5ldyBNb2RlbF8xLmRlZmF1bHQoY29tcG9uZW50c1sxXSwgY29tcG9uZW50c1syXSwgbyksIG5ldyBWaWV3XzEuU2NhbGVWaWV3KGNvbXBvbmVudHNbMV0pLCBuZXcgVmlld18xLkJ1dHRvblZpZXcoY29tcG9uZW50c1syXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG9wdGlvbnMgOignLCBhcmdzLCBzdG9yYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG59KShqUXVlcnkpO1xuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KFtlbGVtLCBlbGVtQ2xhc3NdKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtKTtcbiAgICBjb21wb25lbnQuY2xhc3NMaXN0LmFkZChlbGVtQ2xhc3MpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==