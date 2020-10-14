"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function refresh() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.reload();
    return null;
}
exports.default = refresh;
