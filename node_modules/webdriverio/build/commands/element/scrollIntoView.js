"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
function scrollIntoView(scrollIntoViewOptions = true) {
    return this.parent.execute(function (elem, options) {
        elem.scrollIntoView(options);
    }, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId
    }, scrollIntoViewOptions);
}
exports.default = scrollIntoView;
