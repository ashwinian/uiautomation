"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function forward() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goForward();
    return null;
}
exports.default = forward;
