"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isExisting() {
    const method = this.isReactElement ? 'react$$' : '$$';
    return this.parent[method](this.selector).then((res) => res.length > 0);
}
exports.default = isExisting;
