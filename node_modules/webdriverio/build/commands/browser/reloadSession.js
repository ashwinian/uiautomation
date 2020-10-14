"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('webdriverio');
async function reloadSession() {
    const oldSessionId = this.sessionId;
    try {
        await this.deleteSession();
    }
    catch (err) {
        log.warn(`Suppressing error closing the session: ${err.stack}`);
    }
    const ProtocolDriver = require(this.options.automationProtocol).default;
    await ProtocolDriver.reloadSession(this);
    if (Array.isArray(this.options.onReload) && this.options.onReload.length) {
        await Promise.all(this.options.onReload.map((hook) => hook(oldSessionId, this.sessionId)));
    }
    return this.sessionId;
}
exports.default = reloadSession;
