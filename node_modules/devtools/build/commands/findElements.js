"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
async function findElements({ using, value }) {
    if (!constants_1.SUPPORTED_SELECTOR_STRATEGIES.includes(using)) {
        throw new Error(`selector strategy "${using}" is not yet supported`);
    }
    if (using === 'link text') {
        using = 'xpath';
        value = `//a[normalize-space() = "${value}"]`;
    }
    else if (using === 'partial link text') {
        using = 'xpath';
        value = `//a[contains(., "${value}")]`;
    }
    const page = this.getPageHandle(true);
    return utils_1.findElements.call(this, page, using, value);
}
exports.default = findElements;
