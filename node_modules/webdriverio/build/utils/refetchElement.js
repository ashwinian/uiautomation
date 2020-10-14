"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const implicitWait_1 = __importDefault(require("./implicitWait"));
async function refetchElement(currentElement, commandName) {
    let selectors = [];
    while (currentElement.elementId && currentElement.parent) {
        selectors.push({ selector: currentElement.selector, index: currentElement.index || 0 });
        currentElement = currentElement.parent;
    }
    selectors.reverse();
    const length = selectors.length;
    return selectors.reduce(async (elementPromise, { selector, index }, currentIndex) => {
        const resolvedElement = await elementPromise;
        let nextElement = index > 0 ? (await resolvedElement.$$(selector))[index] : null;
        nextElement = nextElement || await resolvedElement.$(selector);
        return await implicitWait_1.default(nextElement, currentIndex + 1 < length ? '$' : commandName);
    }, Promise.resolve(currentElement));
}
exports.default = refetchElement;
