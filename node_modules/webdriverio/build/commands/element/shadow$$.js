"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shadowFnFactory_1 = require("../../scripts/shadowFnFactory");
async function shadowRoot(selector) {
    return await this.$$(shadowFnFactory_1.shadowFnFactory(selector, true));
}
exports.default = shadowRoot;
