// class Piped {
//   pipe(...fns: Array<(a: any) => any>) {
//     return fns.reduceRight((a, b) => (...args) => a(b(...args)));
//   }
// }
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var data = {
    elemType: 'button',
    name: 'buttonStart',
    defaultClass: 'button',
    mod: true,
    verticalMod: true
};
var SNode = /** @class */ (function () {
    function SNode(data) {
        this.name = data.name;
        this.childs = [];
        this.parent = null;
        var modeClass = SNode.filterClass(data.mod, SNode.getMod(this.name), data.defaultClass);
        var verticalClass = SNode.filterClass(data.mod, SNode.getVerticalMod, data.defaultClass);
        this.elem = SNode.addClasses(SNode.createNodeElem(data.elemType), [modeClass, verticalClass].reduce(function (acc, fn) { return (fn(acc)); }, [SNode.setPrefix(data.defaultClass)]));
    }
    SNode.setPrefix = function (c) {
        return "" + SNode.prefix + c;
    };
    SNode.getVerticalMod = function (defaultClass) {
        return defaultClass + "_vertical";
    };
    SNode.addClasses = function (elem, classes) {
        var _a;
        (_a = elem.classList).add.apply(_a, classes);
        return elem;
    };
    SNode.createNodeElem = function (elemType) {
        return document.createElement(elemType);
    };
    SNode.prefix = 'ui-slider__';
    SNode.filterClass = function (predicate, step, defaulClass) { return function (acc) {
        return predicate ? __spreadArrays(acc, [SNode.setPrefix(step(defaulClass))]) : acc;
    }; };
    SNode.getMod = function (name) { return function (defaultClass) {
        return defaultClass + "_" + (name.match(/[S|E]\w*/) || [])[0];
    }; };
    return SNode;
}());
console.log(new SNode(data));
