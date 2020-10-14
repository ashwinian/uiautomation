"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const puppeteerPath = require.resolve('puppeteer-core');
const puppeteerPkg = require(`${path_1.default.dirname(puppeteerPath)}/package.json`);
async function status() {
    return {
        message: '',
        ready: true,
        puppeteerVersion: puppeteerPkg.version
    };
}
exports.default = status;
