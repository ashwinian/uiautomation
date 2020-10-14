"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPageSource() {
    const page = this.getPageHandle(true);
    return page.content();
}
exports.default = getPageSource;
