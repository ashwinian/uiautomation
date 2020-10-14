"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waitForExist({ timeout = this.options.waitforTimeout, interval = this.options.waitforInterval, reverse = false, timeoutMsg = `element ("${this.selector}") still ${reverse ? '' : 'not '}existing after ${timeout}ms` } = {}) {
    return this.waitUntil(async () => reverse !== await this.isExisting(), { timeout, interval, timeoutMsg });
}
exports.default = waitForExist;
