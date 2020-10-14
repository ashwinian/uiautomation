"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
async function saveScreenshot(filepath) {
    if (typeof filepath !== 'string' || !filepath.endsWith('.png')) {
        throw new Error('saveScreenshot expects a filepath of type string and ".png" file ending');
    }
    const absoluteFilepath = utils_1.getAbsoluteFilepath(filepath);
    utils_1.assertDirectoryExists(absoluteFilepath);
    const screenBuffer = await this.takeScreenshot();
    const screenshot = Buffer.from(screenBuffer, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, screenshot);
    return screenshot;
}
exports.default = saveScreenshot;
