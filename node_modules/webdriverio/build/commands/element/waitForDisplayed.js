"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function waitForDisplayed({ timeout = this.options.waitforTimeout, interval = this.options.waitforInterval, reverse = false, timeoutMsg = `element ("${this.selector}") still ${reverse ? '' : 'not '}displayed after ${timeout}ms` } = {}) {
    return this.waitUntil(async () => reverse !== await this.isDisplayed(), { timeout, interval, timeoutMsg });
}
exports.default = waitForDisplayed;
