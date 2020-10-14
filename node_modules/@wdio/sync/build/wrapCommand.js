"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fibers_1 = require("./fibers");
const logger_1 = __importDefault(require("@wdio/logger"));
const executeHooksWithArgs_1 = __importDefault(require("./executeHooksWithArgs"));
const utils_1 = require("./utils");
const log = logger_1.default('@wdio/sync');
let inCommandHook = false;
const timers = [];
const elements = new Set();
process.on('WDIO_TIMER', (payload) => {
    if (payload.start) {
        return timers.push(payload.id);
    }
    if (timers.includes(payload.id)) {
        while (timers.pop() !== payload.id)
            ;
    }
    if (payload.timeout) {
        elements.forEach(element => { delete element._NOT_FIBER; });
    }
    if (timers.length === 0) {
        elements.clear();
    }
});
function wrapCommand(commandName, fn) {
    return function wrapCommandFn(...args) {
        if (!global._HAS_FIBER_CONTEXT && global.WDIO_WORKER) {
            log.warn(`Can't return command result of ${commandName} synchronously because command ` +
                'was executed outside of an it block, hook or step definition!');
        }
        if (timers.length > 0) {
            elements.add(this);
        }
        if (this._NOT_FIBER === true) {
            this._NOT_FIBER = isNotInFiber(this, fn.name);
            return fn.apply(this, args);
        }
        this._NOT_FIBER = fn.name !== '';
        const future = new fibers_1.Future();
        const result = runCommandWithHooks.apply(this, [commandName, fn, ...args]);
        result.then(future.return.bind(future), future.throw.bind(future));
        try {
            const futureResult = future.wait();
            inFiber(this);
            return futureResult;
        }
        catch (e) {
            if (typeof e === 'string') {
                throw new Error(e);
            }
            if (e.message.includes('Can\'t wait without a fiber')) {
                return result;
            }
            inFiber(this);
            throw e;
        }
    };
}
exports.default = wrapCommand;
async function runCommandWithHooks(commandName, fn, ...args) {
    const stackError = new Error();
    await runCommandHook.call(this, this.options.beforeCommand, [commandName, args]);
    let commandResult;
    let commandError;
    try {
        commandResult = await fn.apply(this, args);
    }
    catch (err) {
        commandError = utils_1.sanitizeErrorMessage(err, stackError);
    }
    await runCommandHook.call(this, this.options.afterCommand, [commandName, args, commandResult, commandError]);
    if (commandError) {
        throw commandError;
    }
    return commandResult;
}
async function runCommandHook(hookFn, args) {
    if (!inCommandHook) {
        inCommandHook = true;
        await executeHooksWithArgs_1.default(hookFn, args);
        inCommandHook = false;
    }
}
function isNotInFiber(context, fnName) {
    return fnName !== '' && !!(context.elementId || (context.parent && context.parent.elementId));
}
function inFiber(context) {
    if (context.constructor.name === 'MultiRemoteDriver') {
        return context.instances.forEach(instance => {
            context[instance]._NOT_FIBER = false;
            let parent = context[instance].parent;
            while (parent && parent._NOT_FIBER) {
                parent._NOT_FIBER = false;
                parent = parent.parent;
            }
        });
    }
    context._NOT_FIBER = false;
    let parent = context.parent;
    while (parent && parent._NOT_FIBER) {
        parent._NOT_FIBER = false;
        parent = parent.parent;
    }
}
