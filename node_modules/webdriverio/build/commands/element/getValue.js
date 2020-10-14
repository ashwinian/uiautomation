"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getValue() {
    if (this.isW3C && !this.isMobile) {
        return this.getElementProperty(this.elementId, 'value');
    }
    return this.getElementAttribute(this.elementId, 'value');
}
exports.default = getValue;
