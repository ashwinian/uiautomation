"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getElementObject_1 = require("../../utils/getElementObject");
const resq_1 = require("../../scripts/resq");
const resqScript = fs_1.default.readFileSync(require.resolve('resq'));
async function react$(selector, { props = {}, state = {} } = {}) {
    await this.executeScript(resqScript.toString(), []);
    await this.execute(resq_1.waitToLoadReact);
    const res = await this.execute(resq_1.react$, selector, props, state, this);
    return getElementObject_1.getElement.call(this, selector, res, true);
}
exports.default = react$;
