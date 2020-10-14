"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementCSSValue(_, elem, propertyName) {
    return window.getComputedStyle(elem)[propertyName];
}
exports.default = getElementCSSValue;
