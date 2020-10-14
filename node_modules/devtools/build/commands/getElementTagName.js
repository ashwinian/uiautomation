"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementTagName_1 = __importDefault(require("../scripts/getElementTagName"));
const utils_1 = require("../utils");
async function getElementTagName({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    const result = await page.$eval('html', getElementTagName_1.default, elementHandle);
    return (result || '').toLowerCase();
}
exports.default = getElementTagName;
