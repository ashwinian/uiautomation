"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newWindow(url, windowName, windowFeatures) {
    window.open(url, windowName || 'new window', windowFeatures || '');
}
exports.default = newWindow;
