"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function switchToParentFrame() {
    const page = this.getPageHandle(true);
    if (typeof page.parentFrame !== 'function') {
        return null;
    }
    this.currentFrame = await page.parentFrame();
    return null;
}
exports.default = switchToParentFrame;
