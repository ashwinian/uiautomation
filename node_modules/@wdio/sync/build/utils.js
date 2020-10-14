"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeErrorMessage = void 0;
const constants_1 = require("./constants");
function sanitizeErrorMessage(commandError, savedError) {
    let name, stack, message;
    if (commandError instanceof Error) {
        ({ name, message, stack } = commandError);
    }
    else {
        name = 'Error';
        message = commandError;
    }
    const err = new Error(message);
    err.name = name;
    let stackArr = savedError.stack.split('\n');
    if (stack) {
        stack = stack.replace(`${err.name}: ${err.name}`, err.name);
        stackArr[0] = '\n';
        stackArr = [...stack.split('\n'), ...stackArr];
    }
    err.stack = stackArr
        .filter(constants_1.STACKTRACE_FILTER_FN)
        .reduce((acc, currentValue) => {
        return acc.includes(currentValue) ? acc : `${acc}\n${currentValue}`;
    }, '')
        .trim();
    return err;
}
exports.sanitizeErrorMessage = sanitizeErrorMessage;
