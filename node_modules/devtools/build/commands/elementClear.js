"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elementClear_1 = __importDefault(require("../scripts/elementClear"));
const utils_1 = require("../utils");
async function elementClear({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    await page.$eval('html', elementClear_1.default, elementHandle);
    return null;
}
exports.default = elementClear;
