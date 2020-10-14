"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFrameworkFnWrapper = exports.testFnWrapper = void 0;
const utils_1 = require("../utils");
const errorHandler_1 = require("./errorHandler");
const shim_1 = require("../shim");
exports.testFnWrapper = function (...args) {
    return exports.testFrameworkFnWrapper.call(this, { executeHooksWithArgs: shim_1.executeHooksWithArgs, executeAsync: shim_1.executeAsync, runSync: shim_1.runSync }, ...args);
};
exports.testFrameworkFnWrapper = async function ({ executeHooksWithArgs, executeAsync, runSync }, type, { specFn, specFnArgs }, { beforeFn, beforeFnArgs }, { afterFn, afterFnArgs }, cid, repeatTest = 0) {
    const retries = { attempts: 0, limit: repeatTest };
    const beforeArgs = beforeFnArgs(this);
    await errorHandler_1.logHookError(`Before${type}`, await executeHooksWithArgs(beforeFn, beforeArgs), cid);
    let promise;
    let result;
    let error;
    if (utils_1.isFunctionAsync(specFn) || !runSync) {
        promise = executeAsync.call(this, specFn, retries, specFnArgs);
    }
    else {
        promise = new Promise(runSync.call(this, specFn, retries, specFnArgs));
    }
    const testStart = Date.now();
    try {
        result = await promise;
    }
    catch (err) {
        error = err;
    }
    const duration = Date.now() - testStart;
    let afterArgs = afterFnArgs(this);
    if (!error && afterArgs[0] && afterArgs[0].failedExpectations && afterArgs[0].failedExpectations.length) {
        error = afterArgs[0].failedExpectations[0];
    }
    afterArgs.push({
        retries,
        error,
        result,
        duration,
        passed: !error
    });
    await errorHandler_1.logHookError(`After${type}`, await executeHooksWithArgs(afterFn, [...afterArgs]), cid);
    if (error) {
        throw error;
    }
    return result;
};
