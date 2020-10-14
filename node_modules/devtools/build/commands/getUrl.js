"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUrl_1 = __importDefault(require("../scripts/getUrl"));
async function getUrl() {
    const page = this.getPageHandle(true);
    return page.$eval('html', getUrl_1.default);
}
exports.default = getUrl;
