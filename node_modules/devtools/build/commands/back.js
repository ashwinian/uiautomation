"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function back() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goBack();
    return null;
}
exports.default = back;
