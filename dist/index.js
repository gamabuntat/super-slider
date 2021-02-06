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
        this.events = {};
    }
    on(evt, listener) {
        (this.events[evt] || (this.events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, e) {
        (this.events[evt] || []).slice().forEach((lsn) => lsn(e));
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
    constructor({ x = 0 }) {
        super();
        this.x = x;
    }
    setX(e) {
        this.x = e.clientX;
        console.log(this.x);
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
    constructor(model, scale) {
        this.model = model;
        this.scale = scale;
        scale.on('clickOnScale', (e) => this.setNewX(e));
    }
    readModel() {
        console.log(this.model);
    }
    setNewX(e) {
        this.model.setX(e);
    }
}
exports.default = Presenter;


/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScaleView = void 0;
const EventEmitter_1 = __importDefault(__webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts"));
class View extends EventEmitter_1.default {
    constructor(component) {
        super();
        this.component = component;
    }
}
class ScaleView extends View {
    constructor(component) {
        super(component);
        this.component.addEventListener('click', (e) => this.emit('clickOnScale', e));
    }
}
exports.ScaleView = ScaleView;
class ButtonView extends View {
}


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
            var _a;
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
                storage[(_a = this.attr('id')) !== null && _a !== void 0 ? _a : ''] = new Presenter_1.default(new Model_1.default(o), new View_1.ScaleView(components[1]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXRhbGFtcC8uL3NyYy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvUHJlc2VudGVyLnRzIiwid2VicGFjazovL21ldGFsYW1wLy4vc3JjL1ZpZXcudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWV0YWxhbXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ2RGO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUNBQXVDLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9EO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7Ozs7Ozs7Ozs7O0FDaEJGO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUNmRjtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQix1Q0FBdUMsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7Ozs7Ozs7Ozs7O0FDckJhO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0NBQWdDLG1CQUFPLENBQUMsK0JBQVM7QUFDakQsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLG9DQUFvQyxtQkFBTyxDQUFDLHVDQUFhO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDeENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfVxuICAgIG9uKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgKHRoaXMuZXZlbnRzW2V2dF0gfHwgKHRoaXMuZXZlbnRzW2V2dF0gPSBbXSkpLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW1pdChldnQsIGUpIHtcbiAgICAgICAgKHRoaXMuZXZlbnRzW2V2dF0gfHwgW10pLnNsaWNlKCkuZm9yRWFjaCgobHNuKSA9PiBsc24oZSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RW1pdHRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRFbWl0dGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRXZlbnRFbWl0dGVyXCIpKTtcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3IoeyB4ID0gMCB9KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgfVxuICAgIHNldFgoZSkge1xuICAgICAgICB0aGlzLnggPSBlLmNsaWVudFg7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMueCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFByZXNlbnRlciB7XG4gICAgY29uc3RydWN0b3IobW9kZWwsIHNjYWxlKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgICBzY2FsZS5vbignY2xpY2tPblNjYWxlJywgKGUpID0+IHRoaXMuc2V0TmV3WChlKSk7XG4gICAgfVxuICAgIHJlYWRNb2RlbCgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb2RlbCk7XG4gICAgfVxuICAgIHNldE5ld1goZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnNldFgoZSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJlc2VudGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjYWxlVmlldyA9IHZvaWQgMDtcbmNvbnN0IEV2ZW50RW1pdHRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0V2ZW50RW1pdHRlclwiKSk7XG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIH1cbn1cbmNsYXNzIFNjYWxlVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihjb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLmVtaXQoJ2NsaWNrT25TY2FsZScsIGUpKTtcbiAgICB9XG59XG5leHBvcnRzLlNjYWxlVmlldyA9IFNjYWxlVmlldztcbmNsYXNzIEJ1dHRvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb2RlbFwiKSk7XG5jb25zdCBWaWV3XzEgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuY29uc3QgUHJlc2VudGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJlc2VudGVyXCIpKTtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB7fTtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuLnNsaWRlciA9IGZ1bmN0aW9uIChvID0ge30sIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbyA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFsnZGl2JywgJ3VpLXNsaWRlcl9fY29udGFpbmVyJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnZGl2JywgJ3VpLXNsaWRlcl9fc2NhbGUnXSxcbiAgICAgICAgICAgICAgICAgICAgWydidXR0b24nLCAndWktc2xpZGVyX19idXR0b25fc3RhcnQnXSxcbiAgICAgICAgICAgICAgICAgICAgKChvID09PSBudWxsIHx8IG8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IG8uaW50ZXJ2YWwpID09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIFsnYnV0dG9uJywgJ3VpLXNsaWRlcl9fYnV0dG9uX2VuZCddKSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGFyZ3MpID0+IGFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGFyZ3MpID0+IGNyZWF0ZUNvbXBvbmVudChhcmdzKSk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5yZWR1Y2UoKHBsYWNlLCBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlLmFwcGVuZChlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudHNbMF07XG4gICAgICAgICAgICAgICAgfSwgdGhpc1swXSk7XG4gICAgICAgICAgICAgICAgc3RvcmFnZVsoX2EgPSB0aGlzLmF0dHIoJ2lkJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnXSA9IG5ldyBQcmVzZW50ZXJfMS5kZWZhdWx0KG5ldyBNb2RlbF8xLmRlZmF1bHQobyksIG5ldyBWaWV3XzEuU2NhbGVWaWV3KGNvbXBvbmVudHNbMV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBvcHRpb25zIDooJywgYXJncywgc3RvcmFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSkoalF1ZXJ5KTtcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChbZWxlbSwgZWxlbUNsYXNzXSkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbSk7XG4gICAgY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZWxlbUNsYXNzKTtcbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=