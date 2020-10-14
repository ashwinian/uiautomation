"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getElementObject_1 = require("../../utils/getElementObject");
async function $$(selector) {
    const res = await utils_1.findElements.call(this, selector);
    const elements = await getElementObject_1.getElements.call(this, selector, res);
    return utils_1.enhanceElementsArray(elements, this, selector);
}
exports.default = $$;
