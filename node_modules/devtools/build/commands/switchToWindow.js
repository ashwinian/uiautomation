"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function switchToWindow({ handle }) {
    if (!this.windows.has(handle)) {
        throw new Error(`window with handle ${handle} not found`);
    }
    delete this.currentFrame;
    this.currentWindowHandle = handle;
    const page = this.getPageHandle();
    page.on('dialog', this.dialogHandler.bind(this));
    await page.bringToFront();
    return handle;
}
exports.default = switchToWindow;
