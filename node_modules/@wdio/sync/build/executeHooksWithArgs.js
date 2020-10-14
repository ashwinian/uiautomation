"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fibers_1 = __importDefault(require("./fibers"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/sync');
function executeHooksWithArgs(hooks = [], args) {
    if (typeof hooks === 'function') {
        hooks = [hooks];
    }
    if (!Array.isArray(args)) {
        args = [args];
    }
    hooks = hooks.map((hook) => new Promise((resolve) => {
        let result;
        const execHook = () => {
            delete global.browser._NOT_FIBER;
            try {
                result = hook.apply(null, args);
            }
            catch (e) {
                log.error(e.stack);
                return resolve(e);
            }
            if (result && typeof result.then === 'function') {
                return result.then(resolve, (e) => {
                    log.error(e.stack);
                    resolve(e);
                });
            }
            resolve(result);
        };
        return hook.constructor.name === 'AsyncFunction' ? execHook() : fibers_1.default(execHook).run();
    }));
    return Promise.all(hooks);
}
exports.default = executeHooksWithArgs;
