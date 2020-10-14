"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementProperty_1 = __importDefault(require("./getElementProperty"));
const getElementTagName_1 = __importDefault(require("./getElementTagName"));
async function isElementSelected({ elementId }) {
    const tagName = await getElementTagName_1.default.call(this, { elementId });
    const name = tagName === 'option' ? 'selected' : 'checked';
    const isSelected = await getElementProperty_1.default.call(this, { elementId, name });
    return Boolean(isSelected);
}
exports.default = isElementSelected;
