/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ComponentModel.ts":
/*!*******************************!*\
  !*** ./src/ComponentModel.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ComponentModel {
    constructor(scale, button) {
        this.scale = scale;
        this.button = button;
    }
    getScaleRect() {
        return this.scale.getBoundingClientRect();
    }
    getButtonRect() {
        return this.button.getBoundingClientRect();
    }
}
exports.default = ComponentModel;


/***/ }),

/***/ "./src/EventEmitter.ts":
/*!*****************************!*\
  !*** ./src/EventEmitter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
const ComponentModel_1 = __importDefault(__webpack_require__(/*! ./ComponentModel */ "./src/ComponentModel.ts"));
const EventEmitter_1 = __importDefault(__webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts"));
class Model extends EventEmitter_1.default {
    constructor(scale, button, { x = 0 }) {
        super();
        this.ComponentModel = new ComponentModel_1.default(scale, button);
        this.x = x;
        this.shiftX = 0;
    }
    setShiftX(e) {
        this.shiftX = e.clientX - this.ComponentModel.getButtonRect().x;
    }
    setX(e) {
        this.x = e.clientX;
        this.emit('changeX', [
            this.x,
            this.ComponentModel.getScaleRect().x,
            this.ComponentModel.getScaleRect().width,
            this.shiftX,
            this.ComponentModel.getButtonRect().width,
        ]);
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
    callMoveButton([x, scaleX, scaleW, shiftX, btnW]) {
        this.button.moveButton(x, scaleX, scaleW, shiftX, btnW);
    }
    setShiftX(e) {
        this.model.setShiftX(e);
    }
    setX(e) {
        this.model.setX(e);
    }
}
exports.default = Presenter;


/***/ }),

/***/ "./src/View/ButtonView.ts":
/*!********************************!*\
  !*** ./src/View/ButtonView.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const View_1 = __importDefault(__webpack_require__(/*! ./View */ "./src/View/View.ts"));
class ButtonView extends View_1.default {
    constructor(button) {
        super(button);
        this.isTriggerd = false;
        this.component.addEventListener('pointerdown', (e) => {
            console.log(e.pointerId);
            this.toggleTrigger();
            this.component.setPointerCapture(e.pointerId);
            this.emit('pointerPressed', e);
        });
        this.component.addEventListener('pointerup', () => this.toggleTrigger());
        this.component.addEventListener('pointermove', (e) => View_1.default.isTriggerd && this.emit('pointerMoved', e));
    }
    moveButton(x, scaleX, scaleW, shiftX, btnW) {
        const btnPosition = Math.min(scaleW - btnW, Math.max((x - scaleX - shiftX), 0));
        this.component.style.left = `${btnPosition}px`;
    }
}
exports.default = ButtonView;


/***/ }),

/***/ "./src/View/ScaleView.ts":
/*!*******************************!*\
  !*** ./src/View/ScaleView.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const View_1 = __importDefault(__webpack_require__(/*! ./View */ "./src/View/View.ts"));
class ScaleView extends View_1.default {
    constructor(scale) {
        super(scale);
        this.component.addEventListener('pointerdown', (e) => {
            console.log(e.pointerId);
            this.toggleTrigger();
            this.emit('clickOnScale', e);
        });
    }
}
exports.default = ScaleView;


/***/ }),

/***/ "./src/View/View.ts":
/*!**************************!*\
  !*** ./src/View/View.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventEmitter_1 = __importDefault(__webpack_require__(/*! ../EventEmitter */ "./src/EventEmitter.ts"));
class View extends EventEmitter_1.default {
    constructor(component) {
        super();
        this.component = component;
    }
    toggleTrigger() {
        View.isTriggerd = View.isTriggerd ? false : true;
        console.log(View.isTriggerd);
    }
}
exports.default = View;
View.isTriggerd = false;


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
const ScaleView_1 = __importDefault(__webpack_require__(/*! ./View/ScaleView */ "./src/View/ScaleView.ts"));
const ButtonView_1 = __importDefault(__webpack_require__(/*! ./View/ButtonView */ "./src/View/ButtonView.ts"));
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
                storage[id] = new Presenter_1.default(new Model_1.default(components[1], components[2], o), new ScaleView_1.default(components[1]), new ButtonView_1.default(components[2]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9Db21wb25lbnRNb2RlbC50cyIsIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovL21ldGFsYW1wLy4vc3JjL1ZpZXcvQnV0dG9uVmlldy50cyIsIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9WaWV3L1NjYWxlVmlldy50cyIsIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ2RGO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ2hCRjtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHlDQUF5QyxtQkFBTyxDQUFDLGlEQUFrQjtBQUNuRSx1Q0FBdUMsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDL0Q7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDNUJGO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ3RCRjtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELCtCQUErQixtQkFBTyxDQUFDLGtDQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFlBQVk7QUFDbkQ7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDeEJGO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsK0JBQStCLG1CQUFPLENBQUMsa0NBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDaEJGO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUNBQXVDLG1CQUFPLENBQUMsOENBQWlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOzs7Ozs7Ozs7OztBQ2pCYTtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGdDQUFnQyxtQkFBTyxDQUFDLCtCQUFTO0FBQ2pELG9DQUFvQyxtQkFBTyxDQUFDLGlEQUFrQjtBQUM5RCxxQ0FBcUMsbUJBQU8sQ0FBQyxtREFBbUI7QUFDaEUsb0NBQW9DLG1CQUFPLENBQUMsdUNBQWE7QUFDekQ7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM1Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgQ29tcG9uZW50TW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKHNjYWxlLCBidXR0b24pIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICB9XG4gICAgZ2V0U2NhbGVSZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG4gICAgZ2V0QnV0dG9uUmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudE1vZGVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBvbihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgICh0aGlzLmV2ZW50c1tldnRdIHx8ICh0aGlzLmV2ZW50c1tldnRdID0gW10pKS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZ0LCBhcmdzKSB7XG4gICAgICAgICh0aGlzLmV2ZW50c1tldnRdIHx8IFtdKVxuICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgIC5mb3JFYWNoKChsc24pID0+IGxzbihhcmdzKSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRFbWl0dGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDb21wb25lbnRNb2RlbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NvbXBvbmVudE1vZGVsXCIpKTtcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKSk7XG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50RW1pdHRlcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNjYWxlLCBidXR0b24sIHsgeCA9IDAgfSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLkNvbXBvbmVudE1vZGVsID0gbmV3IENvbXBvbmVudE1vZGVsXzEuZGVmYXVsdChzY2FsZSwgYnV0dG9uKTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy5zaGlmdFggPSAwO1xuICAgIH1cbiAgICBzZXRTaGlmdFgoZSkge1xuICAgICAgICB0aGlzLnNoaWZ0WCA9IGUuY2xpZW50WCAtIHRoaXMuQ29tcG9uZW50TW9kZWwuZ2V0QnV0dG9uUmVjdCgpLng7XG4gICAgfVxuICAgIHNldFgoZSkge1xuICAgICAgICB0aGlzLnggPSBlLmNsaWVudFg7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlWCcsIFtcbiAgICAgICAgICAgIHRoaXMueCxcbiAgICAgICAgICAgIHRoaXMuQ29tcG9uZW50TW9kZWwuZ2V0U2NhbGVSZWN0KCkueCxcbiAgICAgICAgICAgIHRoaXMuQ29tcG9uZW50TW9kZWwuZ2V0U2NhbGVSZWN0KCkud2lkdGgsXG4gICAgICAgICAgICB0aGlzLnNoaWZ0WCxcbiAgICAgICAgICAgIHRoaXMuQ29tcG9uZW50TW9kZWwuZ2V0QnV0dG9uUmVjdCgpLndpZHRoLFxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgUHJlc2VudGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgc2NhbGUsIGJ1dHRvbikge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZVgnLCAoeCkgPT4gdGhpcy5jYWxsTW92ZUJ1dHRvbih4KSk7XG4gICAgICAgIHRoaXMuc2NhbGUub24oJ2NsaWNrT25TY2FsZScsIChlKSA9PiB0aGlzLnNldFgoZSkpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5vbigncG9pbnRlclByZXNzZWQnLCAoZSkgPT4gdGhpcy5zZXRTaGlmdFgoZSkpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJNb3ZlZCcsIChlKSA9PiB0aGlzLnNldFgoZSkpO1xuICAgIH1cbiAgICBjYWxsTW92ZUJ1dHRvbihbeCwgc2NhbGVYLCBzY2FsZVcsIHNoaWZ0WCwgYnRuV10pIHtcbiAgICAgICAgdGhpcy5idXR0b24ubW92ZUJ1dHRvbih4LCBzY2FsZVgsIHNjYWxlVywgc2hpZnRYLCBidG5XKTtcbiAgICB9XG4gICAgc2V0U2hpZnRYKGUpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zZXRTaGlmdFgoZSk7XG4gICAgfVxuICAgIHNldFgoZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnNldFgoZSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJlc2VudGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vVmlld1wiKSk7XG5jbGFzcyBCdXR0b25WaWV3IGV4dGVuZHMgVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKGJ1dHRvbikge1xuICAgICAgICBzdXBlcihidXR0b24pO1xuICAgICAgICB0aGlzLmlzVHJpZ2dlcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVUcmlnZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3BvaW50ZXJQcmVzc2VkJywgZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCAoKSA9PiB0aGlzLnRvZ2dsZVRyaWdnZXIoKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgKGUpID0+IFZpZXdfMS5kZWZhdWx0LmlzVHJpZ2dlcmQgJiYgdGhpcy5lbWl0KCdwb2ludGVyTW92ZWQnLCBlKSk7XG4gICAgfVxuICAgIG1vdmVCdXR0b24oeCwgc2NhbGVYLCBzY2FsZVcsIHNoaWZ0WCwgYnRuVykge1xuICAgICAgICBjb25zdCBidG5Qb3NpdGlvbiA9IE1hdGgubWluKHNjYWxlVyAtIGJ0blcsIE1hdGgubWF4KCh4IC0gc2NhbGVYIC0gc2hpZnRYKSwgMCkpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zdHlsZS5sZWZ0ID0gYCR7YnRuUG9zaXRpb259cHhgO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvblZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9WaWV3XCIpKTtcbmNsYXNzIFNjYWxlVmlldyBleHRlbmRzIFZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzY2FsZSkge1xuICAgICAgICBzdXBlcihzY2FsZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlVHJpZ2dlcigpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdjbGlja09uU2NhbGUnLCBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NhbGVWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEVtaXR0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRFbWl0dGVyXCIpKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudEVtaXR0ZXJfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgfVxuICAgIHRvZ2dsZVRyaWdnZXIoKSB7XG4gICAgICAgIFZpZXcuaXNUcmlnZ2VyZCA9IFZpZXcuaXNUcmlnZ2VyZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coVmlldy5pc1RyaWdnZXJkKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWaWV3O1xuVmlldy5pc1RyaWdnZXJkID0gZmFsc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE1vZGVsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9kZWxcIikpO1xuY29uc3QgU2NhbGVWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vVmlldy9TY2FsZVZpZXdcIikpO1xuY29uc3QgQnV0dG9uVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1ZpZXcvQnV0dG9uVmlld1wiKSk7XG5jb25zdCBQcmVzZW50ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9QcmVzZW50ZXJcIikpO1xuKGZ1bmN0aW9uICgkKSB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IHt9O1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQuZm4uc2xpZGVyID0gZnVuY3Rpb24gKG8gPSB7fSwgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG8gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gW1xuICAgICAgICAgICAgICAgICAgICBbJ2RpdicsICd1aS1zbGlkZXJfX2NvbnRhaW5lciddLFxuICAgICAgICAgICAgICAgICAgICBbJ2RpdicsICd1aS1zbGlkZXJfX3NjYWxlJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnYnV0dG9uJywgJ3VpLXNsaWRlcl9fYnV0dG9uX3N0YXJ0J10sXG4gICAgICAgICAgICAgICAgICAgICgobyA9PT0gbnVsbCB8fCBvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvLmludGVydmFsKSA9PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBbJ2J1dHRvbicsICd1aS1zbGlkZXJfX2J1dHRvbl9lbmQnXSksXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChhcmdzKSA9PiBhcmdzKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChhcmdzKSA9PiBjcmVhdGVDb21wb25lbnQoYXJncykpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucmVkdWNlKChwbGFjZSwgZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZS5hcHBlbmQoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzWzBdO1xuICAgICAgICAgICAgICAgIH0sIHRoaXNbMF0pO1xuICAgICAgICAgICAgICAgIHN0b3JhZ2VbaWRdID0gbmV3IFByZXNlbnRlcl8xLmRlZmF1bHQobmV3IE1vZGVsXzEuZGVmYXVsdChjb21wb25lbnRzWzFdLCBjb21wb25lbnRzWzJdLCBvKSwgbmV3IFNjYWxlVmlld18xLmRlZmF1bHQoY29tcG9uZW50c1sxXSksIG5ldyBCdXR0b25WaWV3XzEuZGVmYXVsdChjb21wb25lbnRzWzJdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gb3B0aW9ucyA6KCcsIGFyZ3MsIHN0b3JhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfSkoKTtcbn0pKGpRdWVyeSk7XG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnQoW2VsZW0sIGVsZW1DbGFzc10pIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW0pO1xuICAgIGNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGVsZW1DbGFzcyk7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9