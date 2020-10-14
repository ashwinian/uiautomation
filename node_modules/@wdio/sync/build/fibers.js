"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Future = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/sync');
let Fiber;
let Future;
exports.Future = Future;
global._HAS_FIBER_CONTEXT = false;
const origErrorFn = console.error.bind(console);
const errors = [];
console.error = (...args) => errors.push(args);
try {
    Fiber = require('fibers');
    exports.Future = Future = require('fibers/future');
}
catch (e) {
    log.debug('Couldn\'t load fibers package for Node v10 and above');
}
console.error = origErrorFn;
if (!Fiber || !Future) {
    throw new Error('No proper `fibers` package could be loaded. It might be not ' +
        'supported with your current Node version. Please ensure to use ' +
        `only WebdriverIOs recommended Node versions.\n${errors.join('\n')}`);
}
exports.default = Fiber;
