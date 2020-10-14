"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementText_1 = __importDefault(require("../scripts/getElementText"));
const utils_1 = require("../utils");
async function getElementText({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementText_1.default, elementHandle);
}
exports.default = getElementText;
