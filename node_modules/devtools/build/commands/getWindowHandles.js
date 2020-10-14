"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
async function getWindowHandles() {
    let newPages = await this.browser.pages();
    const stalePageIds = [];
    this.windows.forEach((page, id) => {
        if (newPages.includes(page)) {
            newPages = newPages.filter(newPage => page !== newPage);
        }
        else {
            stalePageIds.push(id);
        }
    });
    stalePageIds.forEach(pageId => this.windows.delete(pageId));
    newPages.forEach(page => this.windows.set(uuid_1.v4(), page));
    return Array.from(this.windows.keys());
}
exports.default = getWindowHandles;
