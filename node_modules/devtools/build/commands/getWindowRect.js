"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
async function getWindowRect() {
    const page = this.getPageHandle();
    const viewport = await page.viewport() || {};
    return Object.assign({ width: constants_1.DEFAULT_WIDTH, height: constants_1.DEFAULT_HEIGHT, x: 0, y: 0 }, viewport);
}
exports.default = getWindowRect;
