"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const utils_1 = require("../../utils");
function url(path) {
    if (typeof path !== 'string') {
        throw new Error('Parameter for "url" command needs to be type of string');
    }
    if (typeof this.options.baseUrl === 'string') {
        path = url_1.default.resolve(this.options.baseUrl, path);
    }
    return this.navigateTo(utils_1.validateUrl(path));
}
exports.default = url;
