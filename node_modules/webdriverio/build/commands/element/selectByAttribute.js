"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function selectByAttribute(attribute, value) {
    value = typeof value === 'number'
        ? value.toString()
        : value;
    const normalized = `[normalize-space(@${attribute.trim()}) = "${value.trim()}"]`;
    const optionElement = await this.findElementFromElement(this.elementId, 'xpath', `./option${normalized}|./optgroup/option${normalized}`);
    if (optionElement && optionElement.error === 'no such element') {
        throw new Error(`Option with attribute "${attribute}=${value}" not found.`);
    }
    return this.elementClick(utils_1.getElementFromResponse(optionElement));
}
exports.default = selectByAttribute;
