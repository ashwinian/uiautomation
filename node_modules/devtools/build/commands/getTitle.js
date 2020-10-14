"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getTitle() {
    const page = this.getPageHandle(true);
    return page.title();
}
exports.default = getTitle;
