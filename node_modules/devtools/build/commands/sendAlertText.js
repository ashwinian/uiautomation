"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sendAlertText({ text }) {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    await this.activeDialog.accept(text);
    return null;
}
exports.default = sendAlertText;
