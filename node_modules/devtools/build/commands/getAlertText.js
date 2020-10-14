"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAlertText() {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    return this.activeDialog.message();
}
exports.default = getAlertText;
