"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function selectByIndex(index) {
    if (index < 0) {
        throw new Error('Index needs to be 0 or any other positive number');
    }
    const optionElements = await this.findElementsFromElement(this.elementId, 'css selector', 'option');
    if (optionElements.length === 0) {
        throw new Error('Select element doesn\'t contain any option element');
    }
    if (optionElements.length - 1 < index) {
        throw new Error(`Option with index "${index}" not found. Select element only contains ${optionElements.length} option elements`);
    }
    return this.elementClick(utils_1.getElementFromResponse(optionElements[index]));
}
exports.default = selectByIndex;
