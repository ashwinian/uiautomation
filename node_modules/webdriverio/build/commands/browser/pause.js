"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pause(milliseconds = 1000) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
exports.default = pause;
