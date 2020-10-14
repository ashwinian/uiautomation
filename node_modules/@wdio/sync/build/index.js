"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSync = exports.executeSync = exports.runFnInFiberContext = exports.wrapCommand = exports.executeHooksWithArgs = void 0;
const fibers_1 = __importDefault(require("./fibers"));
const executeHooksWithArgs_1 = __importDefault(require("./executeHooksWithArgs"));
exports.executeHooksWithArgs = executeHooksWithArgs_1.default;
const runFnInFiberContext_1 = __importDefault(require("./runFnInFiberContext"));
exports.runFnInFiberContext = runFnInFiberContext_1.default;
const wrapCommand_1 = __importDefault(require("./wrapCommand"));
exports.wrapCommand = wrapCommand_1.default;
const constants_1 = require("./constants");
const defaultRetries = { attempts: 0, limit: 0 };
async function executeSync(fn, retries = defaultRetries, args = []) {
    if (global.browser) {
        delete global.browser._NOT_FIBER;
    }
    if (this) {
        this.wdioRetries = retries.attempts;
    }
    try {
        global._HAS_FIBER_CONTEXT = true;
        let res = fn.apply(this, args);
        global._HAS_FIBER_CONTEXT = false;
        if (res instanceof Promise) {
            return await res;
        }
        return res;
    }
    catch (e) {
        if (retries.limit > retries.attempts) {
            retries.attempts++;
            return await executeSync.call(this, fn, retries, args);
        }
        if (!e.stack) {
            return Promise.reject(e);
        }
        e.stack = e.stack.split('\n').filter(constants_1.STACKTRACE_FILTER_FN).join('\n');
        return Promise.reject(e);
    }
}
exports.executeSync = executeSync;
function runSync(fn, repeatTest = 0, args = []) {
    return (resolve, reject) => fibers_1.default(() => executeSync.call(this, fn, repeatTest, args).then(resolve, reject)).run();
}
exports.runSync = runSync;
function sync(testFn) {
    return new Promise((resolve, reject) => {
        return runSync(testFn)(resolve, reject);
    });
}
exports.default = sync;
