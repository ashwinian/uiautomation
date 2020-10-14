"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findElement_1 = __importDefault(require("./findElement"));
const getActiveElement_1 = __importDefault(require("../scripts/getActiveElement"));
const cleanUpSerializationSelector_1 = __importDefault(require("../scripts/cleanUpSerializationSelector"));
const constants_1 = require("../constants");
async function getActiveElement() {
    const page = this.getPageHandle(true);
    const selector = `[${constants_1.SERIALIZE_PROPERTY}]`;
    const hasElem = await page.$eval('html', getActiveElement_1.default, constants_1.SERIALIZE_PROPERTY);
    if (!hasElem) {
        throw new Error('no element active');
    }
    const activeElement = await findElement_1.default.call(this, {
        using: 'css selector',
        value: selector
    });
    await page.$eval(selector, cleanUpSerializationSelector_1.default, constants_1.SERIALIZE_PROPERTY);
    return activeElement;
}
exports.default = getActiveElement;
