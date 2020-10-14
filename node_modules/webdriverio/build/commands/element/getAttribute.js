"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAttribute(attributeName) {
    return this.getElementAttribute(this.elementId, attributeName);
}
exports.default = getAttribute;
