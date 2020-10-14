"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeScript_1 = __importDefault(require("../scripts/executeScript"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
async function executeScript({ script, args }) {
    const page = this.getPageHandle(true);
    const scriptTimeout = this.timeouts.get('script');
    script = script.trim();
    if (script.startsWith('return (')) {
        script = script.slice(7);
    }
    if (script.startsWith('return')) {
        script = `(function () { ${script} }).apply(null, arguments)`;
    }
    const executePromise = page.$eval('html', executeScript_1.default, script, constants_1.SERIALIZE_PROPERTY, constants_1.SERIALIZE_FLAG, ...(await utils_1.transformExecuteArgs.call(this, args)));
    let executeTimeout;
    const timeoutPromise = new Promise((_, reject) => {
        executeTimeout = setTimeout(() => {
            const timeoutError = `script timeout${this.activeDialog
                ? ' reason: a browser dialog has opened as result of a executeScript call'
                : ''}`;
            return reject(new Error(timeoutError));
        }, scriptTimeout);
    });
    const result = await Promise.race([executePromise, timeoutPromise]);
    clearTimeout(executeTimeout);
    return utils_1.transformExecuteResult.call(this, page, result);
}
exports.default = executeScript;
