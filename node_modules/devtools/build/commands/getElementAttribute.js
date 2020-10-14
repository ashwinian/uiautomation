"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementAttribute_1 = __importDefault(require("../scripts/getElementAttribute"));
const utils_1 = require("../utils");
async function getElementAttribute({ elementId, name }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementAttribute_1.default, elementHandle, name);
}
exports.default = getElementAttribute;
