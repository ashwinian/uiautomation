"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function selectByVisibleText(text) {
    text = typeof text === 'number'
        ? text.toString()
        : text;
    const normalized = text
        .trim()
        .replace(/\s+/, ' ');
    const formatted = /"/.test(normalized)
        ? 'concat("' + normalized.split('"').join('", \'"\', "') + '")'
        : `"${normalized}"`;
    const dotFormat = `[. = ${formatted}]`;
    const spaceFormat = `[normalize-space(text()) = ${formatted}]`;
    const selections = [
        `./option${dotFormat}`,
        `./option${spaceFormat}`,
        `./optgroup/option${dotFormat}`,
        `./optgroup/option${spaceFormat}`,
    ];
    const optionElement = await this.findElementFromElement(this.elementId, 'xpath', selections.join('|'));
    if (optionElement && optionElement.error === 'no such element') {
        throw new Error(`Option with text "${text}" not found.`);
    }
    return this.elementClick(utils_1.getElementFromResponse(optionElement));
}
exports.default = selectByVisibleText;
