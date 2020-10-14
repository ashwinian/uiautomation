"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
async function saveRecordingScreen(filepath) {
    if (typeof filepath !== 'string') {
        throw new Error('saveRecordingScreen expects a filepath');
    }
    const absoluteFilepath = utils_1.getAbsoluteFilepath(filepath);
    utils_1.assertDirectoryExists(absoluteFilepath);
    const videoBuffer = await this.stopRecordingScreen();
    const video = Buffer.from(videoBuffer, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, video);
    return video;
}
exports.default = saveRecordingScreen;
