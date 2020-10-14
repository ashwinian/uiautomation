"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementAttribute_1 = __importDefault(require("./getElementAttribute"));
async function isElementEnabled({ elementId }) {
    const result = await getElementAttribute_1.default.call(this, { elementId, name: 'disabled' });
    return result === null;
}
exports.default = isElementEnabled;
