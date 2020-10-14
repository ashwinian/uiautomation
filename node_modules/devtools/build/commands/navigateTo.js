"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function navigateTo({ url }) {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goto(url);
    return null;
}
exports.default = navigateTo;
