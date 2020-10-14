"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function addValue(value, { translateToUnicode = true } = {}) {
    if (!this.isW3C) {
        return this.elementSendKeys(this.elementId, utils_1.transformToCharString(value, translateToUnicode));
    }
    return this.elementSendKeys(this.elementId, utils_1.transformToCharString(value, translateToUnicode).join(''));
}
exports.default = addValue;
