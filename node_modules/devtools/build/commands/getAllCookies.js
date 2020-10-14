"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getAllCookies() {
    const page = this.getPageHandle();
    return page.cookies();
}
exports.default = getAllCookies;
